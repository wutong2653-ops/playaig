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
if (!siteCss.includes(".home-section--hero { padding-block-start: var(--sv-space-32); padding-block-end: var(--sv-space-24); }") || !siteCss.includes(".home-section--quick-search { padding-block-start: var(--sv-space-24); padding-block-end: var(--sv-space-48); }")) {
  fail("Hero and Quick Search must use the intentional tokenized 48px boundary gap.");
}
if (/home-section--(?:hero|quick-search|guides|classes|database|explore|updates)[^{]*\{[^}]*margin/i.test(siteCss)) fail("Homepage spacing repair must not use margin masking.");
if (!homePage.includes("<HeroBanner") || !homePage.includes('imageAssetId="sv-home-hero"') || !homePage.includes("<FeatureSection") || !homePage.includes('id="classes"') || !homePage.includes('id="database"') || !homePage.includes('id="guides"') || !homePage.includes('id="explore"') || !homePage.includes('id="updates"')) {
  fail("Homepage section structure is incomplete.");
}
if (homePage.includes('id="start-here"')) fail("Start Here must be folded into the data-driven Featured Guides section.");
if (!homePage.includes('title="SpiritVale Wiki, Guides and Game Database"') || !homePage.includes('description="Explore verified SpiritVale guides, classes, progression references and game database resources based on official sources."')) {
  fail("Homepage Hero title or approved description is missing.");
}
if (!homePage.includes('eyebrow="PlayAIG"') || !homePage.includes('gameName="SpiritVale"') || !homePage.includes('Verified Game Wiki')) {
  fail("Homepage brand hierarchy or verification status is missing.");
}
if (!homePage.includes('placeholder="Search guides, classes, bosses and game data..."') || !siteCss.includes("max-inline-size: var(--sv-hero-content-max)")) {
  fail("Quick Search must retain approved copy and its constrained desktop width.");
}
const orderedSections = ['id="guides"', 'id="classes"', 'id="database"', 'id="explore"', 'id="updates"'];
if (orderedSections.some((section, index) => index > 0 && homePage.indexOf(section) < homePage.indexOf(orderedSections[index - 1]))) {
  fail("Homepage sections must follow the release visual order.");
}
for (const marker of ["home-section--guides", "home-section--classes", "home-section--database", "home-section--explore", "home-section--updates"]) {
  if (!homePage.includes(marker)) fail("Homepage rhythm section marker is missing: " + marker + ".");
}
for (const rhythmRule of [
  ".home-section--guides { padding-block: var(--sv-space-48) var(--sv-space-64); }",
  ".home-section--classes, .home-section--database { padding-block: var(--sv-space-48); }",
  ".home-section--explore { padding-block: var(--sv-space-64); }",
  ".home-section--updates { padding-block: var(--sv-space-48); }"
]) {
  if (!siteCss.includes(rhythmRule)) fail("Homepage rhythm must use the specified existing spacing tokens.");
}
if (!siteCss.includes(".home-guides-section") || !siteCss.includes("box-shadow: var(--sv-shadow-md)") || !siteCss.includes(".home-explore-section")) {
  fail("Featured Guides and Explore SpiritVale must retain the intended visual emphasis.");
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
console.log("Homepage modules: Header, Hero, Quick Search, Featured Guides, Classes, Database, Explore, Updates, Footer");
console.log("Homepage rhythm: featured guides and Explore SpiritVale emphasized; utility and update sections restrained");
console.log("Registered assets checked: " + assets.length);
console.log("Production discovery artifacts checked: 5");
