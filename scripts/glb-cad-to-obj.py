#!/usr/bin/env python3
"""Flatten the offline OCCT CAD GLB intermediate to meter/Z-up OBJ and MTL.

This intentionally preserves the intermediate's Z-up coordinates. It reads
embedded GLB data only, honors scene instance matrices/TRS and negative-scale
winding, and optionally restores the STEP COLOUR_RGB palette from OCCT's glTF
linear color factors. Requires offline NumPy, no website dependency.
"""

import argparse
import hashlib
import json
import pathlib
import re
import struct

import numpy as np


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=pathlib.Path)
    parser.add_argument("output", type=pathlib.Path)
    parser.add_argument("--step-palette", type=pathlib.Path)
    args = parser.parse_args()
    data = args.source.read_bytes()
    magic, version, length = struct.unpack_from("<4sII", data)
    if magic != b"glTF" or version != 2 or length != len(data):
        raise ValueError("Not an intact GLB v2 container")
    offset, document, binary = 12, None, None
    while offset < len(data):
        size, kind = struct.unpack_from("<I4s", data, offset)
        offset += 8
        if kind == b"JSON":
            document = json.loads(data[offset:offset + size])
        elif kind == b"BIN\0":
            binary = data[offset:offset + size]
        offset += size
    if document is None or binary is None:
        raise ValueError("GLB requires embedded JSON and geometry")
    if any("uri" in item for item in document.get("buffers", [])):
        raise ValueError("External buffers are not accepted")
    component_types = {5120: "i1", 5121: "u1", 5122: "<i2", 5123: "<u2", 5125: "<u4", 5126: "<f4"}
    widths = {"SCALAR": 1, "VEC2": 2, "VEC3": 3, "VEC4": 4, "MAT4": 16}

    def accessor(index):
        item = document["accessors"][index]
        if "sparse" in item or item.get("normalized"):
            raise ValueError("Unexpected sparse/normalized CAD accessor")
        view = document["bufferViews"][item["bufferView"]]
        dtype = np.dtype(component_types[item["componentType"]])
        width = widths[item["type"]]
        offset = view.get("byteOffset", 0) + item.get("byteOffset", 0)
        stride = view.get("byteStride", width * dtype.itemsize)
        if view.get("buffer", 0) != 0:
            raise ValueError("Only the embedded GLB buffer is accepted")
        return np.ndarray((item["count"], width), dtype=dtype, buffer=binary,
                          offset=offset, strides=(stride, dtype.itemsize))

    def transform(node):
        if "matrix" in node:
            return np.array(node["matrix"], dtype=float).reshape(4, 4).T
        x, y, z, w = node.get("rotation", [0, 0, 0, 1])
        rotation = np.array([
            [1 - 2 * (y*y + z*z), 2 * (x*y - z*w), 2 * (x*z + y*w)],
            [2 * (x*y + z*w), 1 - 2 * (x*x + z*z), 2 * (y*z - x*w)],
            [2 * (x*z - y*w), 2 * (y*z + x*w), 1 - 2 * (x*x + y*y)]])
        result = np.eye(4)
        result[:3, :3] = rotation @ np.diag(node.get("scale", [1, 1, 1]))
        result[:3, 3] = node.get("translation", [0, 0, 0])
        return result

    materials = list(document.get("materials", []))
    default_material = len(materials)
    if any("material" not in primitive for mesh in document.get("meshes", [])
           for primitive in mesh["primitives"]):
        materials.append({"name": "glTF implicit white", "pbrMetallicRoughness": {"baseColorFactor": [1, 1, 1, 1]}})
    colors = np.array([material.get("pbrMetallicRoughness", {}).get("baseColorFactor", [1, 1, 1, 1])[:3]
                       for material in materials], dtype=float)
    palette_report = {}
    if args.step_palette:
        text = args.step_palette.read_text(errors="replace")
        palette_values = [list(map(float, match.split(",")[-3:]))
                          for match in re.findall(r"COLOUR_RGB\(([^;]+)\);", text)]
        predefined = {"black": [0, 0, 0], "white": [1, 1, 1], "red": [1, 0, 0],
                      "green": [0, 1, 0], "blue": [0, 0, 1], "yellow": [1, 1, 0],
                      "magenta": [1, 0, 1], "cyan": [0, 1, 1]}
        for name in re.findall(r"DRAUGHTING_PRE_DEFINED_COLOUR\('([^']+)'\)", text):
            if name.lower() not in predefined:
                raise ValueError("Unknown predefined STEP color: " + name)
            palette_values.append(predefined[name.lower()])
        palette = np.array(palette_values, dtype=float)
        if not len(palette):
            raise ValueError("STEP contains no COLOUR_RGB palette")
        srgb = np.where(colors <= .0031308, colors * 12.92,
                        1.055 * np.maximum(colors, 0) ** (1 / 2.4) - .055)
        errors = [np.linalg.norm(candidate[:, None] - palette[None], axis=2).min(axis=1)
                  for candidate in (colors, srgb)]
        mode = int(np.mean(errors[1]) < np.mean(errors[0]))
        converted = (colors, srgb)[mode]
        nearest = np.linalg.norm(converted[:, None] - palette[None], axis=2).argmin(axis=1)
        max_error = float(errors[mode].max())
        # A large error may be an OCCT default material, which must remain
        # explicit rather than silently assigning an unrelated source color.
        matched = errors[mode] < 1e-4
        colors = np.where(matched[:, None], palette[nearest], converted)
        palette_report = {"sourceColorCount": len(palette),
                          "conversion": "linear glTF factors to sRGB" if mode else "none",
                          "maximumPaletteDistanceRGB": max_error,
                          "matchedMaterials": int(matched.sum()),
                          "unmatchedMaterials": np.flatnonzero(~matched).tolist()}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    mtl_path = args.output.with_suffix(".mtl")
    with mtl_path.open("w", encoding="utf-8", newline="\n") as output:
        for index, color in enumerate(colors):
            output.write(f"newmtl step_color_{index}\nKd {color[0]:.12g} {color[1]:.12g} {color[2]:.12g}\nd 1\n\n")
    offset, triangles, instances, reflected = 1, 0, [], 0
    with args.output.open("w", encoding="utf-8", newline="\n") as output:
        output.write("# Tessellated from supplied STEP through OCCT XCAF; meters, original Z-up axes\n")
        output.write(f"mtllib {mtl_path.name}\n")

        def walk(index, parent):
            nonlocal offset, triangles, reflected
            node = document["nodes"][index]
            world = parent @ transform(node)
            if "mesh" in node:
                mesh = document["meshes"][node["mesh"]]
                name = re.sub(r"[\r\n]", " ", node.get("name", mesh.get("name", f"STEP component {index}")))
                output.write(f"g {name}\n")
                lo, hi = np.full(3, np.inf), np.full(3, -np.inf)
                component_triangles = 0
                reverse = np.linalg.det(world[:3, :3]) < 0
                reflected += int(reverse)
                for primitive in mesh["primitives"]:
                    if primitive.get("mode", 4) != 4:
                        raise ValueError("Non-triangle CAD primitive")
                    positions = accessor(primitive["attributes"]["POSITION"]).astype(float)
                    positions = positions @ world[:3, :3].T + world[:3, 3]
                    if not np.isfinite(positions).all():
                        raise ValueError("Non-finite world positions")
                    lo, hi = np.minimum(lo, positions.min(0)), np.maximum(hi, positions.max(0))
                    output.writelines(f"v {x:.12g} {y:.12g} {z:.12g}\n" for x, y, z in positions)
                    faces = accessor(primitive["indices"]).reshape(-1, 3).astype(np.int64)
                    if faces.max() >= len(positions):
                        raise ValueError("CAD face index out of range")
                    if reverse:
                        faces = faces[:, [0, 2, 1]]
                    output.write(f"usemtl step_color_{primitive.get('material', default_material)}\n")
                    output.writelines(f"f {a + offset} {b + offset} {c + offset}\n" for a, b, c in faces)
                    offset += len(positions)
                    triangles += len(faces)
                    component_triangles += len(faces)
                instances.append({"name": name, "node": index, "mesh": node["mesh"],
                                  "boundsMeters": [lo.tolist(), hi.tolist()], "triangles": component_triangles})
            for child in node.get("children", []):
                walk(child, world)

        for node in document["scenes"][document.get("scene", 0)]["nodes"]:
            walk(node, np.eye(4))
    report = {"sourceGLB": args.source.name, "sourceSHA256": hashlib.sha256(data).hexdigest(),
              "vertices": offset - 1, "triangles": triangles, "instances": instances,
              "instanceCount": len(instances), "materialCount": len(materials),
              "palette": palette_report, "negativeDeterminantInstances": reflected,
              "doubleSidedMaterialCount": sum(bool(x.get("doubleSided")) for x in materials),
              "nonOpaqueMaterialCount": sum(x.get("alphaMode", "OPAQUE") != "OPAQUE" for x in materials),
              "boundsMeters": [np.min([x["boundsMeters"][0] for x in instances], axis=0).tolist(),
                               np.max([x["boundsMeters"][1] for x in instances], axis=0).tolist()]}
    args.output.with_suffix(".mesh.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: value for key, value in report.items() if key != "instances"}, indent=2))


if __name__ == "__main__":
    main()
