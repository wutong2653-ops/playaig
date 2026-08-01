import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const outputRoot = resolve(root, "dist-playground");
const siteUrl = (process.env.SPIRITVALE_SITE_URL || process.env.SITE_URL || process.env.BASE_URL || process.env.SITE_ORIGIN || "https://playaig.com").replace(/\/$/, "");
const siteName = "PlayAIG";
const absolute = (path) => new URL(path, siteUrl).href;
const guides = JSON.parse(await readFile(resolve(root, "data/spiritvale/guides/guides.json"), "utf8"));
const assets = JSON.parse(await readFile(resolve(root, "data/assets/spiritvale-assets.json"), "utf8"));
const assetById = new Map(assets.map((asset) => [asset.id, asset]));
const baseHtml = await readFile(resolve(outputRoot, "index.html"), "utf8");

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function imagePath(imageAssetId) {
  const asset = assetById.get(imageAssetId);
  return asset ? asset.file.slice("public".length) : "";
}

function imageAlt(imageAssetId) {
  const asset = assetById.get(imageAssetId);
  return asset ? asset.alt : "";
}

function normalizeStructuredData(value) {
  if (Array.isArray(value)) return value.map(normalizeStructuredData);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeStructuredData(item)]));
  return typeof value === "string" && value.startsWith("/") ? absolute(value) : value;
}

function pageHtml({ title, description, canonicalPath, imageAssetId, structuredData }) {
  const image = absolute(imagePath(imageAssetId));
  const alt = imageAlt(imageAssetId);
  const head = [
    '<link rel="canonical" href="' + absolute(canonicalPath) + '">',
    '<meta property="og:title" content="' + escapeHtml(title) + '">',
    '<meta property="og:description" content="' + escapeHtml(description) + '">',
    '<meta property="og:type" content="article">',
    '<meta property="og:site_name" content="' + siteName + '">',
    '<meta property="og:url" content="' + absolute(canonicalPath) + '">',
    '<meta property="og:image" content="' + image + '">',
    '<meta property="og:image:alt" content="' + escapeHtml(alt) + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:site" content="' + siteName + '">',
    '<meta property="twitter:image" content="' + image + '">',
    structuredData.map((record) => '<script type="application/ld+json">' + JSON.stringify(normalizeStructuredData(record)) + "</script>").join("")
  ].join("");
  return baseHtml
    .replace(/<title>[^<]*<\/title>/, "<title>" + escapeHtml(title) + "</title>")
    .replace(/<meta name="description"[^>]*>/, '<meta name="description" content="' + escapeHtml(description) + '">')
    .replace("</head>", head + "</head>");
}

async function emitRoute(routePath, html) {
  const file = resolve(outputRoot, routePath.replace(/^\//, ""), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

const guidesIndexMetadata = {
  title: "SpiritVale Guides — Beginner Tips, Classes and Game Systems",
  description: "Browse SpiritVale beginner, class, leveling, stats and card system guides based on verified official game information.",
  canonicalPath: "/guides/"
};
const indexStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: guidesIndexMetadata.title,
    description: guidesIndexMetadata.description,
    url: guidesIndexMetadata.canonicalPath,
    hasPart: guides.map((guide) => ({ "@type": "Article", identifier: guide.id }))
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "/guides/" }
    ]
  }
];

await emitRoute("/guides/", pageHtml({
  ...guidesIndexMetadata,
  imageAssetId: "sv-guide-beginner-combat-banner",
  structuredData: indexStructuredData
}));

for (const guide of guides) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.seo.title,
      description: guide.seo.description,
      image: imagePath(guide.imageAssetIds[0]),
      mainEntityOfPage: guide.seo.canonicalPath,
      dateModified: guide.updatedAt,
      author: { "@type": "Organization", name: siteName, url: absolute("/") }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "/guides/" },
        { "@type": "ListItem", position: 3, name: guide.name, item: guide.seo.canonicalPath }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    }
  ];
  await emitRoute(guide.seo.canonicalPath, pageHtml({
    title: guide.seo.title,
    description: guide.seo.description,
    canonicalPath: guide.seo.canonicalPath,
    imageAssetId: guide.imageAssetIds[0],
    structuredData
  }));
}

console.log("SpiritVale guide static metadata output PASSED");
console.log("Guide route HTML files: " + guides.length);
