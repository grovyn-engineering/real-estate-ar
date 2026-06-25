const CDN_BASE = (import.meta.env.VITE_CDN_BASE_URL ?? "").replace(/\/$/, "");

export function assetUrl(path) {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  return CDN_BASE + path;
}
