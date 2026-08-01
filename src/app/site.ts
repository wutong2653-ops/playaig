import { classVisualAssetId, resolveSpiritValeAsset, type DatabaseCategory, type DatabaseCategoryId, type SpiritValeClass, type SpiritValeGuide } from "../data";

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
  title: "SpiritVale Database",
  description: "Browse officially verified SpiritVale game data including skills, equipment, cards, artifacts, monsters, bosses and maps.",
  canonicalPath: "/database/"
} as const;

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
  document.head.querySelectorAll("script[data-spiritvale-jsonld]").forEach((element) => element.remove());
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
  const cover = resolveSpiritValeAsset(guide.imageAssetIds[0]);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.seo.title,
    description: guide.seo.description,
    image: cover ? absoluteUrl(cover.src) : undefined,
    mainEntityOfPage: absoluteUrl(guide.seo.canonicalPath),
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: siteName, url: siteOrigin + "/" }
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  return [article, breadcrumbJsonLd(guide.name, guide.seo.canonicalPath), faq];
}

export function applyGuideMetadata(guide: SpiritValeGuide) {
  applyPageMetadata({
    title: guide.seo.title,
    description: guide.seo.description,
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
  const title = "SpiritVale " + gameClass.name + " Class — Officially Confirmed Base Class";
  const description = gameClass.name + " is an officially confirmed SpiritVale base class. View first-party-source information and future verified updates.";
  const cover = resolveSpiritValeAsset(classVisualAssetId);
  return { canonicalPath, description, title, imageAssetId: classVisualAssetId, cover };
}

export function classStructuredData(gameClass: SpiritValeClass) {
  const metadata = classMetadata(gameClass);
  return [
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
  return {
    title: "SpiritVale " + category.label + " Database — Verified Game Data",
    description: "Browse officially verified SpiritVale " + singular + " data. No verified entries are currently available.",
    canonicalPath: category.path,
    imageAssetId: category.imageAssetId
  };
}

export function databaseCategoryStructuredData(category: DatabaseCategory) {
  const metadata = databaseCategoryMetadata(category);
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: metadata.title,
      description: metadata.description,
      url: absoluteUrl(metadata.canonicalPath)
    },
    databaseBreadcrumbJsonLd(category.label, metadata.canonicalPath)
  ];
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

export function applyDatabaseIndexMetadata(categoryIds: DatabaseCategoryId[]) {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: databaseIndexMetadata.title,
    description: databaseIndexMetadata.description,
    url: absoluteUrl(databaseIndexMetadata.canonicalPath),
    hasPart: categoryIds.map((id) => ({ "@type": "CollectionPage", identifier: id }))
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Database", item: absoluteUrl("/database/") }
    ]
  };
  applyPageMetadata({
    title: databaseIndexMetadata.title,
    description: databaseIndexMetadata.description,
    canonicalPath: databaseIndexMetadata.canonicalPath,
    imageAssetId: "sv-home-hero",
    structuredData: [collection, breadcrumb]
  });
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
