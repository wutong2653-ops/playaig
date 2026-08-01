export type SpiritValeAsset = {
  id: string;
  file: string;
  subject: string;
  category: string;
  sourceType: string;
  sourceUrl: string;
  sourceOwner: string;
  usage: string;
  alt: string;
  width: number;
  height: number;
  verified: boolean;
  notes: string;
};

export type SpiritValeClass = {
  id: string;
  slug: string;
  name: string;
  classType: "base" | "advanced";
  verificationStatus: "verified" | "partially-verified" | "unverified";
  sourceIds: string[];
  imageAssetIds: string[];
  notes: string | null;
  updatedAt: string;
  lastVerifiedAt: string | null;
};

export type SpiritValeGuide = {
  id: string;
  slug: string;
  name: string;
  guideTypeId: string;
  shortDescription: string | null;
  description: string | null;
  summary: string | null;
  intro: string | null;
  imageAssetIds: string[];
  sourceIds: string[];
  relatedClassIds: string[];
  relatedDatabaseCategoryIds: DatabaseCategoryId[];
  sections: SpiritValeGuideSection[];
  faqItems: SpiritValeGuideFaqItem[];
  relatedGuideIds: string[];
  editorialStatus: "draft" | "reviewed" | "published";
  factReviewStatus: "unverified" | "partially-verified" | "verified";
  reviewedAt: string | null;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    index: boolean;
  };
};

export type SpiritValeGuideSection = {
  id: string;
  heading: string;
  anchor: string;
  sourceIds: string[];
  contentBlocks: SpiritValeGuideContentBlock[];
};

export type SpiritValeGuideContentBlock = {
  type: "paragraph" | "list" | "callout" | "image" | "table" | "class-list";
  text: string | null;
  items: string[];
  imageAssetId: string | null;
  caption: string | null;
  sourceIds: string[];
};

export type SpiritValeGuideFaqItem = {
  id: string;
  question: string;
  answer: string;
  sourceIds: string[];
};

export type SpiritValeGuideCategory = {
  id: string;
  slug: string;
  name: string;
};

export type SpiritValeSource = {
  id: string;
  name: string;
  sourceType: string;
  url: string;
  owner: string;
};

export type DatabaseCategoryId = "skills" | "equipment" | "cards" | "artifacts" | "monsters" | "bosses" | "maps";

export type DatabaseCategory = {
  id: DatabaseCategoryId;
  label: string;
  description: string;
  path: string;
  icon: "search" | "arrowRight";
  imageAssetId: string;
};

export type SearchCategory = "guides" | "classes" | "database";

export type SearchVerificationStatus = "verified" | "partially-verified" | "unverified" | "awaiting-official-information";

export type SpiritValeSearchRecord = {
  id: string;
  title: string;
  category: SearchCategory;
  summary: string;
  verificationStatus: SearchVerificationStatus;
  url: string;
  sourceType: string;
  searchableText: string;
};
