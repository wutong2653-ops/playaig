import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const siteUrl = "https://playaig.com";
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const readText = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  throw new Error(message);
};

const guides = readJson("data/spiritvale/guides/guides.json");
const assets = readJson("data/assets/spiritvale-assets.json");
const sources = readJson("data/spiritvale/sources/sources.json");
const app = readText("src/app/App.tsx");
const detailTemplate = readText("src/app/GuideDetailPage.tsx");
const indexPage = readText("src/app/GuidesIndexPage.tsx");
const guideComponents = readText("src/components/guides/index.tsx");
const site = readText("src/app/site.ts");
const assetIds = new Set(assets.map((asset) => asset.id));
const sourceIds = new Set(sources.map((source) => source.id));
const guideIds = new Set(guides.map((guide) => guide.id));
const landingGuideTitles = {
  "beginner-guide": "SpiritVale Beginner Guide 2026: Starter Guide | PlayAIG",
  "class-guide": "SpiritVale Class Guide 2026: Base Classes | PlayAIG",
  "card-system-guide": "SpiritVale Card System Guide 2026: Complete Tips | PlayAIG",
  "leveling-guide": "SpiritVale Leveling Guide 2026: Complete Tips | PlayAIG",
  "stats-guide": "SpiritVale Stats Guide 2026: Complete Review | PlayAIG",
  "first-steps": "SpiritVale First Steps Guide 2026 | PlayAIG",
  "early-game-strategy": "SpiritVale Early Game Strategy Guide 2026 | PlayAIG",
  "common-beginner-mistakes": "SpiritVale Beginner Mistakes To Avoid | PlayAIG",
  "class-comparison": "SpiritVale Class Comparison Guide 2026 | PlayAIG",
  "best-classes-for-beginners": "Best SpiritVale Classes For Beginners 2026 | PlayAIG",
  "cards/card-effects": "SpiritVale Card Effects Guide 2026 | PlayAIG",
  "equipment/upgrade-system": "SpiritVale Equipment Upgrade Guide 2026 | PlayAIG"
};

if (guides.length !== 12) fail("Expected 12 published guides after Tier 1 expansion; found " + guides.length + ".");
if (!app.includes('pathname === "/guides/"') || !app.includes("GuideDetailPage") || !app.includes("GuideNotFoundPage")) {
  fail("Guides index, shared detail route, or Guide Not Found route is missing.");
}
if (!detailTemplate.includes("<GuideLayout") || !detailTemplate.includes("<GuideTableOfContents") || !detailTemplate.includes("<GuideSources") || !detailTemplate.includes("<GuideFaq") || !detailTemplate.includes("<RelatedGuides")) {
  fail("Shared guide template does not include all required Guide components.");
}
if (!indexPage.includes("getGuides()") || !indexPage.includes("getGuideCategories()")) {
  fail("Guides index must read the formal Guide data and taxonomy.");
}
if (!guideComponents.includes('aria-label="Guide table of contents"') || !guideComponents.includes("aria-expanded") || !guideComponents.includes("Sources and References")) {
  fail("TOC, accessible expansion, or Sources rendering is missing.");
}
if (!site.includes('"@type": "Article"') || !site.includes('"@type": "BreadcrumbList"') || !site.includes('"@type": "FAQPage"')) {
  fail("Guide structured-data types are missing.");
}

const canonicalPaths = new Set();
const titles = new Set();
const descriptions = new Set();
let imageCount = 0;
for (const guide of guides) {
  if (canonicalPaths.has(guide.seo.canonicalPath)) fail("Duplicate guide canonical path: " + guide.seo.canonicalPath);
  canonicalPaths.add(guide.seo.canonicalPath);
  if (titles.has(guide.seo.title)) fail("Duplicate guide SEO title: " + guide.seo.title);
  titles.add(guide.seo.title);
  if (descriptions.has(guide.seo.description)) fail("Duplicate guide SEO description: " + guide.seo.description);
  descriptions.add(guide.seo.description);
  if (guide.sections.length < 4) fail(guide.id + " has fewer than four sections.");
  if (guide.imageAssetIds.length < 2) fail(guide.id + " has fewer than two images.");
  if (!guide.faqItems.length) fail(guide.id + " has no FAQ items.");
  if (!guide.relatedGuideIds.length) fail(guide.id + " has no related guides.");
  if (guide.relatedGuideIds.includes(guide.id)) fail(guide.id + " relates to itself.");
  for (const relatedId of guide.relatedGuideIds) if (!guideIds.has(relatedId)) fail(guide.id + " has invalid related guide " + relatedId);
  for (const sourceId of guide.sourceIds) if (!sourceIds.has(sourceId)) fail(guide.id + " has invalid source " + sourceId);
  for (const section of guide.sections) {
    if (!section.sourceIds.length) fail(guide.id + " has a section without sources.");
    for (const sourceId of section.sourceIds) if (!sourceIds.has(sourceId)) fail(guide.id + " has invalid section source " + sourceId);
    for (const block of section.contentBlocks) {
      if (block.imageAssetId) {
        imageCount += 1;
        if (!assetIds.has(block.imageAssetId)) fail(guide.id + " has unresolvable content image " + block.imageAssetId);
      }
      for (const sourceId of block.sourceIds) if (!sourceIds.has(sourceId)) fail(guide.id + " has invalid content source " + sourceId);
    }
  }
  for (const imageAssetId of guide.imageAssetIds) {
    imageCount += 1;
    if (!assetIds.has(imageAssetId)) fail(guide.id + " has unresolvable guide image " + imageAssetId);
  }
  for (const faq of guide.faqItems) {
    if (!faq.sourceIds.length) fail(guide.id + " has a FAQ without sources.");
    for (const sourceId of faq.sourceIds) if (!sourceIds.has(sourceId)) fail(guide.id + " has invalid FAQ source " + sourceId);
  }
}

const directPathFiles = [
  "src/app/GuidesIndexPage.tsx",
  "src/app/GuideDetailPage.tsx",
  "src/components/guides/index.tsx"
];
for (const file of directPathFiles) {
  const source = readText(file);
  if (source.includes('src="/images/') || source.includes("src='/images/") || /https?:\/\/[^"]+\.(?:png|jpe?g|webp|gif)/i.test(source)) {
    fail(file + " contains a direct or external image path.");
  }
}

const forbiddenClaims = ["best leveling route", "experience formula", "strength build", "dex build", "card tier list", "placeholder guide"];
const guideText = JSON.stringify(guides).toLowerCase();
const foundForbiddenClaims = forbiddenClaims.filter((claim) => guideText.includes(claim));
if (foundForbiddenClaims.length) fail("Forbidden unsupported guide claims: " + foundForbiddenClaims.join(", ") + ".");

const expectedStaticRoutes = ["/guides/", ...guides.map((guide) => guide.seo.canonicalPath)];
const missingStaticRoutes = expectedStaticRoutes.filter((route) => !existsSync(resolve(root, "dist-playground", route.replace(/^\//, ""), "index.html")));
if (missingStaticRoutes.length) fail("Missing static route metadata output: " + missingStaticRoutes.join(", ") + ".");
for (const guide of guides) {
  const routeHtml = readText("dist-playground" + guide.seo.canonicalPath + "index.html");
  const expectedTitle = landingGuideTitles[guide.slug] || guide.seo.title;
  if (!routeHtml.includes("<title>" + expectedTitle + "</title>")) fail(guide.id + " static title is missing.");
  if (!routeHtml.includes('rel="canonical" href="' + siteUrl + guide.seo.canonicalPath + '"')) fail(guide.id + " static canonical is missing.");
  if ((routeHtml.match(/meta name="description"/g) ?? []).length !== 1) fail(guide.id + " static metadata has an invalid description count.");
  const jsonLdRecords = [...routeHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const types = new Set(jsonLdRecords.map((record) => record["@type"]));
  if (!types.has("Article") || !types.has("BreadcrumbList") || !types.has("FAQPage")) fail(guide.id + " static JSON-LD is incomplete.");
}

console.log("SpiritVale guide validation PASSED");
console.log("Published guides: " + guides.length);
console.log("Guide canonical paths: " + canonicalPaths.size);
console.log("Resolved guide image references: " + imageCount);
console.log("Missing guide image references: 0");
console.log("Guide sources: " + sourceIds.size);
console.log("Shared Guide template, JSON-LD, TOC, FAQ, related guides, and Not Found: present");
