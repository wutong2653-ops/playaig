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
const acquisitionManifests = readJson("data/spiritvale/acquisition/manifests.json");
const equipmentManifests = readJson("data/spiritvale/acquisition/equipment-pilot-manifests.json");
const monsterManifests = [
  ...readJson("data/spiritvale/acquisition/monster-pilot-manifests.json"),
  ...readJson("data/spiritvale/acquisition/monster-expansion-manifests.json")
];
const skillManifests = [
  ...readJson("data/spiritvale/acquisition/skill-pilot-manifests.json"),
  ...readJson("data/spiritvale/acquisition/skill-secondary-pilot-manifests.json")
];
const app = readText("src/app/App.tsx");
const indexPage = readText("src/app/DatabaseIndexPage.tsx");
const categoryPage = readText("src/app/DatabaseCategoryPage.tsx");
const databaseComponents = readText("src/components/database/templates.tsx");
const content = readText("src/data/content.ts");
const site = readText("src/app/site.ts");
const assetIds = new Set(assets.map((asset) => asset.id));
const sourceIds = new Set(sources.map((source) => source.id));
const guideIds = new Set(guides.map((guide) => guide.id));
const landingCategoryTitles = {
  cards: "SpiritVale Cards Database: Complete List | PlayAIG",
  equipment: "SpiritVale Equipment Database: Complete List | PlayAIG",
  artifacts: "SpiritVale Artifacts Database: Complete List | PlayAIG",
  bosses: "SpiritVale Bosses Database: Complete List | PlayAIG",
  maps: "SpiritVale Maps Database: Complete Map List | PlayAIG",
  monsters: "SpiritVale Monsters Database: Complete List | PlayAIG",
  skills: "SpiritVale Skills Database: Complete List | PlayAIG"
};

if (categoryDefinitions.length !== 7) fail("Expected 7 database categories.");
if (!app.includes('pathname === "/database/"') || !app.includes("DatabaseCategoryPage") || !app.includes("DatabaseNotFoundPage")) {
  fail("Database index, shared category route, or Database Not Found route is missing.");
}
if (!indexPage.includes("getDatabaseCategories()") || !indexPage.includes("DatabaseCard") || !indexPage.includes("DatabaseVerificationBadge")) {
  fail("Database index must read formal categories and render Database Cards and verification status.");
}
for (const marker of ["How to use the SpiritVale Database", "What the database contains", "Update frequency", "database-index__table", "databaseIndexFaqItems"]) {
  if (!indexPage.includes(marker)) fail("Database index SEO content marker is missing: " + marker + ".");
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
if (databaseStructuredDataSource.includes('"@type": "Article"')) {
  fail("Database category JSON-LD must not include Article.");
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
  const title = landingCategoryTitles[category.id] || "SpiritVale " + category.label + " Database: Complete List | PlayAIG";
  if (titles.has(title)) fail("Duplicate database SEO title: " + title);
  titles.add(title);
  if (!assetIds.has(category.imageAssetId)) fail(category.id + " has invalid general imageAssetId.");
  const records = readJson(category.collection);
  if (!Array.isArray(records)) fail(category.id + " collection must be an array.");
  if (!["cards", "equipment", "monsters", "skills"].includes(category.id) && records.length !== 0) fail(category.id + " must remain empty without source-backed entity ingestion.");
  if (category.id === "cards") {
    const approvedCandidates = new Set(acquisitionManifests.filter((manifest) => manifest.status === "approved" && manifest.entityType === "card").map((manifest) => manifest.entityIdCandidate));
    for (const card of records) {
      if (!card.id || !card.slug || !card.name || !Array.isArray(card.sourceIds) || !card.sourceIds.length) fail("Cards collection contains an invalid source-backed record.");
      if (!card.sourceIds.every((sourceId) => sourceIds.has(sourceId))) fail("Cards collection contains an unknown source.");
      if (!approvedCandidates.has(card.id)) fail("Cards collection record lacks an approved Card Manifest: " + card.id);
    }
  }
  if (category.id === "equipment") {
    const approvedCandidates = new Set(equipmentManifests.filter((manifest) => manifest.status === "approved" && manifest.entityType === "equipment").map((manifest) => manifest.entityIdCandidate));
    for (const item of records) {
      if (!item.id || !item.slug || !item.name || !Array.isArray(item.sourceIds) || !item.sourceIds.length) fail("Equipment collection contains an invalid source-backed record.");
      if (!item.sourceIds.every((sourceId) => sourceIds.has(sourceId))) fail("Equipment collection contains an unknown source.");
      if (!approvedCandidates.has(item.id)) fail("Equipment collection record lacks an approved Equipment Manifest: " + item.id);
      if (item.verificationStatus !== "partially-verified") fail("Equipment pilot records must remain partially-verified.");
    }
  }
  if (category.id === "monsters") {
    const approvedCandidates = new Set(monsterManifests.filter((manifest) => manifest.status === "approved" && manifest.entityType === "monster").map((manifest) => manifest.entityIdCandidate));
    for (const monster of records) {
      if (!monster.id || !monster.slug || !monster.name || !Array.isArray(monster.sourceIds) || !monster.sourceIds.length) fail("Monsters collection contains an invalid source-backed record.");
      if (!monster.sourceIds.every((sourceId) => sourceIds.has(sourceId))) fail("Monsters collection contains an unknown source.");
      if (!approvedCandidates.has(monster.id)) fail("Monsters collection record lacks an approved Monster Manifest: " + monster.id);
      if (monster.verificationStatus !== "partially-verified") fail("Monster pilot records must remain partially-verified.");
      if (!Number.isInteger(monster.level) || !monster.location?.length || !monster.drop?.length) fail("Monster pilot records must include evidenced level, location and drop fields.");
      if (monster.stats.length || monster.abilities.length || monster.weaknessIds.length || monster.elementIds.length) fail("Monster pilot records must not publish unsupported combat fields.");
    }
  }
  if (category.id === "skills") {
    const approvedCandidates = new Set(skillManifests.filter((manifest) => manifest.status === "approved" && manifest.entityType === "skill").map((manifest) => manifest.entityIdCandidate));
    const classesForSkill = readJson("data/spiritvale/classes/classes.json");
    for (const skill of records) {
      if (!skill.id || !skill.slug || !skill.name || !Array.isArray(skill.sourceIds) || !skill.sourceIds.length) fail("Skills collection contains an invalid source-backed record.");
      if (!skill.sourceIds.every((sourceId) => sourceIds.has(sourceId))) fail("Skills collection contains an unknown source.");
      if (!approvedCandidates.has(skill.id)) fail("Skills collection record lacks an approved Skill Manifest: " + skill.id);
      if (skill.status !== "published" || skill.verificationStatus !== "partially-verified") fail("Skill pilot records must be published and partially-verified.");
      if (skill.classIds.some((classId) => !classesForSkill.some((gameClass) => gameClass.id === classId))) fail("Skill record contains an invalid class relation: " + skill.id);
      if (skill.scaling.length || skill.prerequisiteSkillIds.length || skill.nextSkillIds.length) fail("Skill pilot records must not publish unsupported scaling or skill-chain fields.");
    }
  }
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
const indexHtml = readText("dist-playground/database/index.html");
const indexTitle = "SpiritVale Database — Verified Game Data | PlayAIG";
if (!indexHtml.includes("<title>" + indexTitle + "</title>")) fail("Database index static title is missing.");
if (!indexHtml.includes('rel="canonical" href="' + siteUrl + "/database/" + '"')) fail("Database index static canonical is missing.");
const indexJsonLdRecords = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
const indexJsonLdTypes = new Set(indexJsonLdRecords.map((record) => record["@type"]));
if (!indexJsonLdTypes.has("CollectionPage") || !indexJsonLdTypes.has("WebPage") || !indexJsonLdTypes.has("BreadcrumbList") || !indexJsonLdTypes.has("FAQPage")) {
  fail("Database index JSON-LD must include CollectionPage, WebPage, BreadcrumbList and FAQPage.");
}
if (indexHtml.includes("localhost") || indexHtml.includes("example.com")) fail("Database index static metadata contains a placeholder URL.");
for (const category of categoryDefinitions) {
  const canonicalPath = "/database/" + category.id + "/";
  const title = landingCategoryTitles[category.id] || "SpiritVale " + category.label + " Database — Verified Game Data";
  const routeHtml = readText("dist-playground" + canonicalPath + "index.html");
  if (!routeHtml.includes("<title>" + title.replaceAll("&", "&amp;") + "</title>")) fail(category.id + " static title is missing.");
  if (!routeHtml.includes('rel="canonical" href="' + siteUrl + canonicalPath + '"')) fail(category.id + " static canonical is missing.");
  if ((routeHtml.match(/meta name="description"/g) ?? []).length !== 1) fail(category.id + " static metadata has an invalid description count.");
  const jsonLdRecords = [...routeHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const types = new Set(jsonLdRecords.map((record) => record["@type"]));
  if (!types.has("CollectionPage") || !types.has("BreadcrumbList") || types.has("Article") || !types.has("FAQPage")) {
    fail(category.id + " static JSON-LD is incomplete or contains disallowed types.");
  }
}

console.log("SpiritVale database validation PASSED");
console.log("Database categories: " + categoryIds.size);
console.log("Database canonical paths: " + canonicalPaths.size);
const verifiedDatabaseEntries = readJson("data/spiritvale/cards/cards.json").length;
const equipmentEntries = readJson("data/spiritvale/equipment/equipment.json").length;
const monsterEntries = readJson("data/spiritvale/monsters/monsters.json").length;
console.log("Verified database entries: " + verifiedDatabaseEntries + " Cards; partially-verified Equipment entries: " + equipmentEntries + "; partially-verified Monster entries: " + monsterEntries + "; other formal collections remain empty");
console.log("Related guide references: " + relatedGuideReferences);
console.log("General database image assets: " + new Set(categoryDefinitions.map((category) => category.imageAssetId)).size);
console.log("Shared Database template, CollectionPage/Breadcrumb JSON-LD, Empty State, sources, related guides, and Not Found: present");
