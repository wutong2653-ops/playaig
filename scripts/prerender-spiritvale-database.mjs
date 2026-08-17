import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const outputRoot = resolve(root, "dist-playground");
const siteUrl = (process.env.SPIRITVALE_SITE_URL || process.env.SITE_URL || process.env.BASE_URL || process.env.SITE_ORIGIN || "https://playaig.com").replace(/\/$/, "");
const siteName = "PlayAIG";
const absolute = (path) => new URL(path, siteUrl).href;
const assets = JSON.parse(await readFile(resolve(root, "data/assets/spiritvale-assets.json"), "utf8"));
const cardRecords = JSON.parse(await readFile(resolve(root, "data/spiritvale/cards/cards.json"), "utf8"));
const equipmentRecords = JSON.parse(await readFile(resolve(root, "data/spiritvale/equipment/equipment.json"), "utf8"));
const monsterRecords = JSON.parse(await readFile(resolve(root, "data/spiritvale/monsters/monsters.json"), "utf8"));
const skillRecords = JSON.parse(await readFile(resolve(root, "data/spiritvale/skills/skills.json"), "utf8"));
const sourceRecords = JSON.parse(await readFile(resolve(root, "data/spiritvale/sources/sources.json"), "utf8"));
const sourceIds = new Set(sourceRecords.map((source) => source.id));
const cards = cardRecords.filter((card) => card.id && card.slug && card.name && card.sourceIds?.length && card.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const equipment = equipmentRecords.filter((item) => item.id && item.slug && item.name && item.sourceIds?.length && item.sourceIds.every((sourceId) => sourceIds.has(sourceId)) && item.status === "published");
const monsters = monsterRecords.filter((monster) => monster.id && monster.slug && monster.name && monster.sourceIds?.length && monster.sourceIds.every((sourceId) => sourceIds.has(sourceId)) && monster.status === "published");
const skills = skillRecords.filter((skill) => skill.id && skill.slug && skill.name && skill.sourceIds?.length && skill.sourceIds.every((sourceId) => sourceIds.has(sourceId)) && skill.status === "published");
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

function pageHtml({ title, description, canonicalPath, imageAssetId, structuredData, type = "website" }) {
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

const databaseIndexMetadata = {
  title: "SpiritVale Database — Verified Game Data | PlayAIG",
  description: "Explore the SpiritVale Database for verified skills, equipment, cards, artifacts, monsters, bosses and maps. New entries appear as official information is confirmed.",
  canonicalPath: "/database/"
};

const databaseIndexFaqItems = [
  ["What is the SpiritVale Database?", "The SpiritVale Database is a reference index for SpiritVale information that can be tied to registered official sources."],
  ["What information will the SpiritVale Database include?", "The index covers skills, equipment, cards, artifacts, monsters, bosses and maps. Individual entries appear only after their details are officially confirmed."],
  ["How do I use the SpiritVale Database?", "Choose a category, check its verification status, and open an entry when one is available. Categories marked Data Collection In Progress do not yet contain verified records."],
  ["Are SpiritVale Database entries verified?", "Entries are added only when their details can be tied to a registered official SpiritVale source. Information will be updated as official details are confirmed."],
  ["How often is the SpiritVale Database updated?", "There is no fixed public update schedule. The database is reviewed when official SpiritVale sources publish information that can be verified."],
  ["Is the SpiritVale Database an official game website?", "PlayAIG is an independent fan resource. It uses registered official sources for verification and is not affiliated with or endorsed by Baikun Interactive."]
];

const landingCategoryMeta = {
  cards: {
    title: "SpiritVale Cards Database: Complete List | PlayAIG",
    description: "Explore the SpiritVale Cards Database for collection status, card categories and verified effects, with transparent updates from PlayAIG today.",
    faq: [
      ["Are any SpiritVale card entries verified?", "The first Card records are verified against a registered community source and are clearly labelled; they are not official developer records."],
      ["What card effects are confirmed?", "The Cards collection includes effect wording from the registered community source for its approved records; fields not published by that source remain empty."],
      ["Does SpiritVale have a card rarity system?", "A formal rarity scale is not yet confirmed by the registered official sources."],
      ["How do players obtain cards?", "The official store mentions cards and loot but does not provide a verified acquisition table yet."],
      ["Which SpiritVale cards are best?", "No ranking is published because there are no verified card records or effects to compare."],
      ["Where will new card information appear?", "Future verified card records will be added to this collection with their registered source and review status."]
    ]
  },
  equipment: {
    title: "SpiritVale Equipment Database: Complete List | PlayAIG",
    description: "Browse the SpiritVale Equipment Database for 50 partially verified item records, displayed stats, effects and acquisition evidence from PlayAIG.",
    faq: [
      ["Are any SpiritVale equipment entries verified?", "Fifty Equipment pilot records are partially verified against a registered community source; they are not official developer records."],
      ["Which equipment is best for beginners?", "No official best-equipment ranking is confirmed yet. Test options carefully and keep choices flexible."],
      ["What equipment stats are confirmed?", "The pilot records preserve stat text published by a registered community source and remain labelled partially verified."],
      ["How is equipment upgraded?", "A complete upgrade system is not yet documented in the current source set."],
      ["Where do equipment items come from?", "Pilot records include source-listed drop or crafting evidence where published; this is not an official universal acquisition table."],
      ["When will the Equipment Database be updated?", "There is no fixed schedule. Information will be updated when official SpiritVale sources confirm individual equipment records."]
    ]
  }
};

const databaseFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: databaseIndexFaqItems.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer }
  }))
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
      "@type": "WebPage",
      name: databaseIndexMetadata.title,
      description: databaseIndexMetadata.description,
      url: databaseIndexMetadata.canonicalPath,
      isPartOf: { "@type": "WebSite", name: siteName, url: "/" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Database", item: "/database/" }
      ]
    },
    databaseFaqSchema
  ]
}));

for (const category of categories) {
  const canonicalPath = "/database/" + category.id + "/";
  const singular = singularByCategory[category.id];
  const fallbackTitle = category.id === "maps" ? "SpiritVale Maps Database: Complete Map List | PlayAIG" : "SpiritVale " + category.label + " Database: Complete List | PlayAIG";
  const landing = landingCategoryMeta[category.id] || {
    title: fallbackTitle,
    description: "Use the SpiritVale " + category.label + " Database for verified " + singular + " records, collection guidance, source status and transparent future updates from PlayAIG today.",
    faq: [
      ["Are any SpiritVale " + category.label.toLowerCase() + " entries verified?", "No verified " + singular + " entries are currently available in the formal PlayAIG collection."],
      ["What " + singular + " information is confirmed?", "The collection is awaiting official details. Individual names, properties and relationships are not currently verified."],
      ["How do I use the " + category.label + " Database?", "Check the verification status, read the registered source and use future records only when their details are officially confirmed."],
      ["Which " + singular + " is best?", "No ranking is published because there are no verified records and comparison criteria yet."],
      ["When will the " + category.label + " Database be updated?", "There is no fixed schedule. Information will be updated when official SpiritVale sources confirm individual records."]
    ]
  };
  const title = landing.title;
  const description = landing.description;
  const faq = landing.faq;
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

for (const card of cards) {
  const canonicalPath = "/database/cards/" + card.slug + "/";
  const title = "SpiritVale " + card.name + " Card Guide | PlayAIG";
  const description = card.name + " is a verified SpiritVale card entry. View its source-backed database record and currently confirmed information on PlayAIG.";
  const imageAssetId = card.imageAssetId || "sv-guide-cards-build-banner";
  await emitRoute(canonicalPath, pageHtml({
    title,
    description,
    canonicalPath,
    imageAssetId,
    type: "article",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: absolute(imagePath(imageAssetId)),
        mainEntityOfPage: absolute(canonicalPath),
        author: { "@type": "Organization", name: siteName, url: absolute("/") }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Database", item: "/database/" },
          { "@type": "ListItem", position: 3, name: "Cards", item: "/database/cards/" },
          { "@type": "ListItem", position: 4, name: card.name, item: canonicalPath }
        ]
      }
    ]
  }));
}

for (const item of equipment) {
  const canonicalPath = "/database/equipment/" + item.slug + "/";
  const title = "SpiritVale " + item.name + " Equipment Guide | PlayAIG";
  const description = item.description
    ? item.description + " Review source-backed SpiritVale equipment information on PlayAIG."
    : "Review source-backed information about the SpiritVale " + item.name + " equipment, including stats, effects, acquisition evidence and sources on PlayAIG.";
  await emitRoute(canonicalPath, pageHtml({
    title,
    description,
    canonicalPath,
    imageAssetId: "sv-guide-stats-crafting-banner",
    type: "article",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: absolute(imagePath("sv-guide-stats-crafting-banner")),
        mainEntityOfPage: absolute(canonicalPath),
        dateModified: item.updatedAt,
        author: { "@type": "Organization", name: siteName, url: absolute("/") }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Database", item: "/database/" },
          { "@type": "ListItem", position: 3, name: "Equipment", item: "/database/equipment/" },
          { "@type": "ListItem", position: 4, name: item.name, item: canonicalPath }
        ]
      }
    ]
  }));
}

for (const monster of monsters) {
  const canonicalPath = "/database/monsters/" + monster.slug + "/";
  const title = "SpiritVale " + monster.name + " Monster Guide | PlayAIG";
  const description = monster.description
    ? monster.description + " Review source-backed SpiritVale monster information on PlayAIG."
    : "Review source-backed information about the SpiritVale " + monster.name + " monster, including level, location evidence, drops evidence and sources on PlayAIG.";
  await emitRoute(canonicalPath, pageHtml({
    title,
    description,
    canonicalPath,
    imageAssetId: "sv-guide-beginner-combat-banner",
    type: "article",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: absolute(imagePath("sv-guide-beginner-combat-banner")),
        mainEntityOfPage: absolute(canonicalPath),
        dateModified: monster.updatedAt,
        author: { "@type": "Organization", name: siteName, url: absolute("/") }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Database", item: "/database/" },
          { "@type": "ListItem", position: 3, name: "Monsters", item: "/database/monsters/" },
          { "@type": "ListItem", position: 4, name: monster.name, item: canonicalPath }
        ]
      }
    ]
  }));
}

for (const skill of skills) {
  const canonicalPath = "/database/skills/" + skill.slug + "/";
  const title = "SpiritVale " + skill.name + " Skill Guide | PlayAIG";
  const description = skill.description
    ? skill.description + " Review source-backed SpiritVale skill information, level details and evidence on PlayAIG."
    : "Review source-backed information about the SpiritVale " + skill.name + " skill, including verified level details, class relation and sources on PlayAIG.";
  await emitRoute(canonicalPath, pageHtml({
    title,
    description,
    canonicalPath,
    imageAssetId: "sv-guide-classes-selection-banner",
    type: "article",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: absolute(imagePath("sv-guide-classes-selection-banner")),
        mainEntityOfPage: absolute(canonicalPath),
        dateModified: skill.updatedAt,
        author: { "@type": "Organization", name: siteName, url: absolute("/") }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Database", item: "/database/" },
          { "@type": "ListItem", position: 3, name: "Skills", item: "/database/skills/" },
          { "@type": "ListItem", position: 4, name: skill.name, item: canonicalPath }
        ]
      }
    ]
  }));
}

console.log("SpiritVale database static metadata output PASSED");
console.log("Database category route HTML files: " + categories.length);
console.log("Verified card entity route files: " + cards.length);
console.log("Partially verified equipment entity route files: " + equipment.length);
console.log("Partially verified monster entity route files: " + monsters.length);
console.log("Partially verified skill entity route files: " + skills.length);
