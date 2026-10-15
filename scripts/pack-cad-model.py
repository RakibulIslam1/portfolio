#!/usr/bin/env python3
"""Pack an Onshape OBJ/MTL assembly into the portfolio's MGLA v3 format.

Offline authoring only. Requires Python 3, NumPy and fast-simplification 0.2.0;
the website itself keeps its dependency-free browser renderer. Read the model's
PROVENANCE.md before regenerating. No source files are modified or downloaded.
"""

import argparse
import array
import hashlib
import json
import pathlib
import struct

import numpy as np
import fast_simplification


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for block in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def load_obj(path):
    """Read data only; never evaluate OBJ/MTL content or follow external paths."""
    vertices, faces = array.array("d"), array.array("I")
    groups, materials = array.array("I"), array.array("I")
    group_names, material_names = ["default"], ["default"]
    material_ids = {"default": 0}
    group_id = material_id = 0
    with path.open(encoding="utf-8-sig") as source:
        for line in source:
            if line.startswith("v "):
                vertices.extend(map(float, line.split()[1:4]))
            elif line.startswith("g "):
                group_names.append(line[2:].strip())
                group_id = len(group_names) - 1
            elif line.startswith("usemtl "):
                name = line[7:].strip()
                if name not in material_ids:
                    material_ids[name] = len(material_names)
                    material_names.append(name)
                material_id = material_ids[name]
            elif line.startswith("f "):
                count = len(vertices) // 3
                polygon = [int(token.split("/")[0]) for token in line.split()[1:]]
                polygon = [index - 1 if index > 0 else count + index for index in polygon]
                if any(index < 0 or index >= count for index in polygon):
                    raise ValueError("OBJ face references an invalid vertex")
                for index in range(1, len(polygon) - 1):
                    faces.extend((polygon[0], polygon[index], polygon[index + 1]))
                    groups.append(group_id)
                    materials.append(material_id)
    vertices = np.frombuffer(vertices, dtype=np.float64).reshape(-1, 3)
    faces = np.frombuffer(faces, dtype=np.uint32).reshape(-1, 3)
    if not len(faces) or not np.isfinite(vertices).all():
        raise ValueError("OBJ is empty or contains invalid positions")
    return (vertices, faces, np.frombuffer(groups, dtype=np.uint32),
            np.frombuffer(materials, dtype=np.uint32), group_names, material_names)


def load_materials(path):
    result = {"default": [0.65, 0.65, 0.65]}
    name = None
    with path.open(encoding="utf-8-sig") as source:
        for line in source:
            if line.startswith("newmtl "):
                name = line[7:].strip()
            elif line.startswith("Kd ") and name is not None:
                color = list(map(float, line.split()[1:4]))
                if len(color) != 3 or not np.isfinite(color).all():
                    raise ValueError("Invalid MTL diffuse color")
                result[name] = color
    return result


# These are display clusters, not a claim about a mechanical disassembly order.
# Positions in the assembled model are never moved relative to one another.
CLUSTERS = [
    ("Outer shell", (0, .85, 0)),
    ("Camera head region", (0, .9, -.45)),
    ("LiDAR components", (0, .35, -.6)),
    ("Upper electronics region", (.35, .65, .25)),
    ("Compute platform region", (-.5, .25, .2)),
    ("Control platform region", (.5, .1, .25)),
    ("Base plate", (0, -.45, 0)),
    ("Rear left running gear region", (-.6, -.15, .5)),
    ("Rear right running gear region", (.6, -.15, .5)),
    ("Front left running gear region", (-.6, -.15, -.5)),
    ("Front right running gear region", (.6, -.15, -.5)),
    ("Lower drivetrain region", (0, -.2, .7)),
]


def cluster_for(name, lo, hi):
    """LazyGo car_v2 display clusters, classified in original meter/Z-up axes."""
    center = (lo + hi) / 2
    name = name.lower()
    if "top cover" in name:
        return 0
    if "web cam" in name or (center[1] > .07 and center[2] > .095):
        return 1
    if "rplidar" in name:
        return 2
    if center[2] > .061:
        return 3
    if center[2] > .039:
        return 4
    if center[2] > .024:
        return 5
    if hi[1] - lo[1] > .15 and center[2] < .01:
        return 6
    if center[0] < -.025:
        return 7 if center[1] < .025 else 9
    if center[0] > .037:
        return 8 if center[1] < .025 else 10
    return 11


def allocate_targets(counts, weights, target):
    """Keep small features, then distribute budget by visible surface area."""
    result = np.minimum(counts, 12).astype(np.int64)
    remaining = max(0, target - int(result.sum()))
    while remaining:
        available = counts - result
        active = available > 0
        if not active.any():
            break
        active_weights = weights * active
        additions = np.minimum(available, np.maximum(
            1, np.floor(remaining * active_weights / active_weights.sum()).astype(np.int64)))
        if additions.sum() > remaining:
            for i in np.argsort(-active_weights):
                take = min(int(additions[i]), remaining)
                result[i] += take
                remaining -= take
                if not remaining:
                    break
        else:
            result += additions
            remaining -= int(additions.sum())
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("obj", type=pathlib.Path)
    parser.add_argument("mtl", type=pathlib.Path)
    parser.add_argument("output", type=pathlib.Path)
    parser.add_argument("--triangles", type=int, default=180000)
    parser.add_argument("--manifest", type=pathlib.Path)
    args = parser.parse_args()
    if args.triangles < 1:
        parser.error("--triangles must be positive")
    v, f, group, material, group_names, material_names = load_obj(args.obj)
    material_colors = load_materials(args.mtl)
    missing = set(material_names[1:]) - material_colors.keys()
    if missing:
        raise ValueError("MTL missing referenced colors: " + ", ".join(sorted(missing)))
    print(f"Read {len(v):,} vertices / {len(f):,} triangles", flush=True)

    # One segment per original CAD component and diffuse material: colors and
    # part boundaries never blend during quadric-error simplification.
    key = group.astype(np.uint64) * len(material_names) + material
    order = np.argsort(key, kind="stable")
    ordered_key = key[order]
    starts = np.r_[0, np.flatnonzero(np.diff(ordered_key)) + 1]
    ends = np.r_[starts[1:], len(f)]
    counts = ends - starts
    areas = np.empty(len(starts))
    group_bounds = {}
    segment_records = []
    for i, (start, end) in enumerate(zip(starts, ends)):
        selected = order[start:end]
        triangles = v[f[selected]]
        areas[i] = np.linalg.norm(np.cross(triangles[:, 1] - triangles[:, 0],
                                          triangles[:, 2] - triangles[:, 0]), axis=1).sum() / 2
        gid = int(group[selected[0]])
        lo, hi = triangles.min(axis=(0, 1)), triangles.max(axis=(0, 1))
        if gid in group_bounds:
            lo = np.minimum(lo, group_bounds[gid][0])
            hi = np.maximum(hi, group_bounds[gid][1])
        group_bounds[gid] = (lo, hi)
    weights = np.maximum(areas, 1e-14) ** .65 * counts ** .2
    def protect_group(gid):
        name = group_names[gid].lower()
        lo, hi = group_bounds[gid]
        center = (lo + hi) / 2
        return (any(label in name for label in ("web cam", "top cover", "rplidar", "main servo"))
                or (hi[1] - lo[1] > .15 and center[2] < 0)
                or (name == "part 1" and lo[2] < -.01 and hi[2] < .04
                    and center[1] > .04 and np.max(hi - lo) > .04))
    protected_segments = np.array([protect_group(int(group[order[start]])) for start in starts])
    targets = counts.copy()
    targets[~protected_segments] = allocate_targets(
        counts[~protected_segments], weights[~protected_segments],
        max(0, args.triangles - int(counts[protected_segments].sum())))
    cluster_cell_meters = .00005
    positions, colors, parts, indices = [], [], [], []
    offset = 0
    for i, (start, end) in enumerate(zip(starts, ends)):
        selected = order[start:end]
        gid, mid = int(group[selected[0]]), int(material[selected[0]])
        # Exact welding removes OBJ normal/face splits without spatial merging.
        vv, remap = np.unique(v[f[selected].reshape(-1)], axis=0, return_inverse=True)
        ff = remap.reshape(-1, 3).astype(np.int32)
        # Keep the camera, shell, LiDAR, servos, base plate and front wheels
        # directly from source. Tiny nonmanifold CAD fillets can prevent QEM
        # convergence; a 0.05 mm component-local cell removes that redundant
        # microgeometry with a bounded subpixel displacement before QEM.
        lo, hi = group_bounds[gid]
        protected = protected_segments[i]
        if not protected:
            original_vertices, original_faces = vv, ff
            cells, remap = np.unique(np.rint(vv / cluster_cell_meters).astype(np.int64),
                                     axis=0, return_inverse=True)
            cell_counts = np.bincount(remap)
            vv = np.column_stack([np.bincount(remap, weights=vv[:, axis]) / cell_counts
                                  for axis in range(3)])
            ff = remap[ff]
            valid = ((ff[:, 0] != ff[:, 1]) & (ff[:, 1] != ff[:, 2])
                     & (ff[:, 2] != ff[:, 0]))
            ff = ff[valid]
            if len(ff):
                # Rotate the smallest index first without changing winding.
                # Keep reverse-wound pairs used by thin CAD surfaces.
                first_corner = np.argmin(ff, axis=1)
                canonical = np.take_along_axis(
                    ff, (first_corner[:, None] + np.arange(3)) % 3, axis=1)
                _, first = np.unique(canonical, axis=0, return_index=True)
                ff = ff[np.sort(first)].astype(np.int32)
            else:
                # A real source component smaller than one cell still belongs
                # in the assembly; keep its complete original geometry.
                vv, ff, protected = original_vertices, original_faces, True
        precluster_triangles = len(ff)
        if not protected and len(ff) > targets[i]:
            vv, ff = fast_simplification.simplify(
                vv, ff, target_count=int(targets[i]), agg=7, preserve_border=True)
        if not len(ff):
            raise ValueError(f"Simplification removed an entire component: {group_names[gid]}")
        used, remap = np.unique(ff, return_inverse=True)
        vv, ff = vv[used], remap.reshape(-1, 3)
        cid = cluster_for(group_names[gid], *group_bounds[gid])
        color = np.clip(np.rint(np.array(material_colors[material_names[mid]]) * 255), 0, 255).astype(np.uint8)
        positions.append(vv)
        colors.append(np.tile(color, (len(vv), 1)))
        parts.append(np.full(len(vv), cid, dtype=np.uint8))
        indices.append(ff + offset)
        offset += len(vv)
        segment_records.append({"sourceGroup": gid, "material": mid, "displayGroup": cid,
                                "sourceTriangles": int(end - start), "triangles": len(ff),
                                "protectedSourceGeometry": bool(protected),
                                "preclusterTriangles": precluster_triangles})
        if i % 250 == 0:
            print(f"Packed segment {i + 1}/{len(starts)}", flush=True)

    pp, cc, part, ii = map(np.concatenate, (positions, colors, parts, indices))
    source_lo, source_hi = v.min(axis=0), v.max(axis=0)
    # Right-handed, rigid global rotation: OBJ (x,y,z) -> viewer (x,z,-y).
    pp = pp[:, [0, 2, 1]] * [1, 1, -1]
    center = (pp.min(axis=0) + pp.max(axis=0)) / 2
    radius = float(np.linalg.norm(pp - center, axis=1).max())
    quantized = np.ascontiguousarray(
        np.rint((pp - center) / radius * 32767).clip(-32767, 32767), dtype="<i2")
    # Deduplicate only vertices with identical position, material RGB and display
    # group; this does not let simplification cross a component boundary.
    vertex_bytes = np.column_stack((quantized.view(np.uint8).reshape(-1, 6), cc, part))
    unique, remap = np.unique(vertex_bytes, axis=0, return_inverse=True)
    quantized = unique[:, :6].copy().view("<i2").reshape(-1, 3)
    cc, part, ii = unique[:, 6:9], unique[:, 9], remap[ii]
    valid = (ii[:, 0] != ii[:, 1]) & (ii[:, 1] != ii[:, 2]) & (ii[:, 2] != ii[:, 0])
    quantized_degenerate = int((~valid).sum())
    ii = ii[valid]
    index_bytes = 2 if len(quantized) <= 65536 else 4
    alignment_vertex = index_bytes == 4 and len(quantized) % 2 == 0
    if alignment_vertex:
        quantized = np.vstack((quantized, quantized[:1]))
        cc = np.vstack((cc, cc[:1]))
        part = np.r_[part, part[:1]]
    directions = np.asarray([direction for _, direction in CLUSTERS], dtype="<f4")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    temporary_output = args.output.with_name(args.output.name + ".tmp")
    with temporary_output.open("wb") as output:
        output.write(struct.pack("<4sHHII4fH", b"MGLA", 3, index_bytes, len(quantized), len(ii),
                                 *center, radius, len(CLUSTERS)))
        output.write(directions.tobytes())
        output.write(quantized.astype("<i2").tobytes())
        output.write(cc.astype(np.uint8).tobytes())
        output.write(part.astype(np.uint8).tobytes())
        if output.tell() % index_bytes:
            raise ValueError("MGLA typed-array index alignment failure")
        output.write(ii.astype("<u2" if index_bytes == 2 else "<u4").tobytes())
    temporary_output.replace(args.output)
    manifest = {
        "format": "MGLA v3", "sourceUnits": "meters", "sourceUp": "Z",
        "viewerTransform": "(x, y, z) -> (x, z, -y), followed by global centering and uniform sphere scaling",
        "sourceFiles": [{"name": path.name, "bytes": path.stat().st_size, "sha256": sha256(path)}
                        for path in (args.obj, args.mtl)],
        "sourceVertices": len(v), "sourceTriangles": len(f),
        "sourceGroupCount": len(np.unique(group)), "sourceMaterialCount": len(np.unique(material)),
        "sourceBoundsMeters": {"min": source_lo.tolist(), "max": source_hi.tolist()},
        "sourceExtentsMillimeters": ((source_hi - source_lo) * 1000).tolist(),
        "vertices": len(quantized), "triangles": len(ii), "indexBytes": index_bytes,
        "bytes": args.output.stat().st_size, "sha256": sha256(args.output),
        "centerMetersYUp": center.tolist(), "normalizationRadiusMeters": radius,
        "maximumPositionQuantizationErrorMillimeters": radius / 32767 * 1000 * np.sqrt(3) / 2,
        "quantizationDegenerateTrianglesRemoved": quantized_degenerate,
        "unusedAlignmentVertex": bool(alignment_vertex),
        "simplification": {"library": "fast-simplification", "version": fast_simplification.__version__,
                           "targetTriangles": args.triangles, "algorithm": "quadric error, agg=7, preserve_border=True; independent material/component segments",
                           "microgeometryCellMillimeters": cluster_cell_meters * 1000,
                           "maximumCellDisplacementMillimeters": cluster_cell_meters * np.sqrt(3) * 1000,
                           "protectedGeometry": "source camera, outer shell, LiDAR, servos, base plate and front wheels",
                           "allocation": "12 triangle minimum per material/component, then area^0.65 * sourceTriangles^0.2"},
        "displayGroups": [{"id": i, "name": name, "explodeVectorYUp": list(direction)}
                          for i, (name, direction) in enumerate(CLUSTERS)],
        "sourceGroups": [{"id": i, "name": name} for i, name in enumerate(group_names)],
        "sourceMaterials": [{"id": i, "name": name, "Kd": material_colors[name],
                             "rgb8": np.clip(np.rint(np.array(material_colors[name]) * 255), 0, 255).astype(int).tolist()}
                            for i, name in enumerate(material_names)],
        "segments": segment_records,
    }
    manifest_path = args.manifest or args.output.with_suffix(".json")
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: manifest[key] for key in ("vertices", "triangles", "bytes", "sha256",
                                                   "sourceExtentsMillimeters")}, indent=2))


if __name__ == "__main__":
    main()
