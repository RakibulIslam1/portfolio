# Mongla CAD assets and viewer

Source: https://fh1m.github.io/mongla_ws/ and https://github.com/fh1m/mongla_ws
Upstream commit inspected: c67a0805206b88a25e541a5fe0c3a95afb168b40.
Retrieved on 2026-10-15. See LICENSE.txt for the retained MIT license.

- hull-viewer.js is adapted from docs/assets/hull-viewer.js, copyright 2026 Muhammad Fahim Faisal.
- ../../models/mongla/hull.mgla is the original unmodified docs/assets/cad/hull.mgla.
- ../../models/mongla/hull-poster.webp is the original unmodified docs/imgs/cad/mongla-iso.webp.

Local changes to the viewer: native ES-module export; bounded fetch and container checks; optional automatic rotation (off by default); rotation-state callback; draw only when interacting/rotating/settling; suspend when offscreen or hidden; observe resize and live reduced-motion changes; immediate assembly changes under reduced motion; framing for narrow canvases; reset assembly with the view; and disable the upstream X/manual scroll mode because the portfolio uses a dedicated assembly slider. Model geometry, vertex colours and shaders retain the original implementation.

The source CAD has five thrusters and passive roll. The owner explicitly retained their seven-thruster/six-DOF project specification and requested labelling this CAD geometry separately. Do not treat CAD dimensions as measurements of a confirmed seven-thruster revision. Never derive mass, buoyancy, depth rating or underwater performance from this mesh.

Asset SHA-256:

- hull.mgla: f2e343920e674f947e16fcb6cbe5a29e4cbe4d5f79687137235be538e80caa9d
- hull-poster.webp: 448c424d83c4e7fe7a2dd4fb91db2993532bd5cf6ee84f95ac6de4a1215774ba

The portfolio uses local assets and adds no npm/runtime library dependency or third-party iframe.

LazyGo also uses this renderer with a separate, locally packed MGLA assembly;
its geometry attribution and conversion records are in ../../models/lazygo/.
Optional per-model yaw, pitch and camera distance now support that assembly's
opening view. Both button and keyboard resets restore the configured angles;
the original Mongla camera defaults and source assets are unchanged.

An optional model-specific download timeout is clamped to 1–60 seconds. LazyGo
uses 45 seconds for its larger assembly; Mongla retains the 15-second default.
