#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const manifestPath = join(projectRoot, "data/assets/spiritvale-assets.json");
const imageRoot = join(projectRoot, "public/images/spiritvale");
const allowedSourceTypes = new Set([
  "official-press-kit",
  "official-steam",
  "official-news",
  "self-captured",
  "community-permission",
]);
const requiredFields = [
  "id",
  "file",
  "subject",
  "category",
  "sourceType",
  "sourceUrl",
  "sourceOwner",
  "usage",
  "alt",
  "width",
  "height",
  "verified",
  "notes",
];
const requiredDirectories = [
  "brand",
  "hero",
  "gameplay",
  "classes/acolyte",
  "classes/mage",
  "classes/summoner",
  "classes/knight",
  "classes/warrior",
  "classes/scout",
  "classes/rogue",
  "guides/beginner",
  "guides/classes",
  "guides/leveling",
  "guides/stats",
  "guides/cards",
  "bosses",
  "monsters",
  "equipment",
  "cards",
  "artifacts",
  "maps",
  "raw",
];

const errors = [];
const fail = (message) => errors.push(message);

function uint24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function readWebpDimensions(buffer, label) {
  if (buffer.length < 20 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error(`${label}: invalid WebP RIFF header`);
  }
  const declaredSize = buffer.readUInt32LE(4) + 8;
  if (declaredSize > buffer.length) throw new Error(`${label}: truncated WebP RIFF data`);

  let offset = 12;
  while (offset + 8 <= declaredSize) {
    const type = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;
    const nextOffset = dataOffset + size + (size % 2);
    if (nextOffset > declaredSize) throw new Error(`${label}: truncated ${type} chunk`);

    if (type === "VP8X" && size >= 10) {
      return {
        width: uint24LE(buffer, dataOffset + 4) + 1,
        height: uint24LE(buffer, dataOffset + 7) + 1,
      };
    }
    if (type === "VP8 " && size >= 10) {
      if (buffer[dataOffset + 3] !== 0x9d || buffer[dataOffset + 4] !== 0x01 || buffer[dataOffset + 5] !== 0x2a) {
        throw new Error(`${label}: invalid VP8 frame header`);
      }
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }
    if (type === "VP8L" && size >= 5) {
      if (buffer[dataOffset] !== 0x2f) throw new Error(`${label}: invalid VP8L signature`);
      const b1 = buffer[dataOffset + 1];
      const b2 = buffer[dataOffset + 2];
      const b3 = buffer[dataOffset + 3];
      const b4 = buffer[dataOffset + 4];
      return {
        width: 1 + b1 + ((b2 & 0x3f) << 8),
        height: 1 + ((b2 & 0xc0) >> 6) + (b3 << 2) + ((b4 & 0x0f) << 10),
      };
    }
    offset = nextOffset;
  }
  throw new Error(`${label}: no readable VP8/VP8L/VP8X image chunk`);
}

function validateRawHeader(buffer, file) {
  const extension = extname(file).toLowerCase();
  if (extension === ".png") {
    const signature = "89504e470d0a1a0a";
    if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== signature || buffer.toString("ascii", 12, 16) !== "IHDR") {
      throw new Error(`${file}: invalid PNG header`);
    }
  } else if (extension === ".jpg" || extension === ".jpeg") {
    if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer.at(-2) !== 0xff || buffer.at(-1) !== 0xd9) {
      throw new Error(`${file}: invalid or truncated JPEG`);
    }
  } else if (extension === ".avif") {
    if (buffer.length < 16 || buffer.toString("ascii", 4, 8) !== "ftyp" || !buffer.subarray(8, 32).toString("ascii").includes("avif")) {
      throw new Error(`${file}: invalid AVIF file type box`);
    }
  } else {
    throw new Error(`${file}: unsupported raw image extension`);
  }
}

function walkFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
}

for (const directory of requiredDirectories) {
  const fullPath = join(imageRoot, directory);
  if (!existsSync(fullPath) || !statSync(fullPath).isDirectory()) fail(`Missing required directory: public/images/spiritvale/${directory}`);
}

let assets;
try {
  assets = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(assets)) throw new Error("manifest root must be an array");
} catch (error) {
  console.error(`FAIL: cannot read ${manifestPath}: ${error.message}`);
  process.exit(1);
}

if (assets.length < 26) fail(`Manifest has ${assets.length} assets; minimum is 26`);

const ids = new Set();
const files = new Set();
const rawSources = new Set();
const onlineHashes = new Map();
const sourceCounts = {};
const categoryCounts = {};

for (const [index, asset] of assets.entries()) {
  const label = asset.id || `record ${index + 1}`;
  for (const field of requiredFields) {
    if (!(field in asset)) fail(`${label}: missing field ${field}`);
  }
  if (ids.has(asset.id)) fail(`${label}: duplicate id`);
  ids.add(asset.id);
  if (files.has(asset.file)) fail(`${label}: duplicate file path`);
  files.add(asset.file);

  if (!allowedSourceTypes.has(asset.sourceType)) fail(`${label}: invalid sourceType ${asset.sourceType}`);
  if (typeof asset.sourceUrl !== "string" || asset.sourceUrl.trim() === "") fail(`${label}: sourceUrl is empty`);
  if (typeof asset.alt !== "string" || asset.alt.trim() === "") fail(`${label}: alt is empty`);
  if (typeof asset.verified !== "boolean") fail(`${label}: verified must be a boolean`);
  if (!/^public\/images\/spiritvale\/.+\/spiritvale-[a-z0-9-]+\.webp$/.test(asset.file)) {
    fail(`${label}: file does not follow the SpiritVale WebP naming convention`);
  }

  const rawMatch = typeof asset.notes === "string" ? asset.notes.match(/Raw source: ([^\s]+?\.(?:png|jpe?g|avif))/i) : null;
  if (!rawMatch) {
    fail(`${label}: notes do not identify a raw source`);
  } else {
    const rawRelative = rawMatch[1];
    if (rawSources.has(rawRelative)) fail(`${label}: raw source is reused by another asset: ${rawRelative}`);
    rawSources.add(rawRelative);
    const rawPath = join(projectRoot, rawRelative);
    if (!existsSync(rawPath)) fail(`${label}: raw source does not exist: ${rawRelative}`);
  }

  const fullPath = join(projectRoot, asset.file);
  if (!existsSync(fullPath)) {
    fail(`${label}: file does not exist: ${asset.file}`);
    continue;
  }
  const buffer = readFileSync(fullPath);
  if (buffer.length === 0) {
    fail(`${label}: file is empty`);
    continue;
  }
  const hash = createHash("sha256").update(buffer).digest("hex");
  if (onlineHashes.has(hash)) fail(`${label}: duplicate file hash with ${onlineHashes.get(hash)}`);
  onlineHashes.set(hash, label);

  try {
    const dimensions = readWebpDimensions(buffer, label);
    if (dimensions.width !== asset.width || dimensions.height !== asset.height) {
      fail(`${label}: manifest dimensions ${asset.width}x${asset.height} do not match file ${dimensions.width}x${dimensions.height}`);
    }
    const maxWidth = asset.category === "hero" ? 1920 : asset.category === "brand" || /banner|card artwork/i.test(asset.usage) ? 1000 : 1400;
    if (dimensions.width > maxWidth) fail(`${label}: width ${dimensions.width}px exceeds ${maxWidth}px limit`);
  } catch (error) {
    fail(error.message);
  }

  sourceCounts[asset.sourceType] = (sourceCounts[asset.sourceType] || 0) + 1;
  categoryCounts[asset.category] = (categoryCounts[asset.category] || 0) + 1;
}

const allImageExtensions = new Set([".png", ".jpg", ".jpeg", ".avif", ".webp"]);
const allImageHashes = new Map();
for (const fullPath of walkFiles(imageRoot).filter((file) => allImageExtensions.has(extname(file).toLowerCase()))) {
  const relative = fullPath.slice(projectRoot.length + 1);
  const buffer = readFileSync(fullPath);
  if (buffer.length === 0) {
    fail(`${relative}: image file is empty`);
    continue;
  }
  const hash = createHash("sha256").update(buffer).digest("hex");
  if (allImageHashes.has(hash)) fail(`${relative}: duplicate image hash with ${allImageHashes.get(hash)}`);
  allImageHashes.set(hash, relative);
  if (relative.includes("/raw/")) {
    try {
      validateRawHeader(buffer, relative);
    } catch (error) {
      fail(error.message);
    }
  }
}

if (rawSources.size !== assets.length) fail(`Expected one unique raw source per asset; got ${rawSources.size} for ${assets.length} assets`);

if (errors.length > 0) {
  console.error(`SpiritVale asset validation FAILED with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("SpiritVale asset validation PASSED");
console.log(`Manifest assets: ${assets.length}`);
console.log(`Unique raw sources: ${rawSources.size}`);
console.log(`All image files checked: ${allImageHashes.size}`);
console.log(`Source counts: ${JSON.stringify(sourceCounts)}`);
console.log(`Category counts: ${JSON.stringify(categoryCounts)}`);
