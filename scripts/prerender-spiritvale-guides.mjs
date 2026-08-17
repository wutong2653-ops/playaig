import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const outputRoot = resolve(root, "dist-playground");
const siteUrl = (process.env.SPIRITVALE_SITE_URL || process.env.SITE_URL || process.env.BASE_URL || process.env.SITE_ORIGIN || "https://playaig.com").replace(/\/$/, "");
const siteName = "PlayAIG";
const absolute = (path) => new URL(path, siteUrl).href;
const guides = JSON.parse(await readFile(resolve(root, "data/spiritvale/guides/guides.json"), "utf8"));
const landingGuideMeta = {
  "beginner-guide": {
    title: "SpiritVale Beginner Guide 2026: Starter Guide | PlayAIG",
    description: "Use this SpiritVale beginner guide for confirmed systems, first steps, progression planning, equipment context and practical tips from PlayAIG.",
    faq: [
      ["What should a beginner upgrade first?", "There is no verified universal upgrade order yet. Learn the system, test one change at a time and keep choices flexible."],
      ["Is there a verified fastest leveling route?", "No official fastest route or experience formula is recorded in the current data. Information will be updated when a first-party source confirms one."],
      ["Where can I check equipment and card information?", "Use the Equipment and Cards database pages for collection status, then check the registered official source before relying on an individual claim."],
      ["How often should beginners recheck this guide?", "Recheck it after official SpiritVale updates because Early Access systems and terminology can change."]
    ]
  },
  "class-guide": {
    title: "SpiritVale Class Guide 2026: Base Classes | PlayAIG",
    description: "Compare seven confirmed SpiritVale base classes, understand verified information and plan class research without unsupported role or build claims on PlayAIG.",
    faq: [
      ["Which class is best for beginners?", "No official source currently confirms a best beginner class. Choose a class to test based on your preference and keep the decision flexible."],
      ["Are class roles and weapons verified?", "No. The current formal records confirm names and base-class identity, but do not verify role, weapon or primary-stat assignments."],
      ["Does SpiritVale have advanced classes?", "Official material refers to advanced specializations, but the exact base-class pairings are not yet confirmed in this data set."],
      ["Where should I find class updates?", "Check the registered official SpiritVale Steam source and the class pages on PlayAIG for verification status and future updates."],
      ["Can I publish a verified class build now?", "Not from the current source set. A build needs confirmed skills, equipment and progression details before it can be presented as verified."]
    ]
  },
  "card-system-guide": {
    title: "SpiritVale Card System Guide 2026: Complete Tips | PlayAIG",
    description: "Learn the SpiritVale card system, gear customization context, evidence limits, research steps and future card updates in this PlayAIG guide.",
    faq: [
      ["What does the SpiritVale Card System confirm?", "The official Steam material identifies cards and artifacts as character-build features and says the card system can customize gear."],
      ["Does this guide list unverified card system data?", "No. No card effect, rarity, drop table or tier list is currently verified; information will be updated when official details are confirmed."],
      ["How should beginners research cards?", "Read exact in-game wording, record context and version, test one change at a time and compare it with a registered official source."],
      ["Can community observations be official data?", "Community observations can guide research, but they are not official data without a registered first-party source."],
      ["When will this guide be updated?", "There is no fixed schedule. The page will be reviewed when official SpiritVale sources publish verifiable information."]
    ]
  },
  "leveling-guide": {
    title: "SpiritVale Leveling Guide 2026: Complete Tips | PlayAIG",
    description: "Use this SpiritVale leveling guide for confirmed progression systems, safe early planning, equipment context and source-led updates from PlayAIG.",
    faq: [
      ["What does the SpiritVale Leveling system confirm?", "Official SpiritVale information says players can level characters and mentions skill progression, class switching, equipment, loot, combat and multiplayer."],
      ["Does this guide list unverified leveling data?", "No. No fastest route, level cap, experience formula or level table is currently verified; information will be updated when official details are confirmed."],
      ["How should beginners research leveling?", "Read exact in-game wording, record context and version, test one change at a time and compare it with a registered official source."],
      ["Can community observations be official data?", "Community observations can guide research, but they are not official data without a registered first-party source."],
      ["When will this guide be updated?", "There is no fixed schedule. The page will be reviewed when official SpiritVale sources publish verifiable information."]
    ]
  },
  "stats-guide": {
    title: "SpiritVale Stats Guide 2026: Complete Review | PlayAIG",
    description: "Review SpiritVale character and equipment stats with source boundaries, refining context, research steps and transparent PlayAIG updates for players.",
    faq: [
      ["What does the SpiritVale Stats system confirm?", "Official material discusses characters, equipment, upgrades, loot, skills, cards and artifacts, but does not publish individual stat names or formulas."],
      ["Does this guide list unverified stats?", "No. No attribute formula, soft cap, primary stat or reset rule is currently verified; information will be updated when official details are confirmed."],
      ["How should beginners research stats?", "Read the complete tooltip, condition, version and source before treating a value as a verified stat."],
      ["Can community observations be official data?", "Community observations can guide research, but they are not official data without a registered first-party source."],
      ["When will this guide be updated?", "There is no fixed schedule. The page will be reviewed when official SpiritVale sources publish verifiable information."]
    ]
  }
};
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
  const landing = landingGuideMeta[guide.slug];
  const title = landing?.title || guide.seo.title;
  const description = landing?.description || guide.seo.description;
  const faqItems = landing ? [...guide.faqItems.map((item) => [item.question, item.answer]), ...landing.faq] : guide.faqItems.map((item) => [item.question, item.answer]);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
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
      mainEntity: faqItems.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }))
    }
  ];
  await emitRoute(guide.seo.canonicalPath, pageHtml({
    title,
    description,
    canonicalPath: guide.seo.canonicalPath,
    imageAssetId: guide.imageAssetIds[0],
    structuredData
  }));
}

console.log("SpiritVale guide static metadata output PASSED");
console.log("Guide route HTML files: " + guides.length);
