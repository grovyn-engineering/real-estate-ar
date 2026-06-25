/**
 * Uploads dist-assets/ to Cloudflare R2.
 * Uses R2's S3-compatible API — no extra CLI tools needed.
 *
 * Setup (one-time):
 *   1. Copy .env.example → .env.local and fill in R2 credentials
 *   2. npm install
 *   3. npm run compress        (optional but recommended)
 *   4. npm run upload
 */

import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { readdirSync, statSync, createReadStream, readFileSync } from "fs";
import { join, relative, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (Vite env vars aren't available in plain Node scripts)
function loadEnv() {
  const envPath = join(__dirname, "..", ".env.local");
  try {
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {
    // .env.local missing — rely on actual env vars
  }
}

loadEnv();

const ACCOUNT_ID   = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY   = process.env.R2_ACCESS_KEY_ID;
const SECRET_KEY   = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET       = process.env.R2_BUCKET_NAME;

if (!ACCOUNT_ID || !ACCESS_KEY || !SECRET_KEY || !BUCKET) {
  console.error(`
Missing R2 credentials. Add to .env.local:

  R2_ACCOUNT_ID=your_account_id
  R2_ACCESS_KEY_ID=your_access_key
  R2_SECRET_ACCESS_KEY=your_secret_key
  R2_BUCKET_NAME=your_bucket_name
`);
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
});

const MIME = {
  ".gltf":  "model/gltf+json",
  ".glb":   "model/gltf-binary",
  ".bin":   "application/octet-stream",
  ".png":   "image/png",
  ".jpg":   "image/jpeg",
  ".jpeg":  "image/jpeg",
  ".webp":  "image/webp",
  ".exr":   "image/x-exr",
  ".txt":   "text/plain",
};

function allFiles(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) results.push(...allFiles(full, base));
    else results.push({ full, key: relative(base, full).replace(/\\/g, "/") });
  }
  return results;
}

// Upload from dist-assets/ if it exists, otherwise fall back to public/
const SRC_DIRS = [
  { local: join(__dirname, "..", "dist-assets"), prefix: "" },
  { local: join(__dirname, "..", "public", "models"), prefix: "models" },
  { local: join(__dirname, "..", "public", "360"),   prefix: "360" },
];

async function alreadyUploaded(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let files = [];
  let srcLabel = "";

  // Prefer compressed dist-assets if available
  const distDir = join(__dirname, "..", "dist-assets");
  try {
    statSync(distDir);
    files = allFiles(distDir);
    srcLabel = "dist-assets/ (compressed)";
  } catch {
    // Fall back to raw public/ assets
    for (const { local, prefix } of SRC_DIRS.slice(1)) {
      try {
        statSync(local);
        files.push(...allFiles(local).map(({ full, key }) => ({
          full,
          key: prefix ? `${prefix}/${key}` : key,
        })));
      } catch { /* dir doesn't exist */ }
    }
    srcLabel = "public/ (uncompressed — consider running npm run compress first)";
  }

  if (!files.length) {
    console.error("No assets found. Run from project root.");
    process.exit(1);
  }

  console.log(`\nUploading ${files.length} files from ${srcLabel} → r2://${BUCKET}\n`);

  let uploaded = 0, skipped = 0, failed = 0;

  for (const { full, key } of files) {
    if (await alreadyUploaded(key)) {
      process.stdout.write(`  skip  ${key}\n`);
      skipped++;
      continue;
    }

    try {
      const upload = new Upload({
        client,
        params: {
          Bucket: BUCKET,
          Key: key,
          Body: createReadStream(full),
          ContentType: MIME[extname(full).toLowerCase()] ?? "application/octet-stream",
          CacheControl: "public, max-age=31536000, immutable",
        },
      });
      await upload.done();
      process.stdout.write(`  ✓     ${key}\n`);
      uploaded++;
    } catch (err) {
      process.stdout.write(`  ✗     ${key}  (${err.message})\n`);
      failed++;
    }
  }

  console.log(`\nDone. uploaded=${uploaded}  skipped=${skipped}  failed=${failed}`);

  if (uploaded > 0) {
    console.log(`\nNext: set in Netlify environment variables:`);
    console.log(`  VITE_CDN_BASE_URL = https://your-public-r2-domain.com`);
  }
}

main();
