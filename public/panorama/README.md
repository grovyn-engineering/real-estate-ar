# Panorama Images for Office Virtual Tour

Place your 360° panorama files here.

## Option 1: Equirectangular (single JPG) — recommended for full 3D view
- Add **panorama.jpg** (a single 360° equirectangular image)
- In `src/components/PropertyTour.jsx`, set `USE_EQUIRECTANGULAR = true`

## Option 2: Cubemap (6 faces)
- Add 6 PNG files: **cube_front.png**, **cube_back.png**, **cube_left.png**, **cube_right.png**, **cube_up.png**, **cube_down.png**
- Ensure each face is square (e.g. 512×512 or 1024×1024)
- Keep `USE_EQUIRECTANGULAR = false` in PropertyTour.jsx
