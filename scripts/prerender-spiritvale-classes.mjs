import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const outputRoot = resolve(root, "dist-playground");
const siteUrl = (process.env.SPIRITVALE_SITE_URL || process.env.SITE_URL || process.env.BASE_URL || process.env.SITE_ORIGIN || "https://playaig.com").replace(/\/$/, "");
const siteName = "PlayAIG";
const absolute = (path) => new URL(path, siteUrl).href;
const classes = JSON.parse(await readFile(resolve(root, "data/spiritvale/classes/classes.json"), "utf8"));
const assets = JSON.parse(await readFile(resolve(root, "data/assets/spiritvale-assets.json"), "utf8"));
const assetById = new Map(assets.map((asset) => [asset.id, asset]));
const baseHtml = await readFile(resolve(outputRoot, "index.html"), "utf8");
const classVisualAssetId = "sv-guide-classes-selection-banner";
const landingClassMeta = {
  knight: {
    title: "SpiritVale Knight Class Guide 2026: Build Guide | PlayAIG",
    description: "Read the SpiritVale Knight guide for confirmed class identity, build research, skill and equipment questions, leveling notes and PlayAIG updates.",
    faq: [
      ["Is Knight an officially confirmed SpiritVale class?", "Yes. Knight is recorded as one of the seven officially confirmed SpiritVale base classes."],
      ["What weapon does Knight use?", "No weapon assignment is currently confirmed by the registered official sources."],
      ["What are Knight’s skills?", "No individual Knight skills are currently verified in the formal data. Information will be updated when official details are confirmed."],
      ["What is the best Knight build?", "No official Knight build is available yet because skills, equipment, stats and progression details are not confirmed."],
      ["Is Knight a tank class?", "That role has not been confirmed. The class name alone is not evidence of a tank, damage or support role."],
      ["Where should Knight players find updates?", "Check the registered official SpiritVale Steam source and this page’s verification status for future updates."]
    ]
  },
  warrior: {
    title: "SpiritVale Warrior Class Guide 2026 | PlayAIG",
    description: "Explore the SpiritVale Warrior class with currently verified, source-backed information and links to related class, skill, equipment and database resources.",
    faq: [
      ["Is Warrior an officially confirmed SpiritVale class?", "Yes. Warrior is recorded as one of the seven officially confirmed SpiritVale base classes."],
      ["What Warrior information is currently verified?", "The class name and base-class identity are confirmed. Related community skill records are shown with their source status; they do not establish a complete Warrior build."],
      ["What is the best Warrior build?", "No verified best Warrior build is available because a complete source-backed combination of skills, equipment, stats and progression is not confirmed."],
      ["Does Warrior have a confirmed role or weapon?", "No role or weapon assignment is currently confirmed by the registered official sources."],
      ["Where should Warrior players find updates?", "Check the Warrior page, related database records and registered SpiritVale sources for future verified updates."]
    ]
  }
};

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

function pageHtml({ title, description, canonicalPath, imageAssetId, structuredData, type = "article" }) {
  const image = absolute(imagePath(imageAssetId));
  const alt = imageAlt(imageAssetId);
  const head = [
    '<link rel="canonical" href="' + absolute(canonicalPath) + '">',
    '<meta property="og:title" content="' + escapeHtml(title) + '">',
    '<meta property="og:description" content="' + escapeHtml(description) + '">',
    '<meta property="og:type" content="' + type + '">',
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

const classesIndexMetadata = {
  title: "SpiritVale Classes — Explore the Seven Base Classes",
  description: "Explore all officially confirmed SpiritVale base classes and follow future verified class updates.",
  canonicalPath: "/classes/"
};

await emitRoute("/classes/", pageHtml({
  ...classesIndexMetadata,
  imageAssetId: classVisualAssetId,
  type: "website",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: classesIndexMetadata.title,
      description: classesIndexMetadata.description,
      url: classesIndexMetadata.canonicalPath,
      hasPart: classes.map((gameClass) => ({ "@type": "Article", identifier: gameClass.id }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Classes", item: "/classes/" }
      ]
    }
  ]
}));

for (const gameClass of classes.filter((record) => record.classType === "base")) {
  const canonicalPath = "/classes/" + gameClass.slug + "/";
  const landing = landingClassMeta[gameClass.slug] || {
    title: "SpiritVale " + gameClass.name + " Class Guide 2026: Build Guide | PlayAIG",
    description: "Read the SpiritVale " + gameClass.name + " class guide for confirmed identity, skills, build research, equipment questions, sources and beginner tips from PlayAIG.",
    faq: [
      ["Is " + gameClass.name + " an officially confirmed SpiritVale class?", "Yes. " + gameClass.name + " is recorded as one of the seven confirmed SpiritVale base classes."],
      ["What role does " + gameClass.name + " have?", "No role is currently confirmed by the registered official sources. The class name alone is not evidence of a role."],
      ["What weapon does " + gameClass.name + " use?", "No weapon assignment is currently stored as verified official data."],
      ["What is the best " + gameClass.name + " build?", "No official build is available yet because skills, equipment, stats and progression details are not confirmed."],
      ["Where can I find " + gameClass.name + " updates?", "Check the registered official SpiritVale Steam source and this page’s verification status for future updates."]
    ]
  };
  const title = landing.title;
  const description = landing.description;
  const faq = landing.faq;
  await emitRoute(canonicalPath, pageHtml({
    title,
    description,
    canonicalPath,
    imageAssetId: classVisualAssetId,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: imagePath(classVisualAssetId),
        mainEntityOfPage: canonicalPath,
        dateModified: gameClass.updatedAt,
        author: { "@type": "Organization", name: siteName, url: absolute("/") }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Classes", item: "/classes/" },
          { "@type": "ListItem", position: 3, name: gameClass.name, item: canonicalPath }
        ]
      },
      ...(faq.length ? [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }] : [])
    ]
  }));
}

console.log("SpiritVale class static metadata output PASSED");
console.log("Class route HTML files: " + classes.filter((record) => record.classType === "base").length);
