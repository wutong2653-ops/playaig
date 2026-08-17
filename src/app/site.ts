import { classVisualAssetId, resolveSpiritValeAsset, type DatabaseCategory, type DatabaseCategoryId, type SpiritValeCard, type SpiritValeClass, type SpiritValeEquipment, type SpiritValeGuide, type SpiritValeMonster, type SpiritValeSkill } from "../data";
import { getClassLandingContent, getDatabaseLandingContent, getGuideLandingContent } from "./seoLandingContent";
import { cardDescription, cardTitle } from "../shared/card-seo.mjs";

export const siteOrigin = "https://playaig.com";
export const siteName = "PlayAIG";
export const siteDescription = "PlayAIG provides verified game wikis, guides, classes and databases based on official sources.";
const absoluteUrl = (path: string) => new URL(path, siteOrigin).href;

export const homepageMetadata = {
  title: "PlayAIG — Verified Game Wikis, Guides and Databases",
  description: siteDescription,
  canonicalPath: "/",
  twitterCard: "summary_large_image"
} as const;

export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteOrigin + "/",
  description: homepageMetadata.description
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteOrigin + "/"
} as const;

export function applyHomepageMetadata() {
  applyPageMetadata({
    title: homepageMetadata.title,
    description: homepageMetadata.description,
    canonicalPath: homepageMetadata.canonicalPath,
    imageAssetId: "sv-home-hero",
    structuredData: [organizationJsonLd, homepageJsonLd]
  });
}

export const guidesIndexMetadata = {
  title: "SpiritVale Guides — Beginner Tips, Classes and Game Systems",
  description: "Browse SpiritVale beginner, class, leveling, stats and card system guides based on verified official game information.",
  canonicalPath: "/guides/"
} as const;

export const classesIndexMetadata = {
  title: "SpiritVale Classes — Explore the Seven Base Classes",
  description: "Explore all officially confirmed SpiritVale base classes and follow future verified class updates.",
  canonicalPath: "/classes/"
} as const;

export const databaseIndexMetadata = {
  title: "SpiritVale Database — Verified Game Data | PlayAIG",
  description: "Explore the SpiritVale Database for verified skills, equipment, cards, artifacts, monsters, bosses and maps. New entries appear as official information is confirmed.",
  canonicalPath: "/database/"
} as const;

export const databaseIndexFaqItems = [
  {
    question: "What is the SpiritVale Database?",
    answer: "The SpiritVale Database is a reference index for SpiritVale information that can be tied to registered official sources."
  },
  {
    question: "What information will the SpiritVale Database include?",
    answer: "The index covers skills, equipment, cards, artifacts, monsters, bosses and maps. Individual entries appear only after their details are officially confirmed."
  },
  {
    question: "How do I use the SpiritVale Database?",
    answer: "Choose a category, check its verification status, and open an entry when one is available. Categories marked Data Collection In Progress do not yet contain verified records."
  },
  {
    question: "Are SpiritVale Database entries verified?",
    answer: "Entries are added only when their details can be tied to a registered official SpiritVale source. Information will be updated as official details are confirmed."
  },
  {
    question: "How often is the SpiritVale Database updated?",
    answer: "There is no fixed public update schedule. The database is reviewed when official SpiritVale sources publish information that can be verified."
  },
  {
    question: "Is the SpiritVale Database an official game website?",
    answer: "PlayAIG is an independent fan resource. It uses registered official sources for verification and is not affiliated with or endorsed by Baikun Interactive."
  }
] as const;

function setMetaAttribute(selector: string, attribute: "name" | "property", value: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector) ?? document.head.appendChild(document.createElement("meta"));
  element.setAttribute(attribute, value);
  element.content = content;
}

function setCanonical(canonicalPath: string) {
  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.head.appendChild(document.createElement("link"));
  canonical.rel = "canonical";
  canonical.href = absoluteUrl(canonicalPath);
  return canonical.href;
}

function setStructuredData(records: Record<string, unknown>[]) {
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((element) => element.remove());
  records.forEach((record, index) => {
    const script = document.createElement("script");
    script.dataset.spiritvaleJsonld = String(index);
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(record);
    document.head.appendChild(script);
  });
}

export type MetadataInput = {
  canonicalPath: string;
  description: string;
  imageAssetId: string;
  structuredData: Record<string, unknown>[];
  title: string;
  type?: "article" | "website";
  robots?: "index,follow" | "noindex,follow";
};

export function applyPageMetadata({
  canonicalPath,
  description,
  imageAssetId,
  structuredData,
  title,
  type = "website",
  robots = "index,follow"
}: MetadataInput) {
  document.title = title;
  const asset = resolveSpiritValeAsset(imageAssetId);
  const image = asset ? absoluteUrl(asset.src) : "";
  setMetaAttribute('meta[name="description"]', "name", "description", description);
  setMetaAttribute('meta[property="og:title"]', "property", "og:title", title);
  setMetaAttribute('meta[property="og:description"]', "property", "og:description", description);
  setMetaAttribute('meta[property="og:type"]', "property", "og:type", type);
  setMetaAttribute('meta[property="og:site_name"]', "property", "og:site_name", siteName);
  setMetaAttribute('meta[property="og:url"]', "property", "og:url", absoluteUrl(canonicalPath));
  setMetaAttribute('meta[property="twitter:card"]', "property", "twitter:card", "summary_large_image");
  setMetaAttribute('meta[name="twitter:site"]', "name", "twitter:site", siteName);
  setMetaAttribute('meta[name="robots"]', "name", "robots", robots);
  if (asset) {
    setMetaAttribute('meta[property="og:image"]', "property", "og:image", image);
    setMetaAttribute('meta[property="og:image:alt"]', "property", "og:image:alt", asset.alt);
    setMetaAttribute('meta[property="twitter:image"]', "property", "twitter:image", image);
  }
  setCanonical(canonicalPath);
  setStructuredData(structuredData);
}

function breadcrumbJsonLd(name: string, canonicalPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides/") },
      { "@type": "ListItem", position: 3, name, item: absoluteUrl(canonicalPath) }
    ]
  };
}

export function guideStructuredData(guide: SpiritValeGuide) {
  const landing = getGuideLandingContent(guide.slug);
  const title = landing?.title ?? guide.seo.title;
  const description = landing?.description ?? guide.seo.description;
  const faqItems = landing ? [...guide.faqItems, ...landing.faq.map((item) => ({ ...item, sourceIds: guide.sourceIds }))] : guide.faqItems;
  const cover = resolveSpiritValeAsset(guide.imageAssetIds[0]);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: cover ? absoluteUrl(cover.src) : undefined,
    mainEntityOfPage: absoluteUrl(guide.seo.canonicalPath),
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: siteName, url: siteOrigin + "/" }
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  return [article, breadcrumbJsonLd(guide.name, guide.seo.canonicalPath), faq];
}

export function applyGuideMetadata(guide: SpiritValeGuide) {
  const landing = getGuideLandingContent(guide.slug);
  applyPageMetadata({
    title: landing?.title ?? guide.seo.title,
    description: landing?.description ?? guide.seo.description,
    canonicalPath: guide.seo.canonicalPath,
    imageAssetId: guide.imageAssetIds[0],
    structuredData: guideStructuredData(guide),
    type: "article"
  });
}

export function applyGuidesIndexMetadata(guideIds: string[]) {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: guidesIndexMetadata.title,
    description: guidesIndexMetadata.description,
    url: absoluteUrl(guidesIndexMetadata.canonicalPath),
    hasPart: guideIds.map((id) => ({ "@type": "Article", identifier: id }))
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides/") }
    ]
  };
  applyPageMetadata({
    title: guidesIndexMetadata.title,
    description: guidesIndexMetadata.description,
    canonicalPath: guidesIndexMetadata.canonicalPath,
    imageAssetId: "sv-guide-beginner-combat-banner",
    structuredData: [collection, breadcrumb]
  });
}

function classBreadcrumbJsonLd(name: string, canonicalPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Classes", item: absoluteUrl("/classes/") },
      { "@type": "ListItem", position: 3, name, item: absoluteUrl(canonicalPath) }
    ]
  };
}

export function classMetadata(gameClass: SpiritValeClass) {
  const canonicalPath = "/classes/" + gameClass.slug + "/";
  const landing = getClassLandingContent(gameClass.slug);
  const title = landing?.title ?? "SpiritVale " + gameClass.name + " Class — Officially Confirmed Base Class";
  const description = landing?.description ?? gameClass.name + " is an officially confirmed SpiritVale base class. View first-party-source information and future verified updates.";
  const cover = resolveSpiritValeAsset(classVisualAssetId);
  return { canonicalPath, description, title, imageAssetId: classVisualAssetId, cover };
}

export function classStructuredData(gameClass: SpiritValeClass) {
  const metadata = classMetadata(gameClass);
  const records = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      image: metadata.cover ? absoluteUrl(metadata.cover.src) : undefined,
      mainEntityOfPage: absoluteUrl(metadata.canonicalPath),
      dateModified: gameClass.updatedAt,
      author: { "@type": "Organization", name: siteName, url: siteOrigin + "/" }
    },
    classBreadcrumbJsonLd(gameClass.name, metadata.canonicalPath)
  ];
  const landing = getClassLandingContent(gameClass.slug);
  return landing ? [...records, {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  }] : records;
}

export function applyClassMetadata(gameClass: SpiritValeClass) {
  const metadata = classMetadata(gameClass);
  applyPageMetadata({
    title: metadata.title,
    description: metadata.description,
    canonicalPath: metadata.canonicalPath,
    imageAssetId: metadata.imageAssetId,
    structuredData: classStructuredData(gameClass),
    type: "article"
  });
}

export function applyClassesIndexMetadata(classIds: string[]) {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: classesIndexMetadata.title,
    description: classesIndexMetadata.description,
    url: absoluteUrl(classesIndexMetadata.canonicalPath),
    hasPart: classIds.map((id) => ({ "@type": "Article", identifier: id }))
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Classes", item: absoluteUrl("/classes/") }
    ]
  };
  applyPageMetadata({
    title: classesIndexMetadata.title,
    description: classesIndexMetadata.description,
    canonicalPath: classesIndexMetadata.canonicalPath,
    imageAssetId: classVisualAssetId,
    structuredData: [collection, breadcrumb]
  });
}

function databaseBreadcrumbJsonLd(name: string, canonicalPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Database", item: absoluteUrl("/database/") },
      { "@type": "ListItem", position: 3, name, item: absoluteUrl(canonicalPath) }
    ]
  };
}

export function databaseCategoryMetadata(category: DatabaseCategory) {
  const singularByCategory: Record<DatabaseCategory["id"], string> = {
    skills: "skill",
    equipment: "equipment",
    cards: "card",
    artifacts: "artifact",
    monsters: "monster",
    bosses: "boss",
    maps: "map"
  };
  const singular = singularByCategory[category.id];
  const landing = getDatabaseLandingContent(category.id);
  return {
    title: landing?.title ?? "SpiritVale " + category.label + " Database — Verified Game Data",
    description: landing?.description ?? "Browse officially verified SpiritVale " + singular + " data. No verified entries are currently available.",
    canonicalPath: category.path,
    imageAssetId: category.imageAssetId
  };
}

export function databaseCategoryStructuredData(category: DatabaseCategory) {
  const metadata = databaseCategoryMetadata(category);
  const records = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: metadata.title,
      description: metadata.description,
      url: absoluteUrl(metadata.canonicalPath)
    },
    databaseBreadcrumbJsonLd(category.label, metadata.canonicalPath)
  ];
  const landing = getDatabaseLandingContent(category.id);
  return landing ? [...records, {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  }] : records;
}

export function applyDatabaseCategoryMetadata(category: DatabaseCategory) {
  const metadata = databaseCategoryMetadata(category);
  applyPageMetadata({
    title: metadata.title,
    description: metadata.description,
    canonicalPath: metadata.canonicalPath,
    imageAssetId: metadata.imageAssetId,
    structuredData: databaseCategoryStructuredData(category)
  });
}

function cardBreadcrumbJsonLd(name: string, canonicalPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Database", item: absoluteUrl("/database/") },
      { "@type": "ListItem", position: 3, name: "Cards", item: absoluteUrl("/database/cards/") },
      { "@type": "ListItem", position: 4, name, item: absoluteUrl(canonicalPath) }
    ]
  };
}

export function cardMetadata(card: SpiritValeCard) {
  const canonicalPath = "/database/cards/" + card.slug + "/";
  const title = cardTitle(card.name);
  const description = cardDescription(card.name);
  return { canonicalPath, description, title, imageAssetId: card.imageAssetId ?? "sv-guide-cards-build-banner" };
}

export function cardStructuredData(card: SpiritValeCard) {
  const metadata = cardMetadata(card);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      image: resolveSpiritValeAsset(metadata.imageAssetId) ? absoluteUrl(resolveSpiritValeAsset(metadata.imageAssetId)!.src) : undefined,
      mainEntityOfPage: absoluteUrl(metadata.canonicalPath),
      author: { "@type": "Organization", name: siteName, url: siteOrigin + "/" }
    },
    cardBreadcrumbJsonLd(card.name, metadata.canonicalPath)
  ];
}

export function applyCardMetadata(card: SpiritValeCard) {
  const metadata = cardMetadata(card);
  applyPageMetadata({
    title: metadata.title,
    description: metadata.description,
    canonicalPath: metadata.canonicalPath,
    imageAssetId: metadata.imageAssetId,
    structuredData: cardStructuredData(card),
    type: "article"
  });
}

function equipmentBreadcrumbJsonLd(name: string, canonicalPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Database", item: absoluteUrl("/database/") },
      { "@type": "ListItem", position: 3, name: "Equipment", item: absoluteUrl("/database/equipment/") },
      { "@type": "ListItem", position: 4, name, item: absoluteUrl(canonicalPath) }
    ]
  };
}

export function equipmentMetadata(equipment: SpiritValeEquipment) {
  const canonicalPath = "/database/equipment/" + equipment.slug + "/";
  const title = "SpiritVale " + equipment.name + " Equipment Guide | PlayAIG";
  const description = equipment.description
    ? equipment.description + " Review source-backed SpiritVale equipment information on PlayAIG."
    : "Review source-backed information about the SpiritVale " + equipment.name + " equipment, including stats, effects, acquisition evidence and sources on PlayAIG.";
  return { canonicalPath, description, title, imageAssetId: "sv-guide-stats-crafting-banner" };
}

export function equipmentStructuredData(equipment: SpiritValeEquipment) {
  const metadata = equipmentMetadata(equipment);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      image: resolveSpiritValeAsset(metadata.imageAssetId) ? absoluteUrl(resolveSpiritValeAsset(metadata.imageAssetId)!.src) : undefined,
      mainEntityOfPage: absoluteUrl(metadata.canonicalPath),
      dateModified: equipment.updatedAt,
      author: { "@type": "Organization", name: siteName, url: siteOrigin + "/" }
    },
    equipmentBreadcrumbJsonLd(equipment.name, metadata.canonicalPath)
  ];
}

export function applyEquipmentMetadata(equipment: SpiritValeEquipment) {
  const metadata = equipmentMetadata(equipment);
  applyPageMetadata({
    title: metadata.title,
    description: metadata.description,
    canonicalPath: metadata.canonicalPath,
    imageAssetId: metadata.imageAssetId,
    structuredData: equipmentStructuredData(equipment),
    type: "article"
  });
}

function monsterBreadcrumbJsonLd(name: string, canonicalPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Database", item: absoluteUrl("/database/") },
      { "@type": "ListItem", position: 3, name: "Monsters", item: absoluteUrl("/database/monsters/") },
      { "@type": "ListItem", position: 4, name, item: absoluteUrl(canonicalPath) }
    ]
  };
}

export function monsterMetadata(monster: SpiritValeMonster) {
  const canonicalPath = "/database/monsters/" + monster.slug + "/";
  const title = "SpiritVale " + monster.name + " Monster Guide | PlayAIG";
  const description = monster.description
    ? monster.description + " Review source-backed SpiritVale monster information on PlayAIG."
    : "Review source-backed information about the SpiritVale " + monster.name + " monster, including level, location evidence, drops evidence and sources on PlayAIG.";
  return { canonicalPath, description, title, imageAssetId: "sv-guide-beginner-combat-banner" };
}

export function monsterStructuredData(monster: SpiritValeMonster) {
  const metadata = monsterMetadata(monster);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      image: resolveSpiritValeAsset(metadata.imageAssetId) ? absoluteUrl(resolveSpiritValeAsset(metadata.imageAssetId)!.src) : undefined,
      mainEntityOfPage: absoluteUrl(metadata.canonicalPath),
      dateModified: monster.updatedAt,
      author: { "@type": "Organization", name: siteName, url: siteOrigin + "/" }
    },
    monsterBreadcrumbJsonLd(monster.name, metadata.canonicalPath)
  ];
}

export function applyMonsterMetadata(monster: SpiritValeMonster) {
  const metadata = monsterMetadata(monster);
  applyPageMetadata({
    title: metadata.title,
    description: metadata.description,
    canonicalPath: metadata.canonicalPath,
    imageAssetId: metadata.imageAssetId,
    structuredData: monsterStructuredData(monster),
    type: "article"
  });
}

function skillBreadcrumbJsonLd(name: string, canonicalPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Database", item: absoluteUrl("/database/") },
      { "@type": "ListItem", position: 3, name: "Skills", item: absoluteUrl("/database/skills/") },
      { "@type": "ListItem", position: 4, name, item: absoluteUrl(canonicalPath) }
    ]
  };
}

export function skillMetadata(skill: SpiritValeSkill) {
  const canonicalPath = "/database/skills/" + skill.slug + "/";
  const title = "SpiritVale " + skill.name + " Skill Guide | PlayAIG";
  const description = skill.description
    ? skill.description + " Review source-backed SpiritVale skill information, level details and evidence on PlayAIG."
    : "Review source-backed information about the SpiritVale " + skill.name + " skill, including verified level details, class relation and sources on PlayAIG.";
  return { canonicalPath, description, title, imageAssetId: "sv-guide-classes-selection-banner" };
}

export function skillStructuredData(skill: SpiritValeSkill) {
  const metadata = skillMetadata(skill);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      image: resolveSpiritValeAsset(metadata.imageAssetId) ? absoluteUrl(resolveSpiritValeAsset(metadata.imageAssetId)!.src) : undefined,
      mainEntityOfPage: absoluteUrl(metadata.canonicalPath),
      dateModified: skill.updatedAt,
      author: { "@type": "Organization", name: siteName, url: siteOrigin + "/" }
    },
    skillBreadcrumbJsonLd(skill.name, metadata.canonicalPath)
  ];
}

export function applySkillMetadata(skill: SpiritValeSkill) {
  const metadata = skillMetadata(skill);
  applyPageMetadata({
    title: metadata.title,
    description: metadata.description,
    canonicalPath: metadata.canonicalPath,
    imageAssetId: metadata.imageAssetId,
    structuredData: skillStructuredData(skill),
    type: "article"
  });
}

export function applyDatabaseIndexMetadata(categoryIds: DatabaseCategoryId[]) {
  applyPageMetadata({
    title: databaseIndexMetadata.title,
    description: databaseIndexMetadata.description,
    canonicalPath: databaseIndexMetadata.canonicalPath,
    imageAssetId: "sv-home-hero",
    structuredData: databaseIndexStructuredData(categoryIds)
  });
}

export function databaseIndexStructuredData(categoryIds: DatabaseCategoryId[]) {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: databaseIndexMetadata.title,
    description: databaseIndexMetadata.description,
    url: absoluteUrl(databaseIndexMetadata.canonicalPath),
    hasPart: categoryIds.map((id) => ({ "@type": "CollectionPage", identifier: id }))
  };
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: databaseIndexMetadata.title,
    description: databaseIndexMetadata.description,
    url: absoluteUrl(databaseIndexMetadata.canonicalPath),
    isPartOf: { "@type": "WebSite", name: siteName, url: absoluteUrl("/") }
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Database", item: absoluteUrl("/database/") }
    ]
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: databaseIndexFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  return [collection, webpage, breadcrumb, faq];
}

export function applySearchMetadata(query: string) {
  applyPageMetadata({
    title: query ? "Search SpiritVale: " + query : "Search SpiritVale",
    description: "Search the currently indexed and verified SpiritVale Guides, Classes, and Database categories.",
    canonicalPath: "/search/",
    imageAssetId: "sv-home-hero",
    structuredData: [],
    robots: "noindex,follow"
  });
}

export function applyNotFoundMetadata() {
  applyPageMetadata({
    title: "Page not found | PlayAIG",
    description: "The requested SpiritVale page is unavailable.",
    canonicalPath: "/404/",
    imageAssetId: "sv-home-hero",
    structuredData: [],
    robots: "noindex,follow"
  });
}
