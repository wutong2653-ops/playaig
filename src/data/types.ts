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

export type SpiritValeCard = {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  rarity: string | null;
  effect: string | null;
  description: string | null;
  sourceIds: string[];
  imageAssetId: string | null;
  verifiedAt: string | null;
  notes: string | null;
  relatedGuideIds: string[];
};

export type SpiritValeEquipment = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  category: string | null;
  stats: string[];
  effect: string | null;
  location: string | null;
  drop: string | null;
  status: "draft" | "review" | "published" | "archived";
  verificationStatus: "verified" | "partially-verified" | "unverified";
  sourceIds: string[];
  gameVersionId: string | null;
  imageAssetIds: string[];
  createdAt: string;
  updatedAt: string;
  lastVerifiedAt: string | null;
  notes: string | null;
  relatedGuideIds: string[];
  equipmentTypeId: string | null;
  weaponTypeId: string | null;
  rarityId: string | null;
  requiredLevel: number | null;
  allowedClassIds: string[];
  baseStats: Array<Record<string, unknown>>;
  bonusStats: Array<Record<string, unknown>>;
  cardSlotCount: number | null;
  setId: string | null;
  dropSourceIds: string[];
  craftingRecipeId: string | null;
  vendorIds: string[];
};

export type SpiritValeMonster = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  status: "draft" | "review" | "published" | "archived";
  verificationStatus: "verified" | "partially-verified" | "unverified";
  sourceIds: string[];
  gameVersionId: string | null;
  imageAssetIds: string[];
  createdAt: string;
  updatedAt: string;
  verifiedAt: string;
  lastVerifiedAt: string | null;
  notes: string | null;
  monsterTypeId: string | null;
  mapIds: string[];
  level: number | null;
  location: string[];
  elementIds: string[];
  stats: Array<Record<string, unknown>>;
  abilities: Array<Record<string, unknown>>;
  weaknessIds: string[];
  drop: string[];
  dropIds: string[];
  cardDropIds: string[];
  spawnNotes: string | null;
  relatedGuideIds: string[];
};

export type SpiritValeSkill = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  status: "draft" | "review" | "published" | "archived";
  verificationStatus: "verified" | "partially-verified" | "unverified";
  sourceIds: string[];
  gameVersionId: string | null;
  imageAssetIds: string[];
  createdAt: string;
  updatedAt: string;
  lastVerifiedAt: string | null;
  notes: string | null;
  classIds: string[];
  skillTypeIds: string[];
  elementIds: string[];
  levelRequirement: number | null;
  jobLevelRequirement: number | null;
  maxLevel: number | null;
  cooldownSeconds: number | null;
  resourceCost: number | string | null;
  effectText: string | null;
  scaling: Array<Record<string, unknown>>;
  prerequisiteSkillIds: string[];
  nextSkillIds: string[];
  relatedGuideIds: string[];
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
