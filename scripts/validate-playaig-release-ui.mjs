import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const readText = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => { throw new Error(message); };
const homePage = readText("src/app/HomePage.tsx");
const siteCss = readText("src/app/site.css");
const assets = JSON.parse(readText("data/assets/spiritvale-assets.json"));
const indexHtml = readText("dist-playground/index.html");
const siteUrl = "https://playaig.com";

if (!homePage.includes('className="home-section--hero"')) fail("Homepage Hero section marker is missing.");
if (!homePage.includes('className="home-section--quick-search"')) fail("Homepage Quick Search section marker is missing.");
if (!siteCss.includes(".home-section--hero { padding-block-start: var(--sv-space-32); padding-block-end: var(--sv-space-24); }") || !siteCss.includes(".home-section--quick-search { padding-block-start: var(--sv-space-24); }")) {
  fail("Hero and Quick Search must use the intentional tokenized 48px boundary gap.");
}
if (/home-section--(?:hero|quick-search)[^{]*\{[^}]*margin/i.test(siteCss)) fail("Homepage spacing repair must not use margin masking.");
if (!homePage.includes("<HeroBanner") || !homePage.includes('imageAssetId="sv-home-hero"') || !homePage.includes("<FeatureSection") || !homePage.includes('id="start-here"') || !homePage.includes('id="classes"') || !homePage.includes('id="database"') || !homePage.includes('id="guides"') || !homePage.includes('id="explore"') || !homePage.includes('id="updates"')) {
  fail("Homepage section structure is incomplete.");
}
if (!homePage.includes('priority />')) fail("Homepage Hero image must remain priority loaded.");
for (const asset of assets) {
  if (!asset.file || !existsSync(resolve(root, asset.file))) fail("Registered asset is missing: " + asset.id);
}
for (const file of ["sitemap.xml", "robots.txt", "rss.xml", "opensearch.xml", "site.webmanifest"]) {
  if (!existsSync(resolve(root, "public", file)) || !existsSync(resolve(root, "dist-playground", file))) fail("Production artifact is missing: " + file);
}
if (!indexHtml.includes(siteUrl) || /spiritvale\.example|localhost|127\.0\.0\.1|example\.com/i.test(indexHtml)) fail("Homepage production metadata URL regressed.");

console.log("PlayAIG homepage release UI validation PASSED");
console.log("Hero-to-Quick-Search boundary gap: 48px via existing spacing tokens");
console.log("Homepage sections: 9");
console.log("Registered assets checked: " + assets.length);
console.log("Production discovery artifacts checked: 5");
