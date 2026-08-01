import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const siteUrl = "https://playaig.com";
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const readText = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => { throw new Error(message); };

const categoryDefinitions = [
  { id: "skills", label: "Skills", collection: "data/spiritvale/skills/skills.json", imageAssetId: "sv-guide-classes-selection-banner", relatedGuideId: "guide-classes" },
  { id: "equipment", label: "Equipment", collection: "data/spiritvale/equipment/equipment.json", imageAssetId: "sv-guide-stats-crafting-banner", relatedGuideId: "guide-beginner" },
  { id: "cards", label: "Cards", collection: "data/spiritvale/cards/cards.json", imageAssetId: "sv-guide-cards-build-banner", relatedGuideId: "guide-cards" },
  { id: "artifacts", label: "Artifacts", collection: "data/spiritvale/artifacts/artifacts.json", imageAssetId: "sv-guide-cards-build-banner", relatedGuideId: "guide-cards" },
  { id: "monsters", label: "Monsters", collection: "data/spiritvale/monsters/monsters.json", imageAssetId: "sv-guide-beginner-combat-banner", relatedGuideId: "guide-leveling" },
  { id: "bosses", label: "Bosses", collection: "data/spiritvale/bosses/bosses.json", imageAssetId: "sv-boss-lava-arena-01", relatedGuideId: "guide-beginner" },
  { id: "maps", label: "Maps", collection: "data/spiritvale/maps/maps.json", imageAssetId: "sv-map-ice-cavern-01", relatedGuideId: "guide-beginner" }
];
const assets = readJson("data/assets/spiritvale-assets.json");
const guides = readJson("data/spiritvale/guides/guides.json");
const sources = readJson("data/spiritvale/sources/sources.json");
const app = readText("src/app/App.tsx");
const indexPage = readText("src/app/DatabaseIndexPage.tsx");
const categoryPage = readText("src/app/DatabaseCategoryPage.tsx");
const databaseComponents = readText("src/components/database/templates.tsx");
const content = readText("src/data/content.ts");
const site = readText("src/app/site.ts");
const assetIds = new Set(assets.map((asset) => asset.id));
const sourceIds = new Set(sources.map((source) => source.id));
const guideIds = new Set(guides.map((guide) => guide.id));

if (categoryDefinitions.length !== 7) fail("Expected 7 database categories.");
if (!app.includes('pathname === "/database/"') || !app.includes("DatabaseCategoryPage") || !app.includes("DatabaseNotFoundPage")) {
  fail("Database index, shared category route, or Database Not Found route is missing.");
}
if (!indexPage.includes("getDatabaseCategories()") || !indexPage.includes("DatabaseCard") || !indexPage.includes("DatabaseVerificationBadge")) {
  fail("Database index must read formal categories and render Database Cards and verification status.");
}
if (!categoryPage.includes("<DatabaseLayout") || !categoryPage.includes("<DatabaseCurrentStatus") || !categoryPage.includes("<DatabaseEmptyEntries") || !categoryPage.includes("<RelatedGuides") || !categoryPage.includes("<DatabaseSources")) {
  fail("Shared database template does not include all required sections.");
}
if (!databaseComponents.includes("Data Collection In Progress") || !databaseComponents.includes("Browse Guides") || !databaseComponents.includes("This image is a general official visual rather than a verified database entry.")) {
  fail("Database Empty State, Browse Guides CTA, or general-visual disclosure is missing.");
}
if (!content.includes("getDatabaseEntries") || !content.includes("getGuidesRelatedToDatabaseCategory")) {
  fail("Database data read layer is missing.");
}
if (!site.includes("databaseCategoryStructuredData") || !site.includes('"@type": "CollectionPage"') || !site.includes("databaseBreadcrumbJsonLd")) {
  fail("Database CollectionPage or BreadcrumbList metadata is missing.");
}
const databaseStructuredDataSource = site.slice(site.indexOf("export function databaseCategoryStructuredData"), site.indexOf("export function applyDatabaseCategoryMetadata"));
if (databaseStructuredDataSource.includes('"@type": "Article"') || databaseStructuredDataSource.includes("FAQPage")) {
  fail("Database category JSON-LD must not include Article or FAQPage.");
}

const categoryIds = new Set();
const canonicalPaths = new Set();
const titles = new Set();
let relatedGuideReferences = 0;
for (const category of categoryDefinitions) {
  if (categoryIds.has(category.id)) fail("Duplicate database category slug: " + category.id);
  categoryIds.add(category.id);
  const canonicalPath = "/database/" + category.id + "/";
  if (canonicalPaths.has(canonicalPath)) fail("Duplicate database canonical path: " + canonicalPath);
  canonicalPaths.add(canonicalPath);
  const title = "SpiritVale " + category.label + " Database — Verified Game Data";
  if (titles.has(title)) fail("Duplicate database SEO title: " + title);
  titles.add(title);
  if (!assetIds.has(category.imageAssetId)) fail(category.id + " has invalid general imageAssetId.");
  const records = readJson(category.collection);
  if (!Array.isArray(records) || records.length !== 0) fail(category.id + " must use the existing empty formal collection without fabricated entries.");
  const relatedGuides = guides.filter((guide) => guide.relatedDatabaseCategoryIds.includes(category.id));
  if (!relatedGuides.some((guide) => guide.id === category.relatedGuideId)) fail(category.id + " is missing its required formal related guide.");
  for (const guide of relatedGuides) {
    if (!guideIds.has(guide.id)) fail(category.id + " has invalid related guide " + guide.id);
    relatedGuideReferences += 1;
  }
}

for (const guide of guides) {
  for (const categoryId of guide.relatedDatabaseCategoryIds) if (!categoryIds.has(categoryId)) fail(guide.id + " has invalid relatedDatabaseCategoryId " + categoryId);
}
if (!sourceIds.has("source-official-steam-store")) fail("Registered official Steam source is missing.");

const directPathFiles = ["src/app/DatabaseIndexPage.tsx", "src/app/DatabaseCategoryPage.tsx", "src/components/database/templates.tsx"];
for (const file of directPathFiles) {
  const source = readText(file);
  if (source.includes('src="/images/') || source.includes("src='/images/") || /https?:\/\/[^\"]+\.(?:png|jpe?g|webp|gif)/i.test(source)) {
    fail(file + " contains a direct or external image path.");
  }
}

const forbiddenDatabaseClaims = ["boss hp", "boss drops", "boss skills", "card effect", "skill damage", "equipment stat", "monster drop", "map coordinates"];
const databasePageText = [indexPage, categoryPage, databaseComponents].join(" ").toLowerCase();
const foundForbiddenDatabaseClaims = forbiddenDatabaseClaims.filter((claim) => databasePageText.includes(claim));
if (foundForbiddenDatabaseClaims.length) fail("Forbidden fabricated database claims: " + foundForbiddenDatabaseClaims.join(", ") + ".");

const expectedStaticRoutes = ["/database/", ...categoryDefinitions.map((category) => "/database/" + category.id + "/")];
const missingStaticRoutes = expectedStaticRoutes.filter((route) => !existsSync(resolve(root, "dist-playground", route.replace(/^\//, ""), "index.html")));
if (missingStaticRoutes.length) fail("Missing static database metadata output: " + missingStaticRoutes.join(", ") + ".");
for (const category of categoryDefinitions) {
  const canonicalPath = "/database/" + category.id + "/";
  const title = "SpiritVale " + category.label + " Database — Verified Game Data";
  const routeHtml = readText("dist-playground" + canonicalPath + "index.html");
  if (!routeHtml.includes("<title>" + title + "</title>")) fail(category.id + " static title is missing.");
  if (!routeHtml.includes('rel="canonical" href="' + siteUrl + canonicalPath + '"')) fail(category.id + " static canonical is missing.");
  if ((routeHtml.match(/meta name="description"/g) ?? []).length !== 1) fail(category.id + " static metadata has an invalid description count.");
  const jsonLdRecords = [...routeHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const types = new Set(jsonLdRecords.map((record) => record["@type"]));
  if (!types.has("CollectionPage") || !types.has("BreadcrumbList") || types.has("Article") || types.has("FAQPage")) {
    fail(category.id + " static JSON-LD is incomplete or contains disallowed types.");
  }
}

console.log("SpiritVale database validation PASSED");
console.log("Database categories: " + categoryIds.size);
console.log("Database canonical paths: " + canonicalPaths.size);
console.log("Verified database entries: 0 (all formal collections intentionally empty)");
console.log("Related guide references: " + relatedGuideReferences);
console.log("General database image assets: " + new Set(categoryDefinitions.map((category) => category.imageAssetId)).size);
console.log("Shared Database template, CollectionPage/Breadcrumb JSON-LD, Empty State, sources, related guides, and Not Found: present");
