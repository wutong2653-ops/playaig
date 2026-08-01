import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const outputRoot = resolve(root, "dist-playground");
const siteUrl = (process.env.SPIRITVALE_SITE_URL || process.env.SITE_URL || process.env.BASE_URL || process.env.SITE_ORIGIN || "https://playaig.com").replace(/\/$/, "");
const siteName = "PlayAIG";
const absolute = (path) => new URL(path, siteUrl).href;
const assets = JSON.parse(await readFile(resolve(root, "data/assets/spiritvale-assets.json"), "utf8"));
const assetById = new Map(assets.map((asset) => [asset.id, asset]));
const baseHtml = await readFile(resolve(outputRoot, "index.html"), "utf8");
const categories = [
  { id: "skills", label: "Skills", imageAssetId: "sv-guide-classes-selection-banner" },
  { id: "equipment", label: "Equipment", imageAssetId: "sv-guide-stats-crafting-banner" },
  { id: "cards", label: "Cards", imageAssetId: "sv-guide-cards-build-banner" },
  { id: "artifacts", label: "Artifacts", imageAssetId: "sv-guide-cards-build-banner" },
  { id: "monsters", label: "Monsters", imageAssetId: "sv-guide-beginner-combat-banner" },
  { id: "bosses", label: "Bosses", imageAssetId: "sv-boss-lava-arena-01" },
  { id: "maps", label: "Maps", imageAssetId: "sv-map-ice-cavern-01" }
];
const singularByCategory = { skills: "skill", equipment: "equipment", cards: "card", artifacts: "artifact", monsters: "monster", bosses: "boss", maps: "map" };

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
    '<meta property="og:type" content="website">',
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

const databaseIndexMetadata = {
  title: "SpiritVale Database",
  description: "Browse officially verified SpiritVale game data including skills, equipment, cards, artifacts, monsters, bosses and maps.",
  canonicalPath: "/database/"
};

await emitRoute("/database/", pageHtml({
  ...databaseIndexMetadata,
  imageAssetId: "sv-home-hero",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: databaseIndexMetadata.title,
      description: databaseIndexMetadata.description,
      url: databaseIndexMetadata.canonicalPath,
      hasPart: categories.map((category) => ({ "@type": "CollectionPage", identifier: category.id }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Database", item: "/database/" }
      ]
    }
  ]
}));

for (const category of categories) {
  const canonicalPath = "/database/" + category.id + "/";
  const title = "SpiritVale " + category.label + " Database — Verified Game Data";
  const description = "Browse officially verified SpiritVale " + singularByCategory[category.id] + " data. No verified entries are currently available.";
  await emitRoute(canonicalPath, pageHtml({
    title,
    description,
    canonicalPath,
    imageAssetId: category.imageAssetId,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: canonicalPath
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Database", item: "/database/" },
          { "@type": "ListItem", position: 3, name: category.label, item: canonicalPath }
        ]
      }
    ]
  }));
}

console.log("SpiritVale database static metadata output PASSED");
console.log("Database category route HTML files: " + categories.length);
