import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();

async function readJson(path) {
  return JSON.parse(await readFile(resolve(root, path), "utf8"));
}

async function readText(path) {
  return readFile(resolve(root, path), "utf8");
}

function fail(message) {
  throw new Error(message);
}

const [assets, classes, guides, sources, homePage, assetImage, site, app, indexHtml] = await Promise.all([
  readJson("data/assets/spiritvale-assets.json"),
  readJson("data/spiritvale/classes/classes.json"),
  readJson("data/spiritvale/guides/guides.json"),
  readJson("data/spiritvale/sources/sources.json"),
  readText("src/app/HomePage.tsx"),
  readText("src/data/AssetImage.tsx"),
  readText("src/app/site.ts"),
  readText("src/app/App.tsx"),
  readText("index.html")
]);

const assetIds = new Set(assets.map((asset) => asset.id));
const baseClasses = classes.filter((record) => record.classType === "base");

if (baseClasses.length !== 7) {
  fail("Expected 7 base classes from SV-04 data; found " + baseClasses.length + ".");
}
if (guides.length !== 12) {
  fail("Expected 12 published guides after Tier 1 expansion; found " + guides.length + ".");
}
if (sources.length < 1 || !sources.some((source) => source.id === "source-official-steam-store" && source.url)) {
  fail("Expected a usable official Steam source from SV-04 data.");
}

const assetIdMatches = [...homePage.matchAll(/imageAssetId(?:=|:)\s*\{?["']([^"']+)["']/g)].map((match) => match[1]);
const guideAssetIds = guides.flatMap((guide) => guide.imageAssetIds);
const allHomepageAssetIds = new Set([...assetIdMatches, ...guideAssetIds, "sv-brand-icon"]);
const missingAssetIds = [...allHomepageAssetIds].filter((id) => !assetIds.has(id));

if (missingAssetIds.length) {
  fail("Unresolvable homepage asset IDs: " + missingAssetIds.join(", ") + ".");
}
if (!assetImage.includes("resolveSpiritValeAsset(imageAssetId)") || !assetImage.includes("Official image unavailable")) {
  fail("AssetImage must use the resolver and a safe missing-asset fallback.");
}
if (assetImage.includes('src="/images/') || assetImage.includes("src='/images/")) {
  fail("Found a direct image path in AssetImage.");
}

const h1Count = (homePage.match(/<h1/g) ?? []).length;
if (h1Count !== 0 || !homePage.includes('title="SpiritVale Wiki, Guides and Game Database"')) {
  fail("Homepage must delegate exactly one required H1 to HeroBanner.");
}
if (!site.includes('"@type": "WebSite"') || !site.includes("homepageMetadata")) {
  fail("Homepage WebSite JSON-LD or metadata is missing.");
}
if (!indexHtml.includes("PlayAIG — Verified Game Wikis, Guides and Databases")) {
  fail("Homepage title metadata is missing.");
}
if (!app.includes('pathname === "/" ? <HomePage /> : <NotFoundPage') || !app.includes("NotFoundPage")) {
  fail("Homepage safe Not Found route handling is missing.");
}
if (!homePage.includes("href={guide.seo.canonicalPath}") || !homePage.includes('href={"/classes/" + gameClass.slug + "/"}') || !homePage.includes("href={category.path}")) {
  fail("Guide, class, and database cards must use their configured safe target paths.");
}
if (!homePage.includes('eyebrow="PlayAIG"') || !homePage.includes('gameName="SpiritVale"') || !homePage.includes('Verified Game Wiki') || !homePage.includes('Explore Guides') || !homePage.includes('Browse Classes')) {
  fail("Homepage Hero identity, verification status, or required calls to action are missing.");
}
if (!homePage.includes('placeholder="Search guides, classes, bosses and game data..."')) {
  fail("Homepage Quick Search placeholder must use the approved copy.");
}
for (const trustSignal of ["Official Sources", "Verified Information", "No Unverified Data"]) {
  if (!homePage.includes(trustSignal)) fail("Homepage trust signal is missing: " + trustSignal + ".");
}
for (const requiredSection of ['id="guides"', 'id="classes"', 'id="database"', 'id="explore"', 'id="updates"']) {
  if (!homePage.includes(requiredSection)) fail("Homepage section is missing: " + requiredSection + ".");
}
const orderedSections = ['id="guides"', 'id="classes"', 'id="database"', 'id="explore"', 'id="updates"'];
if (orderedSections.some((section, index) => index > 0 && homePage.indexOf(section) < homePage.indexOf(orderedSections[index - 1]))) {
  fail("Homepage content sections are not in the required visual order.");
}
if (!homePage.includes("guides.map((guide, index)") || !homePage.includes("guideCategories.find")) {
  fail("Homepage guide cards must be rendered from SV-04 guide and category data.");
}
if (!homePage.includes("classes.map((gameClass)") || !homePage.includes("databaseCategories.map((category)")) {
  fail("Homepage class and database cards must be rendered from existing data sources.");
}

const forbiddenClaims = ["438 equipment", "230 monsters", "20 bosses", "0+ items", "player count", "download count"];
const combinedHomeSource = homePage + site + app;
const foundForbiddenClaims = forbiddenClaims.filter((claim) => combinedHomeSource.toLowerCase().includes(claim));
if (foundForbiddenClaims.length) {
  fail("Forbidden unsupported claims found: " + foundForbiddenClaims.join(", ") + ".");
}

console.log("SpiritVale homepage validation PASSED");
console.log("Base classes from SV-04: " + baseClasses.length);
console.log("Guides from SV-04: " + guides.length);
console.log("Sources from SV-04: " + sources.length);
console.log("Resolved homepage asset IDs: " + allHomepageAssetIds.size);
console.log("Missing homepage asset IDs: 0");
console.log("Homepage H1 count: 1 (HeroBanner)");
console.log("Hero, Quick Search, trust signals, and visual section order: present");
console.log("Metadata and WebSite JSON-LD: present");
