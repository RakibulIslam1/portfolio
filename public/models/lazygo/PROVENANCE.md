# LazyGo / LazyBot CAD display asset

Source project: https://github.com/RakibulIslam1/LazyGo_WRO2025

Repository revision inspected: `643f82a0ae91aaec0642444a58b3d41e497f25aa`.
The fork's upstream is A-N-M-Noor/LazyGo_WRO2025. The original MIT notice,
copyright (c) 2025 A. N. M. Noor, is retained verbatim in LICENSE.txt.

The repository's mechanical-design documentation links this public Onshape
assembly, named `car_v2`:

https://cad.onshape.com/documents/0ec023d9700593bfeebabdea/w/02e5710fbedd7baee1480c4a/e/63f1a3919addf09c73a6e4d6

Public element metadata inspected on 2026-10-15 identifies microversion
`a76b80ba1e0653316c8c6570`. An anonymous API geometry export returned HTTP 401.
The viewer asset was therefore prepared from the existing local `car_v2.zip`
export, containing `car_v2.obj` and `car_v2.mtl`, rather than claiming that a
fresh API export succeeded. The assembly/export names match; the local export's
exact relationship to that microversion has not been verified.

The original archive and its extracted source files remain unchanged. Their
SHA-256 hashes are:

- car_v2.zip (35,765,025 bytes): `f1642630783769259ca25a0af3fa577df8e40fbebb97d24ef4f3347bf8627ad0`
- car_v2.obj (178,049,149 bytes): `33312b2764d8f7de210316e737e7cb452d2a0d8e6a17af8e60ba5657b88a0958`
- car_v2.mtl (14,621 bytes): `e0d9a134df4e678d3efa2236e3479f57614e7eb106ab7b36d4eebbc050918acf`

The OBJ declares meters and contains 1,116,086 vertices, 2,142,988 triangles,
1,852 semantic component groups and 94 diffuse materials. Original bounds are
(-0.0462061, -0.0794713, -0.012325) to (0.142588, 0.122701, 0.135624) meters.
The whole export spans 188.7941 x 202.1723 x 147.949 mm. These are CAD-export
extents including an outlying source component, not a confirmed physical robot
specification. The base plate's source bounds span 100 x 200 mm.

Processing uses `scripts/pack-cad-model.py`, an offline authoring tool requiring
NumPy and fast-simplification 0.2.0. The website adds no npm package, runtime 3D
library, remote viewer or iframe. The raw CAD is deliberately not shipped to
browsers. To regenerate using separately installed offline Python packages:

```text
python scripts/pack-cad-model.py car_v2.obj car_v2.mtl public/models/lazygo/lazybot.mgla --triangles 180000
```

The packer welds identical positions within each source component/material.
Redundant microscopic CAD fillets first use a 0.05 mm local vertex-clustering
cell (maximum clustering displacement 0.0867 mm); quadric-error simplification
then operates independently per segment with open borders protected. The camera,
outer shell, LiDAR, servos, base plate and front wheels retain their source
geometry. The target is a budget preference; it cannot force open-boundary
removal to meet a triangle count. The final asset contains 237,633 vertices and
340,345 triangles in 6,460,648 bytes.
Components that would disappear within a cell keep their original geometry.
Reverse-wound triangle pairs remain separate for the renderer's backface culling.
Material regions never mix colors. Twelve spatial/semantic display clusters support the
existing explosion control. These are viewing aids, not a verified mechanical
disassembly sequence. Assembled part transforms and source outliers are retained;
no replacement components are invented. A single rigid axis rotation maps
source (x, y, z) to viewer (x, z, -y), followed by global centering and uniform
scaling. Source diffuse Kd colors are rounded to RGB8. Coordinates are quantized
to signed 16-bit values in the same MGLA v3 format used by the portfolio's
existing MIT-attributed Mongla renderer. Normals are reconstructed by that
renderer, and source transparency/specular properties are not represented by
this format.

`lazybot.json` records the final geometry's SHA-256 hash, byte/triangle/vertex
counts, quantization bound, normalization data, every original diffuse color,
and source-component/material to display-cluster mappings. It is provenance
data and is not required by the browser viewer. The packer writes the binary
atomically and includes the existing parser's required 32-bit index alignment.

The local export's CAD detail is a reference. It does not establish the built
robot's mass, performance, competition result or exact as-built configuration.
