#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dataRoot = join(root, "data/spiritvale");
const schemaRoot = join(root, "schemas/spiritvale");
const errors = [];
const metrics = { schemaFiles: 0, dataFiles: 0, records: 0, duplicateIds: 0, duplicateSlugs: 0, invalidReferences: 0, invalidImageAssetIds: 0, invalidSourceIds: 0 };
const fail = (message) => errors.push(message);
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const dateTime = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && !Number.isNaN(Date.parse(value));

function hasType(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  return typeof value === type;
}

function validate(value, schema, path) {
  if (schema.enum && !schema.enum.includes(value)) fail(path + ": value is not in enum");
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((type) => hasType(value, type))) {
      fail(path + ": expected " + types.join("|"));
      return;
    }
  }
  if (schema.pattern && typeof value === "string" && !(new RegExp(schema.pattern)).test(value)) fail(path + ": does not match required pattern");
  if (schema.minLength !== undefined && typeof value === "string" && value.length < schema.minLength) fail(path + ": shorter than minLength");
  if (schema.minimum !== undefined && typeof value === "number" && value < schema.minimum) fail(path + ": below minimum");
  if (schema.format === "date-time" && value !== null && !dateTime(value)) fail(path + ": invalid date-time");
  if (schema.format === "uri" && typeof value === "string") {
    try {
      const url = new URL(value);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch { fail(path + ": invalid http(s) URI"); }
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) fail(path + ": fewer than minItems");
    if (schema.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) fail(path + ": duplicate array item");
    if (schema.items) value.forEach((item, index) => validate(item, schema.items, path + "[" + index + "]"));
  }
  if (hasType(value, "object")) {
    for (const key of schema.required || []) if (!(key in value)) fail(path + ": missing required field " + key);
    if (schema.additionalProperties === false) {
      const known = new Set(Object.keys(schema.properties || {}));
      for (const key of Object.keys(value)) if (!known.has(key)) fail(path + ": unknown field " + key);
    }
    for (const [key, propertySchema] of Object.entries(schema.properties || {})) if (key in value) validate(value[key], propertySchema, path + "." + key);
  }
}

const collections = {
  class: "classes/classes.json", build: "builds/builds.json", skill: "skills/skills.json", equipment: "equipment/equipment.json",
  card: "cards/cards.json", artifact: "artifacts/artifacts.json", boss: "bosses/bosses.json", monster: "monsters/monsters.json",
  map: "maps/maps.json", guide: "guides/guides.json", source: "sources/sources.json", gameVersion: "game-versions.json"
};
const schemaNames = {
  class: "class.schema.json", build: "build.schema.json", skill: "skill.schema.json", equipment: "equipment.schema.json",
  card: "card.schema.json", artifact: "artifact.schema.json", boss: "boss.schema.json", monster: "monster.schema.json",
  map: "map.schema.json", guide: "guide.schema.json", source: "source.schema.json", gameVersion: "game-version.schema.json"
};
const schemaFiles = readdirSync(schemaRoot).filter((file) => file.endsWith(".schema.json"));
metrics.schemaFiles = schemaFiles.length;
const schemas = Object.fromEntries(schemaFiles.map((file) => [file, readJson(join(schemaRoot, file))]));
for (const schema of Object.values(schemas)) {
  if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema") fail((schema.$id || "schema") + ": wrong draft");
  if (schema.additionalProperties !== false) fail((schema.$id || "schema") + ": additionalProperties must be false");
}

const recordsByType = {};
for (const [type, relative] of Object.entries(collections)) {
  const path = join(dataRoot, relative);
  if (!existsSync(path)) {
    fail("Missing data file: data/spiritvale/" + relative);
    recordsByType[type] = [];
    continue;
  }
  const records = readJson(path);
  metrics.dataFiles += 1;
  if (!Array.isArray(records)) fail("data/spiritvale/" + relative + ": root must be an array");
  recordsByType[type] = Array.isArray(records) ? records : [];
  recordsByType[type].forEach((record, index) => validate(record, schemas[schemaNames[type]], relative + "[" + index + "]"));
}

const taxonomyRecords = {};
for (const file of readdirSync(join(dataRoot, "taxonomies")).filter((name) => name.endsWith(".json")).sort()) {
  const records = readJson(join(dataRoot, "taxonomies", file));
  const key = file.replace(".json", "");
  metrics.dataFiles += 1;
  if (!Array.isArray(records)) fail("taxonomies/" + file + ": root must be an array");
  taxonomyRecords[key] = Array.isArray(records) ? records : [];
  taxonomyRecords[key].forEach((record, index) => validate(record, schemas["taxonomy.schema.json"], "taxonomies/" + file + "[" + index + "]"));
}

const allRecords = Object.entries(recordsByType).flatMap(([type, records]) => records.map((record) => ({ type, record })));
const allIds = new Map();
for (const { type, record } of allRecords) {
  metrics.records += 1;
  if (allIds.has(record.id)) {
    metrics.duplicateIds += 1;
    fail("Duplicate entity id " + record.id);
  } else allIds.set(record.id, type);
}
for (const [taxonomy, records] of Object.entries(taxonomyRecords)) {
  const slugs = new Set();
  for (const record of records) {
    metrics.records += 1;
    if (allIds.has(record.id)) {
      metrics.duplicateIds += 1;
      fail("Duplicate id " + record.id + " in taxonomy " + taxonomy);
    } else allIds.set(record.id, "taxonomy:" + taxonomy);
    if (slugs.has(record.slug)) {
      metrics.duplicateSlugs += 1;
      fail("Duplicate slug " + record.slug + " in taxonomy " + taxonomy);
    }
    slugs.add(record.slug);
  }
}
for (const [type, records] of Object.entries(recordsByType)) {
  const slugs = new Set();
  for (const record of records) {
    if (record.slug === undefined) continue;
    if (slugs.has(record.slug)) {
      metrics.duplicateSlugs += 1;
      fail("Duplicate slug " + record.slug + " in " + type);
    }
    slugs.add(record.slug);
  }
}

const ids = Object.fromEntries(Object.entries(recordsByType).map(([type, records]) => [type, new Set(records.map((record) => record.id))]));
const taxIds = Object.fromEntries(Object.entries(taxonomyRecords).map(([type, records]) => [type, new Set(records.map((record) => record.id))]));
const assetIds = new Set(readJson(join(root, "data/assets/spiritvale-assets.json")).map((asset) => asset.id));
const entityTargets = {
  classId: "class", parentClassId: "class", classIds: "class", advancedClassIds: "class", recommendedClassIds: "class", relatedClassIds: "class",
  recommendedBuildIds: "build", alternativeBuildIds: "build", relatedBuildIds: "build",
  skillIds: "skill", prerequisiteSkillIds: "skill", nextSkillIds: "skill", relatedSkillIds: "skill",
  equipmentIds: "equipment", relatedEquipmentIds: "equipment", dropIds: "equipment",
  cardIds: "card", cardDropIds: "card", relatedCardIds: "card",
  artifactIds: "artifact", relatedArtifactIds: "artifact",
  bossIds: "boss", relatedBossIds: "boss", monsterIds: "monster", relatedMonsterIds: "monster",
  mapId: "map", mapIds: "map", relatedMapIds: "map", connectedMapIds: "map", gameVersionId: "gameVersion"
};
const taxonomyTargets = {
  roleIds: "roles", weaponTypeIds: "weapon-types", primaryStatIds: "stats", secondaryStatIds: "stats",
  purposeIds: "build-purposes", gameStageIds: "game-stages", playModeIds: "play-modes", skillTypeIds: "skill-types",
  elementIds: "elements", equipmentTypeId: "equipment-types", compatibleEquipmentTypeIds: "equipment-types",
  weaponTypeId: "weapon-types", rarityId: "rarities", spawnTypeId: "spawn-types", monsterTypeId: "monster-types",
  mapTypeId: "map-types", guideTypeId: "guide-types"
};
function checkIds(value, valid, location) {
  for (const id of Array.isArray(value) ? value : [value]) if (id !== null && !valid.has(id)) {
    metrics.invalidReferences += 1;
    fail(location + ": invalid reference " + id);
  }
}
for (const { type, record } of allRecords) {
  const location = type + ":" + record.id;
  for (const [field, target] of Object.entries(entityTargets)) if (field in record) checkIds(record[field], ids[target], location + "." + field);
  for (const [field, target] of Object.entries(taxonomyTargets)) if (field in record) checkIds(record[field], taxIds[target] || new Set(), location + "." + field);
  if ("sourceIds" in record) {
    for (const sourceId of record.sourceIds) if (!ids.source.has(sourceId)) {
      metrics.invalidSourceIds += 1;
      fail(location + ".sourceIds: invalid source " + sourceId);
    }
    if (record.verificationStatus === "verified" && record.sourceIds.length === 0) fail(location + ": verified entity has no sourceIds");
  }
  if ("imageAssetIds" in record) for (const assetId of record.imageAssetIds) if (!assetIds.has(assetId)) {
    metrics.invalidImageAssetIds += 1;
    fail(location + ".imageAssetIds: invalid asset " + assetId);
  }
  if (record.status === "published" && record.verificationStatus === "unverified") fail(location + ": published entity cannot be unverified");
  if (type === "build" && record.tested && (!record.testedAt || !record.gameVersionId)) fail(location + ": tested build requires testedAt and gameVersionId");
}

const guideRecords = recordsByType.guide;
const guideCanonicalPaths = new Set();
const guideForbiddenTerms = ["lorem ipsum", "todo", "tbd", "placeholder guide"];
for (const guide of guideRecords) {
  const location = "guide:" + guide.id;
  if (guideCanonicalPaths.has(guide.seo.canonicalPath)) {
    metrics.duplicateSlugs += 1;
    fail(location + ": duplicate guide canonicalPath " + guide.seo.canonicalPath);
  }
  guideCanonicalPaths.add(guide.seo.canonicalPath);
  if (guide.seo.canonicalPath !== "/guides/" + guide.slug + "/") fail(location + ": canonicalPath does not match guide slug");
  if (guide.sections.length < 4) fail(location + ": requires at least four sections");
  if (guide.imageAssetIds.length < 2) fail(location + ": requires at least two registered images");
  if (!guide.seo.title || !guide.seo.description || !guide.seo.index) fail(location + ": published SEO title, description, and index are required");
  if (!["draft", "reviewed", "published"].includes(guide.editorialStatus)) fail(location + ": invalid editorialStatus");
  if (!["unverified", "partially-verified", "verified"].includes(guide.factReviewStatus)) fail(location + ": invalid factReviewStatus");
  if (guide.editorialStatus === "published" && guide.factReviewStatus === "unverified") fail(location + ": published guide cannot be factReviewStatus unverified");
  const sectionIds = new Set();
  const sectionAnchors = new Set();
  for (const section of guide.sections) {
    if (sectionIds.has(section.id)) fail(location + ": duplicate guide section id " + section.id);
    if (sectionAnchors.has(section.anchor)) fail(location + ": duplicate guide section anchor " + section.anchor);
    sectionIds.add(section.id);
    sectionAnchors.add(section.anchor);
    if (!guide.sectionIds.includes(section.id)) fail(location + ": section id missing from sectionIds " + section.id);
    if (section.sourceIds.length === 0) fail(location + ": factual section has no sourceIds " + section.id);
    for (const sourceId of section.sourceIds) if (!ids.source.has(sourceId)) {
      metrics.invalidSourceIds += 1;
      fail(location + ": invalid section sourceId " + sourceId);
    }
    for (const block of section.contentBlocks) {
      for (const sourceId of block.sourceIds) if (!ids.source.has(sourceId)) {
        metrics.invalidSourceIds += 1;
        fail(location + ": invalid content block sourceId " + sourceId);
      }
      if (block.imageAssetId && !assetIds.has(block.imageAssetId)) {
        metrics.invalidImageAssetIds += 1;
        fail(location + ": invalid content block imageAssetId " + block.imageAssetId);
      }
    }
  }
  if (sectionIds.size !== guide.sectionIds.length) fail(location + ": sectionIds do not match section records");
  const faqIds = new Set();
  for (const faq of guide.faqItems) {
    if (faqIds.has(faq.id)) fail(location + ": duplicate FAQ id " + faq.id);
    faqIds.add(faq.id);
    if (faq.sourceIds.length === 0) fail(location + ": FAQ has no sourceIds " + faq.id);
    for (const sourceId of faq.sourceIds) if (!ids.source.has(sourceId)) {
      metrics.invalidSourceIds += 1;
      fail(location + ": invalid FAQ sourceId " + sourceId);
    }
  }
  if (new Set(guide.relatedGuideIds).size !== guide.relatedGuideIds.length) fail(location + ": duplicate relatedGuideIds");
  for (const relatedGuideId of guide.relatedGuideIds) {
    if (relatedGuideId === guide.id) fail(location + ": guide cannot relate to itself");
    if (!ids.guide.has(relatedGuideId)) {
      metrics.invalidReferences += 1;
      fail(location + ": invalid relatedGuideId " + relatedGuideId);
    }
  }
  const text = JSON.stringify(guide).toLowerCase();
  if (guideForbiddenTerms.some((term) => text.includes(term))) fail(location + ": contains forbidden placeholder text");
  if (text.includes("/images/") || /https?:\/\/[^"]+\.(?:png|jpe?g|webp|gif)/i.test(JSON.stringify(guide))) fail(location + ": contains a direct image path or external image URL");
}

if (errors.length) {
  console.error("SpiritVale data validation FAILED with " + errors.length + " error(s):");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}
console.log("SpiritVale data validation PASSED");
console.log("Schema files: " + metrics.schemaFiles);
console.log("Data files: " + metrics.dataFiles);
console.log("Formal records: " + metrics.records);
console.log("Duplicate IDs: " + metrics.duplicateIds);
console.log("Duplicate slugs: " + metrics.duplicateSlugs);
console.log("Invalid references: " + metrics.invalidReferences);
console.log("Invalid image asset IDs: " + metrics.invalidImageAssetIds);
console.log("Invalid source IDs: " + metrics.invalidSourceIds);
