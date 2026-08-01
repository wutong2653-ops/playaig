import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const readText = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => { throw new Error(message); };
const siteUrl = "https://playaig.com";
const nonProductionHosts = ["spiritvale" + ".example", "local" + "host", "127.0" + ".0.1", "example" + ".com"];

const guides = readJson("data/spiritvale/guides/guides.json");
const classes = readJson("data/spiritvale/classes/classes.json");
const sources = readJson("data/spiritvale/sources/sources.json");
const assets = readJson("data/assets/spiritvale-assets.json");
const databaseCollections = ["skills", "equipment", "cards", "artifacts", "monsters", "bosses", "maps"];
const app = readText("src/app/App.tsx");
const header = readText("src/app/Header.tsx");
const searchService = readText("src/data/search.ts");
const searchPage = readText("src/app/SearchPage.tsx");
const searchCard = readText("src/components/search/index.tsx");
const notFoundPage = readText("src/app/NotFoundPage.tsx");
const metadata = readText("src/app/site.ts");
const assetIds = new Set(assets.map((asset) => asset.id));

if (!app.includes("SearchPage") || !app.includes("NotFoundPage") || !app.includes('pathname === "/search/"') || !app.includes('pathname === "/404/"')) {
  fail("Search or 404 route is missing.");
}
if ((header.match(/<SearchBar/g) ?? []).length < 2 || !header.includes('window.location.assign("/search/?q="')) {
  fail("Header must use the shared SearchBar for desktop and mobile search.");
}
if (!searchService.includes("getSpiritValeSearchIndex") || !searchService.includes("searchSpiritVale") || !searchService.includes("getGuides") || !searchService.includes("getClasses") || !searchService.includes("getDatabaseCategories")) {
  fail("Search service is not derived from formal Guides, Classes, and Database categories.");
}
if (!searchPage.includes("No verified results found.") || !searchPage.includes("Try another keyword or browse our verified Guides and Classes.") || !searchPage.includes("SearchResultCard") || !searchPage.includes("Search filters")) {
  fail("Search UI, Empty State, Search Result Card, or filters are missing.");
}
if (!searchCard.includes("Source:") || !searchCard.includes("verificationPresentation") || !searchCard.includes("search-result-card__url")) {
  fail("Search Result Card is missing source type, verification badge, or URL.");
}
if (!notFoundPage.includes("Browse Guides") || !notFoundPage.includes("Browse Classes") || !notFoundPage.includes("Back Home") || !notFoundPage.includes("SearchBar")) {
  fail("404 page must include Search, Browse Guides, Browse Classes, and Back Home.");
}
if (!metadata.includes("export function applyPageMetadata") || !metadata.includes("export type MetadataInput") || !metadata.includes("applySearchMetadata") || !metadata.includes("applyNotFoundMetadata")) {
  fail("Unified metadata generator or Search/404 metadata is missing.");
}
if (readText("src/app/HomePage.tsx").includes("spiritvale-home-jsonld-static")) fail("Homepage JSON-LD must not be duplicated in page markup.");

if (guides.length !== 5 || classes.filter((gameClass) => gameClass.classType === "base").length !== 7 || databaseCollections.length !== 7) {
  fail("Search source collections do not contain the expected Guide, Class, and Database category counts.");
}
for (const category of databaseCollections) {
  const records = readJson("data/spiritvale/" + category + "/" + (category === "equipment" ? "equipment" : category) + ".json");
  if (!Array.isArray(records) || records.length !== 0) fail("Database category " + category + " must not contain fabricated records.");
}
const mage = classes.find((gameClass) => gameClass.slug === "mage");
const classGuide = guides.find((guide) => guide.id === "guide-classes");
if (!mage || !classGuide || !classGuide.relatedClassIds.includes(mage.id)) fail("Mage query must resolve Mage Class and the related Class Guide from formal data.");
for (const asset of assets) if (!asset.alt) fail("Asset " + asset.id + " is missing alt text.");
if (!sources.some((source) => source.id === "source-official-steam-store")) fail("Official Steam source is missing.");

for (const file of ["src/app/SearchPage.tsx", "src/app/NotFoundPage.tsx", "src/components/search/index.tsx", "src/app/Header.tsx"]) {
  const source = readText(file);
  if (source.includes('src="/images/') || source.includes("src='/images/") || /https?:\/\/[^\"]+\.(?:png|jpe?g|webp|gif)/i.test(source)) {
    fail(file + " contains a direct or external image path.");
  }
}

const sitemapPath = resolve(root, "public/sitemap.xml");
const robotsPath = resolve(root, "public/robots.txt");
const rssPath = resolve(root, "public/rss.xml");
const openSearchPath = resolve(root, "public/opensearch.xml");
for (const file of [sitemapPath, robotsPath, rssPath, openSearchPath]) if (!existsSync(file)) fail("Missing SEO discovery file: " + file);
const sitemap = readText("public/sitemap.xml");
const robots = readText("public/robots.txt");
const rss = readText("public/rss.xml");
const openSearch = readText("public/opensearch.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedPaths = ["/", "/guides/", "/classes/", "/database/", ...guides.map((guide) => guide.seo.canonicalPath), ...classes.filter((gameClass) => gameClass.classType === "base").map((gameClass) => "/classes/" + gameClass.slug + "/"), ...databaseCollections.map((category) => "/database/" + category + "/")];
if (sitemapUrls.length !== expectedPaths.length || new Set(sitemapUrls).size !== sitemapUrls.length) fail("Sitemap URL count or uniqueness is invalid.");
for (const path of expectedPaths) if (!sitemapUrls.includes(siteUrl + path)) fail("Sitemap is missing " + path);
if (sitemapUrls.some((url) => /\/(?:404|search|playground)(?:\/|$)/.test(url))) fail("Sitemap contains a disallowed route.");
for (const disallowed of ["Disallow: /playground/", "Disallow: /search/", "Disallow: /404/", "Sitemap: " + siteUrl + "/sitemap.xml"]) if (!robots.includes(disallowed)) fail("robots.txt is missing " + disallowed);
if ((rss.match(/<item>/g) ?? []).length !== guides.length) fail("RSS item count must equal formal Guide count.");
for (const guide of guides) {
  if (!rss.includes("<link>" + siteUrl + guide.seo.canonicalPath + "</link>")) fail("RSS is missing guide link " + guide.id);
  if (!rss.includes(new Date(guide.updatedAt).toUTCString())) fail("RSS must use the real updatedAt value for " + guide.id);
}
if (!openSearch.includes("OpenSearchDescription") || !openSearch.includes(siteUrl + "/search/?q={searchTerms}")) fail("OpenSearch provider is invalid.");

const expectedStaticRoutes = ["/", "/guides/", "/classes/", "/database/", ...guides.map((guide) => guide.seo.canonicalPath), ...classes.filter((gameClass) => gameClass.classType === "base").map((gameClass) => "/classes/" + gameClass.slug + "/"), ...databaseCollections.map((category) => "/database/" + category + "/")];
for (const route of expectedStaticRoutes) {
  const file = route === "/" ? "dist-playground/index.html" : "dist-playground" + route + "index.html";
  if (!existsSync(resolve(root, file))) fail("Missing static route metadata output: " + route);
  const html = readText(file);
  if ((html.match(/meta name="description"/g) ?? []).length !== 1) fail(route + " must have one description meta tag.");
  if ((html.match(/rel="canonical"/g) ?? []).length !== 1) fail(route + " must have one canonical tag.");
  if (!html.includes('rel="canonical" href="' + siteUrl + route + '"')) fail(route + " must use the production canonical URL.");
  if (!html.includes("twitter:card") || !html.includes("og:title") || !html.includes("application/ld+json")) fail(route + " is missing social metadata or JSON-LD.");
  if (!html.includes('og:site_name" content="PlayAIG"') || !html.includes('twitter:site" content="PlayAIG"')) fail(route + " is missing PlayAIG social branding.");
  if (nonProductionHosts.some((host) => html.includes(host))) fail(route + " contains a non-production host.");
}
for (const file of ["sitemap.xml", "robots.txt", "rss.xml", "opensearch.xml"]) if (!existsSync(resolve(root, "dist-playground", file))) fail("SEO discovery output is missing from build: " + file);

console.log("SpiritVale search and technical SEO validation PASSED");
console.log("Search index sources: Guides " + guides.length + ", Classes " + classes.filter((gameClass) => gameClass.classType === "base").length + ", Database categories " + databaseCollections.length);
console.log("Sitemap URLs: " + sitemapUrls.length);
console.log("RSS guide items: " + guides.length);
console.log("Technical SEO static routes checked: " + expectedStaticRoutes.length);
console.log("Missing search assets, sources, canonical tags, metadata, JSON-LD, and discovery files: 0");
