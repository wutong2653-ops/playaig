import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const siteUrl = "https://playaig.com";
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const readText = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => { throw new Error(message); };

const classes = readJson("data/spiritvale/classes/classes.json");
const guides = readJson("data/spiritvale/guides/guides.json");
const sources = readJson("data/spiritvale/sources/sources.json");
const assets = readJson("data/assets/spiritvale-assets.json");
const app = readText("src/app/App.tsx");
const indexPage = readText("src/app/ClassesIndexPage.tsx");
const detailPage = readText("src/app/ClassDetailPage.tsx");
const classComponents = readText("src/components/classes/index.tsx");
const content = readText("src/data/content.ts");
const site = readText("src/app/site.ts");
const classVisualAssetId = "sv-guide-classes-selection-banner";
const landingClassTitles = {
  knight: "SpiritVale Knight Class Guide 2026: Build Guide | PlayAIG"
};
const assetIds = new Set(assets.map((asset) => asset.id));
const sourceIds = new Set(sources.map((source) => source.id));
const guideIds = new Set(guides.map((guide) => guide.id));

if (classes.length !== 7) fail("Expected exactly 7 formal base classes; found " + classes.length + ".");
if (!app.includes('pathname === "/classes/"') || !app.includes("ClassDetailPage") || !app.includes("ClassNotFoundPage")) {
  fail("Classes index, shared detail route, or Class Not Found route is missing.");
}
if (!indexPage.includes("getClasses()") || !indexPage.includes("ClassCard") || !indexPage.includes("ClassVerificationNotice")) {
  fail("Classes index must read formal class data and render the Class Grid and verification notice.");
}
if (!detailPage.includes("<ClassLayout") || !detailPage.includes("<ClassOverview") || !detailPage.includes("<ClassConfirmedInformation") || !detailPage.includes("<ClassUnverifiedInformation") || !detailPage.includes("<ClassVerificationStatus") || !detailPage.includes("<ClassSources") || !detailPage.includes("<RelatedGuides")) {
  fail("Shared Class template does not include all required Class sections.");
}
if (!classComponents.includes("This information has not yet been confirmed by official SpiritVale sources.")) {
  fail("Class template is missing the required unverified-information statement.");
}
if (!content.includes('classVisualAssetId = "' + classVisualAssetId + '"') || !assetIds.has(classVisualAssetId)) {
  fail("The shared official class visual asset is missing or invalid.");
}
if (!site.includes('"@type": "Article"') || !site.includes('"@type": "BreadcrumbList"') || !site.includes("classStructuredData")) {
  fail("Class Article or BreadcrumbList JSON-LD is missing.");
}
const classStructuredDataSource = site.slice(site.indexOf("export function classStructuredData"), site.indexOf("export function applyClassMetadata"));
if (!classStructuredDataSource.includes("FAQPage")) fail("Class FAQPage support is missing.");

const slugs = new Set();
const canonicalPaths = new Set();
const titles = new Set();
const forbiddenFields = ["roleIds", "weaponTypeIds", "primaryStatIds", "secondaryStatIds", "skillIds", "advancedClassIds", "recommendedBuildIds", "strengths", "weaknesses"];
let relatedGuideReferences = 0;
for (const gameClass of classes) {
  if (gameClass.classType !== "base") fail(gameClass.id + " is not a base class.");
  if (slugs.has(gameClass.slug)) fail("Duplicate class slug: " + gameClass.slug);
  slugs.add(gameClass.slug);
  const canonicalPath = "/classes/" + gameClass.slug + "/";
  if (canonicalPaths.has(canonicalPath)) fail("Duplicate class canonical path: " + canonicalPath);
  canonicalPaths.add(canonicalPath);
  const title = landingClassTitles[gameClass.slug] || "SpiritVale " + gameClass.name + " Class Guide 2026: Build Guide | PlayAIG";
  if (titles.has(title)) fail("Duplicate class SEO title: " + title);
  titles.add(title);
  if (!Array.isArray(gameClass.sourceIds) || gameClass.sourceIds.length === 0) fail(gameClass.id + " has no sourceIds.");
  for (const sourceId of gameClass.sourceIds) if (!sourceIds.has(sourceId)) fail(gameClass.id + " has invalid sourceId " + sourceId);
  if (gameClass.imageAssetIds.length !== 0) fail(gameClass.id + " must not claim an individual class imageAssetId.");
  for (const field of forbiddenFields) if (!Array.isArray(gameClass[field]) || gameClass[field].length !== 0) fail(gameClass.id + " has unsupported " + field + " data.");
  if (gameClass.shortDescription !== null || gameClass.description !== null || gameClass.playstyle !== null || gameClass.difficulty !== null) {
    fail(gameClass.id + " has an unsupported individual class claim.");
  }
  const relatedGuides = guides.filter((guide) => guide.relatedClassIds.includes(gameClass.id));
  const relatedIds = new Set(relatedGuides.map((guide) => guide.id));
  if (!relatedIds.has("guide-beginner") || !relatedIds.has("guide-classes")) fail(gameClass.id + " is missing required formal related guides.");
  for (const guide of relatedGuides) {
    if (!guideIds.has(guide.id)) fail(gameClass.id + " has invalid related guide " + guide.id);
    relatedGuideReferences += 1;
  }
}

for (const guide of guides) {
  for (const classId of guide.relatedClassIds) {
    if (!classes.some((gameClass) => gameClass.id === classId)) fail(guide.id + " has invalid relatedClassId " + classId);
  }
}

const directPathFiles = ["src/app/ClassesIndexPage.tsx", "src/app/ClassDetailPage.tsx", "src/components/classes/index.tsx"];
for (const file of directPathFiles) {
  const source = readText(file);
  if (source.includes('src="/images/') || source.includes("src='/images/") || /https?:\/\/[^\"]+\.(?:png|jpe?g|webp|gif)/i.test(source)) {
    fail(file + " contains a direct or external image path.");
  }
  if (["Acolyte", "Mage", "Summoner", "Knight", "Warrior", "Scout", "Rogue"].some((name) => source.includes(name))) {
    fail(file + " hardcodes a class name instead of reading formal data.");
  }
}

const expectedStaticRoutes = ["/classes/", ...classes.map((gameClass) => "/classes/" + gameClass.slug + "/")];
const missingStaticRoutes = expectedStaticRoutes.filter((route) => !existsSync(resolve(root, "dist-playground", route.replace(/^\//, ""), "index.html")));
if (missingStaticRoutes.length) fail("Missing static class metadata output: " + missingStaticRoutes.join(", ") + ".");
for (const gameClass of classes) {
  const canonicalPath = "/classes/" + gameClass.slug + "/";
  const title = landingClassTitles[gameClass.slug] || "SpiritVale " + gameClass.name + " Class Guide 2026: Build Guide | PlayAIG";
  const routeHtml = readText("dist-playground" + canonicalPath + "index.html");
  if (!routeHtml.includes("<title>" + title + "</title>")) fail(gameClass.id + " static title is missing.");
  if (!routeHtml.includes('rel="canonical" href="' + siteUrl + canonicalPath + '"')) fail(gameClass.id + " static canonical is missing.");
  if ((routeHtml.match(/meta name="description"/g) ?? []).length !== 1) fail(gameClass.id + " static metadata has an invalid description count.");
  const jsonLdRecords = [...routeHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const types = new Set(jsonLdRecords.map((record) => record["@type"]));
  if (!types.has("Article") || !types.has("BreadcrumbList") || !types.has("FAQPage")) fail(gameClass.id + " static JSON-LD is incomplete.");
}

console.log("SpiritVale class validation PASSED");
console.log("Formal base classes: " + classes.length);
console.log("Unique class slugs: " + slugs.size);
console.log("Class canonical paths: " + canonicalPaths.size);
console.log("Shared class visual asset: " + classVisualAssetId);
console.log("Related guide references: " + relatedGuideReferences);
console.log("Missing class image references: 0 (individual portraits intentionally not claimed)");
console.log("Shared Class template, Article/Breadcrumb JSON-LD, sources, related guides, and Not Found: present");
