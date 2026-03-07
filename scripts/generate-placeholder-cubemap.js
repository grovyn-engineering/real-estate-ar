/**
 * Generates 6 placeholder cubemap face images (512x512) with distinct colors and labels.
 * Run: node scripts/generate-placeholder-cubemap.js
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const size = 512;

const faceConfigs = [
  { name: 'front', color: '#4a5568', label: 'FRONT' },
  { name: 'back', color: '#2d3748', label: 'BACK' },
  { name: 'left', color: '#718096', label: 'LEFT' },
  { name: 'right', color: '#5a6578', label: 'RIGHT' },
  { name: 'up', color: '#a0aec0', label: 'UP' },
  { name: 'down', color: '#2c5282', label: 'DOWN' },
];

function hexToRgb(hex) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return match ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) } : null;
}

const outDirs = [
  join(__dirname, '..', 'src', 'panorama'),
  join(__dirname, '..', 'public', 'panorama'),
];

for (const outDir of outDirs) {
  mkdirSync(outDir, { recursive: true });
}

for (const { name, color, label } of faceConfigs) {
  const rgb = hexToRgb(color);
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="48" font-weight="bold" fill="white" 
            text-anchor="middle" dominant-baseline="middle" opacity="0.9">${label}</text>
    </svg>
  `;
  const buf = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
  for (const outDir of outDirs) {
    writeFileSync(join(outDir, `cube_${name}.png`), buf);
  }
}

console.log(`Created 6 labeled placeholder cubemap images (${size}x${size}) in src/panorama/ and public/panorama/`);
