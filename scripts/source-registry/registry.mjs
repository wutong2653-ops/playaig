import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const registryPath = resolve(root, "data/spiritvale/sources/sources.json");
const fieldNames = new Set(["id", "slug", "name", "category", "rarity", "stats", "effect", "description", "shortDescription", "location", "drop", "level", "imageAssetId", "verifiedAt", "notes", "relatedGuideIds", "classIds", "maxLevel", "cooldownSeconds", "resourceCost", "effectText"]);

export const SOURCE_TYPES = ["official", "community", "manual", "import", "api"];
export const VERIFICATION_LEVELS = [1, 2, 3];
export const MANIFEST_STATUSES = ["draft", "validation", "review", "approved", "rejected"];

export function loadSourceRegistry() {
  return JSON.parse(readFileSync(registryPath, "utf8"));
}

export function getSource(sourceId, registry = loadSourceRegistry()) {
  return registry.find((source) => source.sourceId === sourceId || source.id === sourceId) ?? null;
}

export function checkFieldPermission(sourceId, field, registry = loadSourceRegistry()) {
  const source = getSource(sourceId, registry);
  if (!source) return { allowed: false, reason: "unknown sourceId: " + sourceId };
  if (!fieldNames.has(field)) return { allowed: false, reason: "unknown entity field: " + field };
  if (!SOURCE_TYPES.includes(source.sourceType)) return { allowed: false, reason: "invalid sourceType for " + sourceId };
  if (!VERIFICATION_LEVELS.includes(source.verificationLevel)) return { allowed: false, reason: "invalid verificationLevel for " + sourceId };
  if (!source.allowedFields.includes(field)) return { allowed: false, reason: field + " is not allowed by " + sourceId };
  return { allowed: true, reason: "allowed", source };
}

export function validateManifest(manifest, registry = loadSourceRegistry()) {
  const errors = [];
  if (!manifest || typeof manifest !== "object") errors.push("manifest must be an object");
  if (!manifest?.manifestId) errors.push("manifestId is required");
  if (!manifest?.entityType) errors.push("entityType is required");
  if (!MANIFEST_STATUSES.includes(manifest?.status)) errors.push("invalid status");
  if (!manifest?.extractionDate || Number.isNaN(Date.parse(manifest.extractionDate))) errors.push("invalid extractionDate");
  const source = getSource(manifest?.sourceId, registry);
  if (!source) errors.push("unknown sourceId: " + manifest?.sourceId);
  for (const field of Object.keys(manifest?.extractedFields ?? {})) {
    const permission = checkFieldPermission(manifest.sourceId, field, registry);
    if (!permission.allowed) errors.push(permission.reason);
  }
  return { valid: errors.length === 0, errors };
}

export function dryRun(manifest, registry = loadSourceRegistry()) {
  const validation = validateManifest(manifest, registry);
  return { manifestId: manifest?.manifestId ?? null, status: manifest?.status ?? "rejected", validation, writes: [] };
}
