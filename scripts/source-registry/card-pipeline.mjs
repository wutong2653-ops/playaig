import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { checkFieldPermission, loadSourceRegistry } from "./registry.mjs";
import { buildValidationReport, isEntityReady } from "./approval.mjs";

const root = resolve(import.meta.dirname, "../..");
export const cardsPath = resolve(root, "data/spiritvale/cards/cards.json");
export const manifestsPath = resolve(root, "data/spiritvale/acquisition/manifests.json");

const slugify = (value) => String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function manifestToCardEntity(manifest, registry = loadSourceRegistry()) {
  if (!isEntityReady(manifest)) return { record: null, errors: ["manifest is not approved or does not meet the confidence threshold"] };
  if (!(["card", "cards"].includes(manifest.entityType))) return { record: null, errors: ["manifest entityType is not card"] };
  const fields = manifest.extractedFields ?? {};
  if (!fields.name) return { record: null, errors: ["approved card is missing a verified name"] };
  const errors = [];
  for (const field of ["name", "category", "rarity", "effect", "description", "imageAssetId", "notes"]) {
    if (fields[field] !== undefined && fields[field] !== null && !checkFieldPermission(manifest.sourceId, field, registry).allowed) errors.push(field + " is not permitted by the manifest source");
  }
  if (errors.length) return { record: null, errors };
  const slug = slugify(fields.name);
  if (!slug) return { record: null, errors: ["verified card name cannot produce a slug"] };
  return {
    record: {
      id: manifest.entityIdCandidate?.startsWith("card-") ? manifest.entityIdCandidate : "card-" + slug,
      slug,
      name: fields.name,
      category: fields.category ?? null,
      rarity: fields.rarity ?? null,
      effect: fields.effect ?? null,
      description: fields.description ?? null,
      sourceIds: [manifest.sourceId],
      imageAssetId: fields.imageAssetId ?? null,
      verifiedAt: manifest.reviewDate ?? manifest.extractionDate,
      notes: manifest.reviewNotes ?? fields.notes ?? null,
      relatedGuideIds: Array.isArray(fields.relatedGuideIds) ? fields.relatedGuideIds : []
    },
    errors: []
  };
}

export function processApprovedCardManifests(manifests, registry = loadSourceRegistry()) {
  const generated = [];
  const rejected = [];
  for (const manifest of manifests) {
    if (manifest.status !== "approved") continue;
    const result = manifestToCardEntity(manifest, registry);
    if (result.record) generated.push(result.record);
    else rejected.push({ manifestId: manifest.manifestId, errors: result.errors });
  }
  return { generated, rejected, writes: generated.length };
}

export function writeApprovedCardEntities(records, outputPath = cardsPath) {
  if (!records.length) return { written: false, count: 0, outputPath };
  const existing = JSON.parse(readFileSync(outputPath, "utf8"));
  const byId = new Map(existing.map((record) => [record.id, record]));
  for (const record of records) byId.set(record.id, record);
  writeFileSync(outputPath, JSON.stringify([...byId.values()], null, 2) + "\n");
  return { written: true, count: records.length, outputPath };
}

export function loadAcquisitionManifests(inputPath = manifestsPath) {
  return JSON.parse(readFileSync(inputPath, "utf8"));
}

export function buildCardPipelineReport(manifests, registry = loadSourceRegistry()) {
  const result = processApprovedCardManifests(manifests, registry);
  return {
    manifestCount: manifests.length,
    draftCount: manifests.filter((manifest) => manifest.status === "draft").length,
    reviewCount: manifests.filter((manifest) => manifest.status === "review").length,
    approvedCount: manifests.filter((manifest) => manifest.status === "approved").length,
    rejectedCount: manifests.filter((manifest) => manifest.status === "rejected").length,
    generatedCount: result.generated.length,
    rejectedApprovedManifests: result.rejected,
    writes: result.writes,
    validationReports: manifests.map((manifest) => buildValidationReport(manifest, registry))
  };
}
