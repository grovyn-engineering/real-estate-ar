#!/usr/bin/env bash
# Compress 3D models with Draco geometry compression + WebP textures,
# then resize 360° panoramas. Run this BEFORE uploading to CDN.
#
# Requires:
#   npm install -g @gltf-transform/cli sharp-cli
#   (sharp-cli is optional — only needed for panorama resizing)
#
# Usage:
#   bash scripts/compress-assets.sh
#   bash scripts/compress-assets.sh --models-only
#   bash scripts/compress-assets.sh --360-only

set -euo pipefail

MODELS_DIR="public/models"
PANO_DIR="public/360"
OUT_MODELS_DIR="dist-assets/models"
OUT_PANO_DIR="dist-assets/360"

compress_models=true
compress_360=true

for arg in "$@"; do
  case $arg in
    --models-only) compress_360=false ;;
    --360-only)    compress_models=false ;;
  esac
done

GLTF_TRANSFORM="./node_modules/.bin/gltf-transform"
if [ ! -f "$GLTF_TRANSFORM" ]; then
  echo "@gltf-transform/cli not found — run: npm install"
  exit 1
fi

# ── 3D Models ────────────────────────────────────────────────────────────────
if $compress_models && [ -d "$MODELS_DIR" ]; then
  echo ""
  echo "=== Compressing 3D models ==="
  mkdir -p "$OUT_MODELS_DIR"

  find "$MODELS_DIR" -name "*.gltf" | while read -r src; do
    rel="${src#$MODELS_DIR/}"
    dir=$(dirname "$rel")
    base=$(basename "$rel" .gltf)
    outdir="$OUT_MODELS_DIR/$dir"
    mkdir -p "$outdir"

    echo "  → $rel"
    $GLTF_TRANSFORM optimize "$src" "$outdir/${base}.glb" \
      --compress draco \
      --texture-compress webp \
      --texture-resize 2048 \
      2>&1 | tail -3
  done

  echo ""
  echo "Model sizes before → after:"
  before=$(du -sh "$MODELS_DIR" | cut -f1)
  after=$(du -sh "$OUT_MODELS_DIR" | cut -f1)
  echo "  Before: $before   After: $after"
fi

# ── 360° Panoramas ───────────────────────────────────────────────────────────
if $compress_360 && [ -d "$PANO_DIR" ]; then
  echo ""
  echo "=== Optimising 360° panoramas ==="
  mkdir -p "$OUT_PANO_DIR"

  # Convert JPEG/PNG panoramas to WebP at 85% quality, max 6000px wide
  find "$PANO_DIR" -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read -r src; do
    base=$(basename "$src")
    name="${base%.*}"
    echo "  → $base"
    if command -v sharp &>/dev/null; then
      sharp --input "$src" --output "$OUT_PANO_DIR/${name}.webp" \
        resize 6000 --withoutEnlargement \
        --quality 85 2>/dev/null || cp "$src" "$OUT_PANO_DIR/$base"
    else
      # Fallback: copy as-is (install sharp-cli for actual compression)
      cp "$src" "$OUT_PANO_DIR/$base"
      echo "    (sharp-cli not found — copied without compression)"
    fi
  done

  # EXR files: copy as-is — Three.js needs them for HDR lighting
  find "$PANO_DIR" -name "*.exr" | while read -r src; do
    cp "$src" "$OUT_PANO_DIR/"
    echo "  → $(basename $src) (EXR — copied)"
  done

  echo ""
  before=$(du -sh "$PANO_DIR" | cut -f1)
  after=$(du -sh "$OUT_PANO_DIR" | cut -f1)
  echo "Panorama sizes before → after:"
  echo "  Before: $before   After: $after"
fi

echo ""
echo "✓ Done. Compressed assets in dist-assets/"
echo ""
echo "Next steps:"
echo "  1. Review dist-assets/ visually in the browser"
echo "  2. Upload to your CDN bucket:"
echo "       rclone sync dist-assets/ r2:your-bucket-name/  (Cloudflare R2)"
echo "       aws s3 sync dist-assets/ s3://your-bucket/      (AWS S3)"
echo "  3. Set VITE_CDN_BASE_URL=https://your-cdn-domain.com in .env.production"
echo "  4. Run: npm run build"
