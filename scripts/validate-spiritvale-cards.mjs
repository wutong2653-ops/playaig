import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { checkFieldPermission } from "./source-registry/registry.mjs";
import { cardTitle } from "../src/shared/card-seo.mjs";

const root = process.cwd();
const readJson = (file) => JSON.parse(readFileSync(resolve(root, file), "utf8"));
const readText = (file) => readFileSync(resolve(root, file), "utf8");
const fail = (message) => { throw new Error(message); };

const cards = readJson("data/spiritvale/cards/cards.json");
const schema = readJson("data/spiritvale/cards/schema.json");
const acquisitionSchema = readJson("data/spiritvale/acquisition/schema.json");
const acquisitionJsonSchema = readJson("schemas/spiritvale/acquisition-manifest.schema.json");
const sources = readJson("data/spiritvale/sources/sources.json");
const manifests = readJson("data/spiritvale/acquisition/manifests.json");
const guides = readJson("data/spiritvale/guides/guides.json");
const assets = readJson("data/assets/spiritvale-assets.json");
const sourceIds = new Set(sources.map((source) => source.id));
const guideIds = new Set(guides.map((guide) => guide.id));
const assetIds = new Set(assets.map((asset) => asset.id));
const app = readText("src/app/App.tsx");
const content = readText("src/data/content.ts");
const search = readText("src/data/search.ts");
const detail = readText("src/app/CardDetailPage.tsx");
const site = readText("src/app/site.ts");
const templates = readText("src/components/database/templates.tsx");
const generator = readText("scripts/generate-spiritvale-seo.mjs");
const prerender = readText("scripts/prerender-spiritvale-database.mjs");
const pipeline = readText("scripts/source-registry/card-pipeline.mjs");
const communityAdapter = readText("scripts/source-registry/community-card-import.mjs");

for (const source of sources) {
  for (const field of ["sourceId", "sourceType", "sourceAuthority", "sourceUrl", "publisher", "verificationLevel", "lastChecked", "allowedFields"]) {
    if (!(field in source)) fail("Source Registry 2.0 field missing: " + source.id + "." + field);
  }
  if (source.sourceId !== source.id || source.sourceUrl !== source.url) fail("Legacy source aliases must match Source Registry 2.0 fields for " + source.id + ".");
  if (!Array.isArray(source.allowedFields) || source.verificationLevel < 1 || source.verificationLevel > 3) fail("Invalid Source Registry 2.0 permission metadata for " + source.id + ".");
}

if (!Array.isArray(cards)) fail("Cards collection must be an array.");
for (const field of ["manifestId", "sourceId", "entityType", "entityIdCandidate", "rawData", "extractedFields", "fieldEvidence", "sourceLocator", "extractionDate", "operator", "confidenceScore", "status"]) {
  if (!acquisitionSchema.required.includes(field) || !acquisitionJsonSchema.required.includes(field)) fail("Acquisition Manifest schema is missing required field " + field + ".");
}
if (!acquisitionSchema.statuses.includes("validation") || !acquisitionJsonSchema.properties.status.enum.includes("validation")) fail("Acquisition Manifest validation status is missing.");
if (!acquisitionSchema.entityTypes.includes("card") || !acquisitionJsonSchema.properties.entityType.enum.includes("card")) fail("Singular card Manifest entityType is missing.");
const communitySource = sources.find((source) => source.id === "source-community-spiritvale-info-cards");
if (!communitySource || communitySource.sourceType !== "community" || communitySource.verificationLevel !== 2 || communitySource.sourceUrl !== "https://www.spiritvale.info/cards") fail("Community Card source registration is missing or invalid.");
for (const field of ["name", "description", "category", "rarity", "effect", "notes"]) if (!communitySource.allowedFields.includes(field)) fail("Community Card source permission is missing " + field + ".");
if (!communityAdapter.includes("communityCardToManifest") || !communityAdapter.includes("reviewAndApproveCommunityManifests")) fail("Community Card import adapter is missing.");
if (schema.entity !== "SpiritValeCard" || !schema.fields || !schema.fields.sourceIds || schema.fields.sourceIds.minItems !== 1) {
  fail("Card schema is missing the required source-backed entity definition.");
}
for (const field of ["id", "slug", "name", "category", "rarity", "effect", "description", "sourceIds", "imageAssetId", "verifiedAt", "notes", "relatedGuideIds"]) {
  if (!schema.fields[field] || schema.fields[field].required !== true) fail("Card schema is missing required field " + field + ".");
}
if (!app.includes("CardDetailPage") || !app.includes("CardNotFoundPage") || !app.includes("database\\/cards")) fail("Card detail route template is missing.");
if (!content.includes("getCardBySlug") || !content.includes("isValidCard")) fail("Card source-validation read layer is missing.");
if (!search.includes("getCards") || !search.includes("/database/cards/")) fail("Card search integration is missing.");
if (!detail.includes("Overview") || !detail.includes("Effect") || !detail.includes("How To Obtain") || !detail.includes("Usage Context") || !detail.includes("Related Guides") || !detail.includes("DatabaseSources")) fail("Card detail template is missing a required section.");
if (!site.includes("applyCardMetadata") || !site.includes("cardStructuredData") || !site.includes("BreadcrumbList")) fail("Card metadata or Breadcrumb JSON-LD integration is missing.");
if (!templates.includes("CardEntityList") || !templates.includes("CardEntityBreadcrumb")) fail("Cards category list or breadcrumb template is missing.");
if (!generator.includes("validCards") || !prerender.includes("Verified card entity route files")) fail("Card sitemap or prerender integration is missing.");
if (!pipeline.includes("manifestToCardEntity") || !pipeline.includes("isEntityReady") || !pipeline.includes("writeApprovedCardEntities")) fail("Approved Card Entity pipeline integration is missing.");

const seenSlugs = new Set();
const seenNames = new Set();
const approvedManifestCandidates = new Set(manifests.filter((manifest) => manifest.status === "approved").map((manifest) => manifest.entityIdCandidate));
for (const card of cards) {
  for (const field of ["id", "slug", "name", "category", "rarity", "effect", "description", "sourceIds", "imageAssetId", "verifiedAt", "notes", "relatedGuideIds"]) {
    if (!(field in card)) fail("Card " + (card.id ?? "unknown") + " is missing " + field + ".");
  }
  if (seenSlugs.has(card.slug)) fail("Duplicate card slug: " + card.slug);
  seenSlugs.add(card.slug);
  if (seenNames.has(card.name.toLocaleLowerCase())) fail("Duplicate card name: " + card.name);
  seenNames.add(card.name.toLocaleLowerCase());
  if (!card.description) fail("Card " + card.id + " has an empty description.");
  if (!card.verifiedAt) fail("Card " + card.id + " is missing verification timestamp.");
  if (!Array.isArray(card.sourceIds) || !card.sourceIds.length) fail("Card " + card.id + " has no sourceIds.");
  for (const sourceId of card.sourceIds) if (!sourceIds.has(sourceId)) fail("Card " + card.id + " has invalid source " + sourceId + ".");
  for (const field of ["name", "category", "rarity", "effect", "description", "imageAssetId", "notes"]) {
    if (card[field] !== null && card[field] !== undefined && !card.sourceIds.some((sourceId) => checkFieldPermission(sourceId, field).allowed)) {
      fail("Card " + card.id + " populates unauthorized field " + field + ".");
    }
  }
  if (card.imageAssetId && !assetIds.has(card.imageAssetId)) fail("Card " + card.id + " has an invalid imageAssetId.");
  for (const guideId of card.relatedGuideIds) if (!guideIds.has(guideId)) fail("Card " + card.id + " has invalid related guide " + guideId + ".");
  if (!approvedManifestCandidates.has(card.id)) fail("Card " + card.id + " has no approved acquisition manifest.");
}

const validCards = cards.filter((card) => card.sourceIds.length && card.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const sitemap = readText("public/sitemap.xml");
const cardsHub = readText("dist-playground/database/cards/index.html");
if (!cardsHub.includes("SpiritVale Cards Database") || !cardsHub.includes("SpiritVale Card System Guide") || !cardsHub.includes("/guides/card-system-guide/")) fail("Cards Hub is missing its Card System Guide link or title.");
if (!cardsHub.includes(validCards.length + " currently verified card entries")) fail("Cards Hub verified count is not dynamically reflected in static HTML.");
for (const card of validCards) if (!sitemap.includes("https://playaig.com/database/cards/" + card.slug + "/")) fail("Sitemap is missing valid card " + card.id + ".");
if (validCards.length === 0 && /https:\/\/playaig\.com\/database\/cards\/[^<]+/.test(sitemap)) fail("Empty Cards collection must not add entity URLs to sitemap.");
for (const card of validCards) {
  const routePath = "dist-playground/database/cards/" + card.slug + "/index.html";
  if (!existsSync(resolve(root, routePath))) fail("Missing static Card route: " + card.slug);
  const html = readText(routePath);
  const canonical = "https://playaig.com/database/cards/" + card.slug + "/";
  if (card.name.match(/card\s+card/i) || cardTitle(card.name).match(/card\s+card|guide\s+guide/i)) fail("Card title normalization failed before rendering: " + card.id);
  if (!html.includes("<title>" + cardTitle(card.name) + "</title>")) fail("Card title is missing: " + card.id);
  if (!html.includes('rel="canonical" href="' + canonical + '"')) fail("Card canonical is missing: " + card.id);
  if (!html.includes('href="/database/cards/"')) fail("Card detail is missing Cards Database backlink: " + card.id);
  const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const types = new Set(structuredData.map((record) => record["@type"]));
  if (!types.has("Article") || !types.has("BreadcrumbList")) fail("Card JSON-LD is incomplete: " + card.id);
}

console.log("SpiritVale Cards Entity validation PASSED");
console.log("Card schema fields: " + Object.keys(schema.fields).length);
console.log("Cards collection records: " + cards.length);
console.log("Source-backed card records: " + validCards.length);
console.log("Empty collection produces no card entity sitemap URLs: " + (validCards.length === 0 ? "yes" : "n/a"));
