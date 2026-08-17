import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const outputRoot = resolve(root, "dist-playground");
const siteUrl = (process.env.SPIRITVALE_SITE_URL || process.env.SITE_URL || process.env.BASE_URL || process.env.SITE_ORIGIN || "https://playaig.com").replace(/\/$/, "");
const siteName = "PlayAIG";
const siteDescription = "PlayAIG provides verified game wikis, guides, classes and databases based on official sources.";
const guides = JSON.parse(await readFile(resolve(root, "data/spiritvale/guides/guides.json"), "utf8"));
const classes = JSON.parse(await readFile(resolve(root, "data/spiritvale/classes/classes.json"), "utf8"));
const cards = JSON.parse(await readFile(resolve(root, "data/spiritvale/cards/cards.json"), "utf8"));
const equipment = JSON.parse(await readFile(resolve(root, "data/spiritvale/equipment/equipment.json"), "utf8"));
const monsters = JSON.parse(await readFile(resolve(root, "data/spiritvale/monsters/monsters.json"), "utf8"));
const skills = JSON.parse(await readFile(resolve(root, "data/spiritvale/skills/skills.json"), "utf8"));
const sources = JSON.parse(await readFile(resolve(root, "data/spiritvale/sources/sources.json"), "utf8"));
const sourceIds = new Set(sources.map((source) => source.id));
const validCards = cards.filter((card) => card.id && card.slug && card.name && card.sourceIds?.length && card.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const validEquipment = equipment.filter((item) => item.id && item.slug && item.name && item.status === "published" && item.sourceIds?.length && item.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const validMonsters = monsters.filter((monster) => monster.id && monster.slug && monster.name && monster.status === "published" && monster.sourceIds?.length && monster.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const validSkills = skills.filter((skill) => skill.id && skill.slug && skill.name && skill.status === "published" && skill.sourceIds?.length && skill.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const databaseCategoryIds = ["skills", "equipment", "cards", "artifacts", "monsters", "bosses", "maps"];

function escapeXml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function absolute(path) {
  return siteUrl + path;
}

async function writeArtifact(file, content) {
  await writeFile(resolve(root, "public", file), content);
  await writeFile(resolve(outputRoot, file), content);
}

const sitemapPaths = [
  "/",
  "/guides/",
  "/classes/",
  "/database/",
  ...guides.map((guide) => guide.seo.canonicalPath),
  ...classes.filter((gameClass) => gameClass.classType === "base").map((gameClass) => "/classes/" + gameClass.slug + "/"),
  ...databaseCategoryIds.map((categoryId) => "/database/" + categoryId + "/"),
  ...validCards.map((card) => "/database/cards/" + card.slug + "/"),
  ...validEquipment.map((item) => "/database/equipment/" + item.slug + "/"),
  ...validMonsters.map((monster) => "/database/monsters/" + monster.slug + "/")
  ,...validSkills.map((skill) => "/database/skills/" + skill.slug + "/")
];
const uniqueSitemapPaths = [...new Set(sitemapPaths)];
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...uniqueSitemapPaths.map((path) => "  <url><loc>" + escapeXml(absolute(path)) + "</loc></url>"),
  "</urlset>",
  ""
].join("\n");

const robots = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /playground/",
  "Disallow: /search/",
  "Disallow: /404/",
  "Disallow: /src/",
  "Disallow: /node_modules/",
  "",
  "Sitemap: " + absolute("/sitemap.xml"),
  ""
].join("\n");

const latestGuideDate = guides.map((guide) => guide.updatedAt).sort().at(-1);
const rss = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0">',
  "  <channel>",
  "    <title>PlayAIG Updates</title>",
  "    <link>" + escapeXml(absolute("/")) + "</link>",
  "    <description>Latest verified guides from PlayAIG.</description>",
  latestGuideDate ? "    <lastBuildDate>" + new Date(latestGuideDate).toUTCString() + "</lastBuildDate>" : "",
  ...[...guides].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)).map((guide) => [
    "    <item>",
    "      <title>" + escapeXml(guide.name) + "</title>",
    "      <link>" + escapeXml(absolute(guide.seo.canonicalPath)) + "</link>",
    "      <guid isPermaLink=\"true\">" + escapeXml(absolute(guide.seo.canonicalPath)) + "</guid>",
    "      <description>" + escapeXml(guide.shortDescription ?? guide.description ?? "Verified SpiritVale guide information.") + "</description>",
    "      <pubDate>" + new Date(guide.updatedAt).toUTCString() + "</pubDate>",
    "    </item>"
  ].join("\n")),
  "  </channel>",
  "</rss>",
  ""
].filter(Boolean).join("\n");

const openSearch = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">',
  "  <ShortName>PlayAIG</ShortName>",
  "  <Description>Search verified game guides, classes, and database categories on PlayAIG.</Description>",
  '  <Url type="text/html" template="' + escapeXml(absolute("/search/?q={searchTerms}")) + '"/>',
  "  <InputEncoding>UTF-8</InputEncoding>",
  "</OpenSearchDescription>",
  ""
].join("\n");

await writeArtifact("sitemap.xml", sitemap);
await writeArtifact("robots.txt", robots);
await writeArtifact("rss.xml", rss);
await writeArtifact("opensearch.xml", openSearch);

const homepageTitle = "PlayAIG — Verified Game Wikis, Guides and Databases";
const homepageDescription = siteDescription;
const homepageImage = absolute("/images/spiritvale/hero/spiritvale-home-hero.webp");
const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: absolute("/"),
  publisher: { "@type": "Organization", name: siteName, url: absolute("/") },
  description: homepageDescription
};
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: absolute("/")
};
const rootIndex = resolve(outputRoot, "index.html");
const baseHtml = await readFile(rootIndex, "utf8");
const defaultTitle = "PlayAIG — Verified Game Wikis, Guides and Databases";
const defaultDescription = siteDescription;

function staticRouteHtml({ title, description, canonicalPath, robots }) {
  const canonical = absolute(canonicalPath);
  const head = [
    '<link rel="canonical" href="' + canonical + '">',
    '<meta property="og:title" content="' + escapeXml(title) + '">',
    '<meta property="og:description" content="' + escapeXml(description) + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="' + siteName + '">',
    '<meta property="og:url" content="' + canonical + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:site" content="' + siteName + '">',
    '<meta name="robots" content="' + robots + '">'
  ].join("");
  return baseHtml
    .replace('<title>' + defaultTitle + '</title>', '<title>' + escapeXml(title) + '</title>')
    .replace('content="' + defaultDescription + '"', 'content="' + escapeXml(description) + '"')
    .replace("</head>", head + "</head>");
}

await mkdir(resolve(outputRoot, "search"), { recursive: true });
await writeFile(
  resolve(outputRoot, "search", "index.html"),
  staticRouteHtml({
    title: "Search SpiritVale",
    description: "Search the currently indexed and verified SpiritVale Guides, Classes, and Database categories.",
    canonicalPath: "/search/",
    robots: "noindex,follow"
  })
);

await writeFile(
  resolve(outputRoot, "404.html"),
  staticRouteHtml({
    title: "Page not found | PlayAIG",
    description: "The requested SpiritVale page is unavailable.",
    canonicalPath: "/404/",
    robots: "noindex,follow"
  })
);

const homepageHead = [
  '<link rel="canonical" href="' + absolute("/") + '">',
  '<meta property="og:title" content="' + homepageTitle + '">',
  '<meta property="og:description" content="' + homepageDescription + '">',
  '<meta property="og:type" content="website">',
  '<meta property="og:site_name" content="' + siteName + '">',
  '<meta property="og:url" content="' + absolute("/") + '">',
  '<meta property="og:image" content="' + homepageImage + '">',
  '<meta property="og:image:alt" content="SpiritVale official hero image">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="twitter:site" content="' + siteName + '">',
  '<meta property="twitter:image" content="' + homepageImage + '">',
  '<meta name="robots" content="index,follow">',
  '<script type="application/ld+json">' + JSON.stringify(organizationJsonLd) + "</script>",
  '<script type="application/ld+json">' + JSON.stringify(homepageJsonLd) + "</script>"
].join("");
await writeFile(rootIndex, baseHtml.replace("</head>", homepageHead + "</head>"));

console.log("SpiritVale SEO discovery files generated");
console.log("Sitemap URLs: " + uniqueSitemapPaths.length);
console.log("RSS guide items: " + guides.length);
console.log("Verified card entity URLs: " + validCards.length);
console.log("Partially verified equipment entity URLs: " + validEquipment.length);
console.log("Partially verified monster entity URLs: " + validMonsters.length);
console.log("Partially verified skill entity URLs: " + validSkills.length);
console.log("SEO base URL: " + siteUrl);
