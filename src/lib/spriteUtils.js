import * as THREE from "three";

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function makeHotspotSprite(label) {
  const W = 512, H = 120;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 18;

  ctx.fillStyle = "rgba(10, 10, 10, 0.92)";
  roundRect(ctx, 4, 4, W - 8, H - 8, 30);
  ctx.fill();

  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2;
  roundRect(ctx, 5, 5, W - 10, H - 10, 29);
  ctx.stroke();

  const cx = 52, cy = H / 2, r = 22;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - 7, cy - 8);
  ctx.lineTo(cx + 5, cy);
  ctx.lineTo(cx - 7, cy + 8);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "600 38px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 90, H / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
  sprite.scale.set(90, 21, 1);
  return sprite;
}

export function makeLabelSprite(text, selected) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = selected ? "rgba(30,80,220,0.9)" : "rgba(30,30,60,0.75)";
  ctx.beginPath();
  ctx.roundRect(4, 4, 504, 120, 16);
  ctx.fill();

  ctx.fillStyle = selected ? "#ffffff" : "#ccddff";
  ctx.font = `bold ${selected ? 56 : 48}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 256, 64);

  const tex = new THREE.CanvasTexture(canvas);
  return new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
}
