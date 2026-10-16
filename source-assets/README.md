# Source assets

Keep original CAD exports in `cad/<project>/`, outside `public/`. These working
sources stay local and are ignored by Git. The website ships optimized display
meshes from `public/models/`.

- `cad/lazygo/car_v2.step`: the owner's supplied LazyGo Onshape assembly export,
  originally placed in `public/car_v2.step` and moved here without alteration.

Record original hashes, conversion steps and display-model limitations in the
corresponding `public/models/<project>/PROVENANCE.md`. Never overwrite a source
export during conversion. Offline CAD authoring tools are separate from the
dependency-free Node.js website and its build.
