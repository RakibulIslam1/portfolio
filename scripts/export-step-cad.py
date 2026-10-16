#!/usr/bin/env python3
"""Offline STEP/XCAF analysis and tessellation; never used by the website.

Requires cadquery-ocp-novtk 7.9.3.1.1, NumPy and SciPy, installed separately.
Writes a GLB intermediate using OCCT's assembly/color-aware exporter. The GLB
keeps source Z-up axes in meters, so a downstream conversion must not assume
the intermediate uses the usual glTF Y-up axes.
"""

import argparse
import collections
import hashlib
import json
import pathlib
import sys
import time


def surface_error(face):
    import numpy as np
    from OCP.BRep import BRep_Tool
    from OCP.TopLoc import TopLoc_Location
    ml, sl = TopLoc_Location(), TopLoc_Location()
    tri = BRep_Tool.Triangulation_s(face, ml)
    if tri is None or not tri.HasUVNodes():
        return 0.0
    surface = BRep_Tool.Surface_s(face, sl)
    uv = np.array([[tri.UVNode(i).X(), tri.UVNode(i).Y()] for i in range(1, tri.NbNodes()+1)])
    xyz = np.array([[p.X(), p.Y(), p.Z()] for p in [tri.Node(i).Transformed(ml.Transformation()) for i in range(1, tri.NbNodes()+1)]])
    triangles = np.array([tri.Triangle(i).Get() for i in range(1, tri.NbTriangles()+1)])-1
    error = 0.0
    for weights in ([1/3, 1/3, 1/3], [.5, .5, 0], [0, .5, .5], [.5, 0, .5]):
        param = np.sum(uv[triangles]*np.array(weights)[None, :, None], axis=1)
        actual = np.array([[p.X(), p.Y(), p.Z()] for p in [surface.Value(float(u), float(v)).Transformed(sl.Transformation()) for u, v in param]])
        error = max(error, float(np.linalg.norm(actual-np.sum(xyz[triangles]*np.array(weights)[None, :, None], axis=1), axis=1).max()))
    return error


def refine_surface(face, tolerance, resolution=20):
    """Refine existing UV triangles by evaluating the original trimmed surface.

    The input triangles retain the trim domain. Shared edge samples prevent
    cracks; Delaunay runs inside each original convex UV triangle. This repairs
    OCCT's missed interior curvature without replacing the source geometry.
    """
    import math
    import numpy as np
    from scipy.spatial import Delaunay
    from OCP.BRep import BRep_Tool, BRep_Builder
    from OCP.Poly import Poly_Triangulation, Poly_Triangle
    from OCP.TopLoc import TopLoc_Location
    from OCP.gp import gp_Pnt2d
    mesh_location, surface_location = TopLoc_Location(), TopLoc_Location()
    original = BRep_Tool.Triangulation_s(face, mesh_location)
    surface = BRep_Tool.Surface_s(face, surface_location)
    if original is None or not original.HasUVNodes():
        raise RuntimeError("Surface refinement needs existing trim triangulation")
    uv = np.array([[original.UVNode(i).X(), original.UVNode(i).Y()]
                   for i in range(1, original.NbNodes() + 1)])
    original_faces = np.array([original.Triangle(i).Get()
                               for i in range(1, original.NbTriangles() + 1)]) - 1
    low, high = uv.min(0), uv.max(0)
    span = np.maximum(high - low, 1e-12)
    center = (low + high) / 2
    seeds = np.array([[u, v] for u in np.linspace(low[0], high[0], resolution + 1)
                      for v in np.linspace(low[1], high[1], resolution + 1)])
    edge_samples, vertices, triangles, vertex_ids = {}, [], [], {}
    skipped_slivers = 0

    def vertex(point):
        key = tuple(np.round(point, 13))
        if key not in vertex_ids:
            vertex_ids[key] = len(vertices)
            vertices.append(np.array(point))
        return vertex_ids[key]

    def edge(i, j):
        key = tuple(sorted((int(i), int(j))))
        if key not in edge_samples:
            a, b = uv[list(key)]
            count = max(1, math.ceil(np.linalg.norm((b - a) / span) * resolution))
            values = list(np.linspace(0, 1, count + 1))
            delta = b - a
            if delta @ delta > 0:
                t = float((center - a) @ delta / (delta @ delta))
                if 0 < t < 1 and np.linalg.norm(a + t * delta - center) < 1e-10:
                    values.append(t)
            edge_samples[key] = [a + t * delta for t in sorted(set(values))]
        return edge_samples[key]

    for original_face in original_faces:
        a, b, c = uv[original_face]
        basis = np.column_stack((b - a, c - a))
        signed_area = np.linalg.det(basis)
        longest_edge = max(np.linalg.norm((b-a)/span), np.linalg.norm((c-a)/span), np.linalg.norm((c-b)/span))
        # Native meshing can leave near-zero-width UV slivers. Their long
        # edges map to curved lines, not finite-area faces; discard below
        # nanometer scale rather than manufacturing flat membranes.
        if abs(signed_area) / (span.prod() * max(longest_edge, 1e-15)) < 1e-7:
            skipped_slivers += 1
            continue
        barycentric = np.linalg.solve(basis, (seeds - a).T).T
        inside = (barycentric.min(1) > 1e-9) & (barycentric.sum(1) < 1 - 1e-9)
        points = [*edge(original_face[0], original_face[1]),
                  *edge(original_face[1], original_face[2]),
                  *edge(original_face[2], original_face[0]), *seeds[inside]]
        center_bary = np.linalg.solve(basis, center - a)
        if center_bary.min() > 1e-9 and center_bary.sum() < 1 - 1e-9:
            points.append(center)
        points = np.unique(np.round(np.array(points), 13), axis=0)
        local = (points - low) / span
        if len(points) == 3:
            local_faces = np.array([[0, 1, 2]])
            if np.linalg.det(np.column_stack((local[1] - local[0], local[2] - local[0]))) < 0:
                local_faces[:, [1, 2]] = local_faces[:, [2, 1]]
        else:
            local_faces = Delaunay(local).simplices
        if signed_area < 0:
            local_faces = local_faces[:, [0, 2, 1]]
        ids = np.array([vertex(p) for p in points])
        triangles.extend(ids[local_faces].tolist())

    vertices, triangles = np.array(vertices), np.array(triangles, dtype=int)
    tri_uv = vertices[triangles] / span
    ab, ac, bc = tri_uv[:, 1] - tri_uv[:, 0], tri_uv[:, 2] - tri_uv[:, 0], tri_uv[:, 2] - tri_uv[:, 1]
    heights = np.abs(ab[:, 0]*ac[:, 1] - ab[:, 1]*ac[:, 0]) / np.maximum(
        np.maximum.reduce([np.linalg.norm(ab, axis=1), np.linalg.norm(ac, axis=1), np.linalg.norm(bc, axis=1)]), 1e-15)
    skipped_slivers += int((heights < 1e-7).sum())
    triangles = triangles[heights >= 1e-7]
    to_mesh = mesh_location.Transformation().Inverted()

    def point_at(u, v):
        point = surface.Value(float(u), float(v)).Transformed(surface_location.Transformation())
        point.Transform(to_mesh)
        return point

    points = [point_at(u, v) for u, v in vertices]
    xyz = np.array([[p.X(), p.Y(), p.Z()] for p in points])
    maximum_error = 0.0
    worst = None
    for weights in ([1/3, 1/3, 1/3], [.5, .5, 0], [0, .5, .5], [.5, 0, .5]):
        sample_uv = np.sum(vertices[triangles] * np.array(weights)[None, :, None], axis=1)
        actual = np.array([[p.X(), p.Y(), p.Z()] for p in [point_at(u, v) for u, v in sample_uv]])
        linear = np.sum(xyz[triangles] * np.array(weights)[None, :, None], axis=1)
        errors = np.linalg.norm(actual - linear, axis=1)
        index = int(errors.argmax())
        if errors[index] > maximum_error:
            maximum_error = float(errors[index])
            worst = {"uv": vertices[triangles[index]].tolist(), "weights": weights,
                     "actual": actual[index].tolist(), "linear": linear[index].tolist()}
    if maximum_error > tolerance:
        raise RuntimeError(f"Refined surface error {maximum_error} mm exceeds {tolerance} mm: {worst}")
    refined = Poly_Triangulation(len(points), len(triangles), True)
    for i, (point, param) in enumerate(zip(points, vertices), 1):
        refined.SetNode(i, point)
        refined.SetUVNode(i, gp_Pnt2d(*map(float, param)))
    for i, triangle in enumerate(triangles, 1):
        refined.SetTriangle(i, Poly_Triangle(*map(int, triangle + 1)))
    refined.Deflection(tolerance)
    BRep_Builder().UpdateFace(face, refined, True)
    return {"originalTriangles": original.NbTriangles(), "triangles": len(triangles),
            "nodes": len(points), "maximumSampledDeflectionMillimeters": maximum_error,
            "peakZMillimeters": float(xyz[:, 2].max()), "uvResolution": resolution,
            "degenerateUVSliversRemoved": skipped_slivers}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=pathlib.Path)
    parser.add_argument("output", type=pathlib.Path)
    parser.add_argument("--tooling", type=pathlib.Path)
    parser.add_argument("--cache", type=pathlib.Path, help="Reuse this script's matching pre-mesh XCAF cache")
    parser.add_argument("--deflection-mm", type=float, default=.075)
    parser.add_argument("--angle-radians", type=float, default=.25)
    args = parser.parse_args()
    if args.tooling:
        sys.path.insert(0, str(args.tooling.resolve()))
    from OCP.Bnd import Bnd_Box
    from OCP.BinXCAFDrivers import BinXCAFDrivers
    from OCP.BRepBndLib import BRepBndLib
    from OCP.BRepMesh import BRepMesh_IncrementalMesh
    from OCP.IFSelect import IFSelect_RetDone
    from OCP.Message import Message_ProgressRange
    from OCP.RWGltf import RWGltf_CafWriter
    from OCP.RWMesh import RWMesh_CoordinateSystem_Zup, RWMesh_NameFormat_Product
    from OCP.STEPCAFControl import STEPCAFControl_Reader
    from OCP.TCollection import TCollection_ExtendedString, TCollection_AsciiString
    from OCP.TColStd import TColStd_IndexedDataMapOfStringString
    from OCP.TDataStd import TDataStd_Name
    from OCP.TDF import TDF_Label, TDF_LabelSequence, TDF_Tool
    from OCP.TDocStd import TDocStd_Document
    from OCP.TopAbs import TopAbs_FACE, TopAbs_SOLID
    from OCP.TopExp import TopExp_Explorer
    from OCP.TopLoc import TopLoc_Location
    from OCP.XCAFDoc import XCAFDoc_DocumentTool, XCAFDoc_ShapeTool
    from OCP.XCAFApp import XCAFApp_Application

    start = time.monotonic()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    source_bytes = args.source.read_bytes()
    header = source_bytes[:source_bytes.index(b"DATA;")].decode("utf-8", "replace")
    report = {"sourceName": args.source.name, "sourceBytes": len(source_bytes),
              "sourceSHA256": hashlib.sha256(source_bytes).hexdigest(), "header": header,
              "occtBinding": "cadquery-ocp-novtk 7.9.3.1.1", "outputUnits": "meters",
              "outputUp": "Z", "linearDeflectionMillimeters": args.deflection_mm,
              "angularDeflectionRadians": args.angle_radians}
    del source_bytes
    app = XCAFApp_Application.GetApplication_s()
    BinXCAFDrivers.DefineFormat_s(app)
    if args.cache:
        cache_report = json.loads(args.cache.with_suffix(".xcaf.json").read_text(encoding="utf-8"))
        if cache_report["sourceSHA256"] != report["sourceSHA256"]:
            raise RuntimeError("XCAF cache does not match the supplied STEP")
        path = args.cache.resolve()
        print("Loading matching pre-mesh XCAF cache", flush=True)
        doc = app.Retrieve(TCollection_ExtendedString(str(path.parent)), TCollection_ExtendedString(path.name))
        report["cacheUsed"] = path.name
        report["systemLengthUnitMillimeters"] = cache_report["systemLengthUnitMillimeters"]
    else:
        doc = TDocStd_Document(TCollection_ExtendedString("BinXCAF"))
        XCAFDoc_DocumentTool.SetLengthUnit_s(doc, .001)
        reader = STEPCAFControl_Reader()
        reader.SetColorMode(True)
        reader.SetNameMode(True)
        reader.SetLayerMode(True)
        print("Reading STEP data", flush=True)
        if reader.ReadFile(str(args.source.resolve())) != IFSelect_RetDone:
            raise RuntimeError("STEP import did not finish successfully")
        reader.Reader().SetSystemLengthUnit(1.0)
        report["systemLengthUnitMillimeters"] = reader.Reader().SystemLengthUnit()
        print("Transferring STEP structure, names and colors into XCAF", flush=True)
        if not reader.Transfer(doc):
            raise RuntimeError("STEP to XCAF transfer failed")
        cache_path = args.output.with_suffix(".xbf")
        print("Saving imported XCAF cache", flush=True)
        report["cacheStoreStatus"] = str(app.SaveAs(doc, TCollection_ExtendedString(str(cache_path.resolve()))))
    shape_tool = XCAFDoc_DocumentTool.ShapeTool_s(doc.Main())
    roots = TDF_LabelSequence()
    shape_tool.GetFreeShapes(roots)

    def label_name(label):
        value = TDataStd_Name()
        return value.Get().ToExtString() if label.FindAttribute(TDataStd_Name.GetID_s(), value) else ""

    def label_entry(label):
        value = TCollection_AsciiString()
        TDF_Tool.Entry_s(label, value)
        return value.ToCString()

    def shape_count(shape, kind):
        explorer = TopExp_Explorer(shape, kind)
        count = 0
        while explorer.More():
            count += 1
            explorer.Next()
        return count

    instances = []
    prototypes = {}
    root_bounds = Bnd_Box()
    for i in range(1, roots.Length() + 1):
        BRepBndLib.AddOptimal_s(shape_tool.GetShape_s(roots.Value(i)), root_bounds, False, False)
    report["analyticBoundsMillimeters"] = list(root_bounds.Get())
    report["analyticBoundsMeters"] = [value / 1000 for value in root_bounds.Get()]
    if max(abs(value) for value in report["analyticBoundsMeters"]) > 10:
        raise RuntimeError("Meter normalization failed: " + str(report["analyticBoundsMeters"]))

    def walk(label, parent_location, assembly_path):
        if shape_tool.IsReference_s(label):
            referred = TDF_Label()
            if not shape_tool.GetReferredShape_s(label, referred):
                raise RuntimeError("Unresolved STEP assembly reference")
            location = parent_location.Multiplied(shape_tool.GetLocation_s(label))
            return walk(referred, location, assembly_path)
        name = label_name(label)
        if shape_tool.IsAssembly_s(label):
            components = TDF_LabelSequence()
            shape_tool.GetComponents_s(label, components)
            for i in range(1, components.Length() + 1):
                walk(components.Value(i), parent_location, assembly_path + [name])
            return
        shape = shape_tool.GetShape_s(label)
        if shape.IsNull():
            return
        key = label_entry(label)
        if key not in prototypes:
            prototypes[key] = {"name": name, "faces": shape_count(shape, TopAbs_FACE),
                               "solids": shape_count(shape, TopAbs_SOLID)}
        located = shape.Moved(parent_location)
        bounds = Bnd_Box()
        BRepBndLib.AddOptimal_s(located, bounds, False, False)
        instances.append({"name": name, "prototype": key, "path": assembly_path,
                          "analyticBoundsMeters": [value / 1000 for value in bounds.Get()],
                          "faces": prototypes[key]["faces"], "solids": prototypes[key]["solids"]})

    for i in range(1, roots.Length() + 1):
        walk(roots.Value(i), TopLoc_Location(), [])
    report.update({"rootCount": roots.Length(), "instanceCount": len(instances),
                   "prototypeCount": len(prototypes), "instances": instances,
                   "prototypes": prototypes, "names": dict(collections.Counter(x["name"] for x in instances)),
                   "importSeconds": time.monotonic() - start})
    report_path = args.output.with_suffix(".xcaf.json")
    report_path.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: report[key] for key in ("rootCount", "instanceCount", "prototypeCount",
                                                  "analyticBoundsMeters", "importSeconds")}), flush=True)
    print("Tessellating exact STEP faces", flush=True)
    for i in range(1, roots.Length() + 1):
        mesh = BRepMesh_IncrementalMesh(shape_tool.GetShape_s(roots.Value(i)),
                                      args.deflection_mm, False, args.angle_radians, True)
        if not mesh.IsDone():
            raise RuntimeError("STEP tessellation failed")
    # The source's shared radial-capacitor dome is under-sampled by OCCT 7.9.
    # Evaluate the original B-spline in its existing trim domain to retain the
    # actual curved surface. All placed instances share this prototype repair.
    from OCP.BRep import BRep_Tool
    from OCP.TopoDS import TopoDS
    report["surfaceRefinements"] = []
    for key, prototype in prototypes.items():
        if "rad-0.2" not in prototype["name"].lower():
            continue
        label = TDF_Label()
        TDF_Tool.Label_s(doc.GetData(), TCollection_AsciiString(key), label, False)
        faces = TopExp_Explorer(shape_tool.GetShape_s(label), TopAbs_FACE)
        index = 0
        while faces.More():
            face = TopoDS.Face_s(faces.Current())
            if BRep_Tool.Surface_s(face).DynamicType().Name() == "Geom_BSplineSurface":
                before = surface_error(face)
                if before > args.deflection_mm:
                    result = refine_surface(face, args.deflection_mm)
                    result.update({"prototype": key, "name": prototype["name"],
                                   "faceIndex": index, "originalSampledErrorMillimeters": before})
                    report["surfaceRefinements"].append(result)
                    print("Refined source surface: " + json.dumps(result), flush=True)
            index += 1
            faces.Next()
    writer = RWGltf_CafWriter(TCollection_AsciiString(str(args.output.resolve())), True)
    writer.SetNodeNameFormat(RWMesh_NameFormat_Product)
    writer.SetMeshNameFormat(RWMesh_NameFormat_Product)
    writer.SetMergeFaces(True)
    writer.SetParallel(True)
    converter = writer.ChangeCoordinateSystemConverter()
    converter.SetInputCoordinateSystem(RWMesh_CoordinateSystem_Zup)
    converter.SetOutputCoordinateSystem(RWMesh_CoordinateSystem_Zup)
    converter.SetInputLengthUnit(.001)
    converter.SetOutputLengthUnit(1.0)
    print("Writing XCAF assembly/color-aware GLB intermediate", flush=True)
    if not writer.Perform(doc, TColStd_IndexedDataMapOfStringString(), Message_ProgressRange()):
        raise RuntimeError("XCAF GLB export failed")
    report.update({"elapsedSeconds": time.monotonic() - start, "outputBytes": args.output.stat().st_size})
    report_path.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: report[key] for key in ("outputBytes", "elapsedSeconds")}), flush=True)


if __name__ == "__main__":
    main()
