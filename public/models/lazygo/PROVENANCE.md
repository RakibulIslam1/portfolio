# LazyGo / LazyBot STEP display asset

Source project: https://github.com/RakibulIslam1/LazyGo_WRO2025
Repository revision inspected: 643f82a0ae91aaec0642444a58b3d41e497f25aa.
The upstream MIT notice, copyright (c) 2025 A. N. M. Noor, remains in LICENSE.txt.

The owner supplied car_v2.step in public/ and explicitly identified it as the
intended assembly source. It was moved unchanged to:

    source-assets/cad/lazygo/car_v2.step

Original CAD stays local under Git ignore and outside the static website.
Source bytes: 74,315,786.
SHA-256: 88124fd89f39c20d6df4bb7e86434741913098b5df3ebfc7d09eaad65e39b666.
Header: STEP AP242 Edition 2; Onshape by PTC Inc. 1.222;
export timestamp 2026-10-15T17:55:10Z.

The owner/repository links this Onshape assembly:
https://cad.onshape.com/documents/0ec023d9700593bfeebabdea/w/02e5710fbedd7baee1480c4a/e/63f1a3919addf09c73a6e4d6

The supplied STEP replaces the earlier independently located Onshape 1.207
OBJ/MTL archive. It has 1,849 placed instances and 1,631 reusable prototypes.
The old OBJ's loose component near x=140 mm is absent. Analytic STEP bounds
are (-46.206063, -79.471297, -12.325006) to
(58.662616, 122.700787, 135.625804) mm: extents approximately
104.869 x 202.172 x 147.951 mm. These describe the CAD export, not verified
physical vehicle measurements. The page's 200 x 100 mm footprint is the team's
documented chassis design and remains labelled separately.

## Offline conversion

The website still uses its existing native WebGL2 renderer and MGLA v3 format.
No npm dependency, runtime 3D package, remote viewer or iframe was added.
Optional authoring tools are Python, cadquery-ocp-novtk 7.9.3.1.1, NumPy, SciPy and
fast-simplification 0.2.0. They are not needed to serve, check or build the site.

1. scripts/export-step-cad.py imports structure, names, face colours and
   placements into Open CASCADE/XCAF. OCCT model space is explicitly millimeters;
   the exporter scales both geometry and instance translations to meters.
   Tessellation uses 0.075 mm linear and 0.25 rad angular deflection parameters.
   Two under-sampled B-spline surfaces on the shared radial-capacitor prototype
   are refined by evaluating the original STEP surface inside its existing UV
   triangles. Shared edge samples preserve trims; near-zero-width UV slivers
   are removed. Sampled surface deviation is at most 0.0211 mm, and the dome
   peak matches the STEP surface. No substitute capacitor geometry is created.
   The temporary GLB intentionally retains source Z-up axes; it is an internal
   intermediate and must not be treated as conventional Y-up glTF.
2. scripts/glb-cad-to-obj.py flattens embedded geometry and hierarchical instance
   matrices into meter/Z-up OBJ/MTL. Reflected transforms reverse winding.
   All 1,849 placed instances survive. glTF linear colour encoding is undone
   against the STEP palette, including predefined colours: all 94 exported
   materials match, with maximum pre-rounding RGB distance about 3.1e-8.
3. scripts/pack-cad-model.py welds and simplifies within material/component
   boundaries, protecting source camera, outer shell, LiDAR, servos, base plate
   front-wheel and radial-capacitor tessellation. Open borders and reverse-wound surface pairs
   are retained. A 0.05 mm clustering cell reduces microscopic redundant detail.
   The target triangle count is a budget preference, not a forced deletion rule.
   One rigid rotation maps (x,y,z) to (x,z,-y), followed by uniform centering and
   scaling. Coordinates use signed 16-bit quantization; RGB8 stores source colours.

With the optional offline packages installed, reproduce the geometry with:

    python scripts/export-step-cad.py source-assets/cad/lazygo/car_v2.step .preview-check/lazygo-step/car_v2-step-refined.glb --deflection-mm 0.075 --angle-radians 0.25
    python scripts/glb-cad-to-obj.py .preview-check/lazygo-step/car_v2-step-refined.glb .preview-check/lazygo-step/car_v2-step-refined.obj --step-palette source-assets/cad/lazygo/car_v2.step
    python scripts/pack-cad-model.py .preview-check/lazygo-step/car_v2-step-refined.obj .preview-check/lazygo-step/car_v2-step-refined.mtl public/models/lazygo/lazybot-step.mgla --triangles 180000

export-step-cad.py optionally accepts --tooling for a separately installed local
Python package directory. Update the sourceCAD origin record in lazybot-step.json
and this provenance when regenerating from a different source export.
Its optional --cache flag reuses a pre-mesh XCAF cache only when the companion
report matches the original STEP hash.

## Published geometry

lazybot-step.mgla: 6,211,448 bytes; 228,205 vertices; 327,435 triangles.
SHA-256: b61c6de790f88febde37b1d3fac5d47adf52253c228020111c2ea832033bf198.
Twelve display groups support the exploded-view control; these are viewing aids,
not a verified mechanical parts count or disassembly sequence.

lazybot-step.json records input hashes, palette, source/component mapping,
normalization, quantization data and the original STEP identity. The browser
requires only the MGLA file; all source files, GLB/OBJ/MTL intermediates and the
XCAF cache remain outside public/. Original STEP bytes are unchanged.

All 1,849 instance names and transformed bounds were checked against XCAF;
maximum bound difference is 0.04594 mm, within the tessellation parameter.
One microscopic lettering face (about 0.000017 square mm) has no native OCCT
triangles. It does not remove a placed component; no replacement face is invented.

This is a visual CAD reference. Tessellation/simplification are not dimensional
inspection, and the mesh establishes no mass, endurance or competition result.
