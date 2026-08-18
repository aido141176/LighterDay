# Spatial Keyframe & Pseudo-3D Rotation System Skill

This skill governs the production pipeline for creating ultra-lightweight, high-performance pseudo-3D object views using sequenced image frames generated from short video loops. It enforces Astro's zero-JS-by-default architecture and maximizes user experience without heavy 3D engine bundles.

## 1. Asset Generation & Prompting (Video-to-Frames)
When the user asks to create an asset for the `SpatialViewer`, use the following structural prompt framework to ensure the clip can be split cleanly into interaction loops:

- **Framing & Continuity:** Use a perfectly locked orbit, 360-degree pan, or clean 90-degree sweeping camera movement.
- **Lighting & Backdrop:** Force a completely neutral, clean studio background (e.g., solid gray `#f0f0f0`, dark slate, or uniform studio cyclorama). Avoid particle drifts, flickering light sources, or background changes.
- **Subject Stability:** The target object must remain fixed in the dead center of the frame. It must not morph, change shape, or move independently of the camera rotation.

### Test Asset Specification Profile (Baseline Object)
When generating a benchmark test, structure the video prompt exactly like this:
> "A flawless, photorealistic metallic structural geometric sculpture sitting on a clean, flat matte white studio surface. Studio lighting casting faint, soft shadows below the object. The camera performs a perfectly smooth, level, continuous horizontal 90-degree orbital rotation around the sculpture. 4k resolution, crisp details, zero background movement, ultra-consistent geometry."

## 2. Local File & Conversion Specifications
Instruct the user or build workflows to convert raw video output into discrete frames using standard terminal utilities:
- **Conversion Utility:** FFmpeg
- **Command Architecture:** `ffmpeg -i input.mp4 -vf "fps=24" ./public/frames/hero_%03d.png`
- **Asset Naming Engine:** Always pads frame indices with leading zeros (`_001.png`, `_012.png`) to preserve clean string sorting loops in JavaScript array builders.

## 3. Astro Component Implementation Architecture
When generating or modifying components like `SpatialViewer.astro`, strictly adhere to these performance and structural laws:

- **Zero-Flicker Image Preloading:** Always inject an immediate, non-blocking cache preloader loop inside the client-side `<script>` tag. Images must be fetched into browser memory sequentially before interaction begins.
- **Pointer & Input Mapping:**
  - Mouse dragging must calculate changes along the `clientX` delta vector.
  - Divide pointer movement pixels by a configurable step/sensitivity ratio (default: `12`) to ensure fluid, non-snapping transitions.
  - Implement a mathematical rollover wrapper so frames loop seamlessly if a full 360-degree clip is used: `let frame = ((current + offset - 1) % total) + 1`.
- **TinaCMS Visual Editor Safety:**
  - Ensure the parent container node handles dynamic dimensions explicitly so the layout doesn't collapse inside administrative preview frames.
  - Use defensive typing (`as HTMLImageElement`) and null checks (`if (targetImage)`) to survive headless builds or non-browser rendering contexts during Astro build phases.
