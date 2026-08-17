import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createManifest, approveManifest, reviewManifest } from "./approval.mjs";

const root = resolve(import.meta.dirname, "../..");
export const communityCardsPath = resolve(root, "data/spiritvale/acquisition/community-cards.json");
export const manifestsPath = resolve(root, "data/spiritvale/acquisition/manifests.json");
export const COMMUNITY_SOURCE_ID = "source-community-spiritvale-info-cards";

const slugify = (value) => String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function communityCardToManifest(card, options = {}) {
  const slug = slugify(card.name);
  const sourceLocator = card.sourceLocator || "https://www.spiritvale.info/cards";
  const extractedFields = {
    name: card.name,
    category: card.category ?? null,
    rarity: card.rarity ?? null,
    effect: card.effect ?? null,
    description: card.description ?? "Source-listed card record; no narrative description is published by the community source.",
    notes: card.notes ?? null
  };
  const evidence = Object.fromEntries(Object.keys(extractedFields).map((field) => [field, sourceLocator]));
  return createManifest({
    manifestId: "manifest-community-" + slug,
    sourceId: options.sourceId || COMMUNITY_SOURCE_ID,
    entityType: "card",
    entityIdCandidate: "card-" + slug,
    rawData: { ...card },
    extractedFields,
    fieldEvidence: evidence,
    sourceLocator,
    extractionDate: options.extractionDate,
    operator: options.operator || "community-card-import",
    confidenceScore: options.confidenceScore ?? 82,
    status: "draft"
  });
}

export function createCommunityCardManifests(cards, options = {}) {
  return cards.map((card) => communityCardToManifest(card, options));
}

export function reviewAndApproveCommunityManifests(manifests, options = {}) {
  const reviewer = options.reviewer || "playaig-data-review";
  const reviewNotes = options.reviewNotes || "Community record checked against the registered card index; fields not published by the source remain null.";
  return manifests.map((manifest) => {
    const reviewed = reviewManifest(manifest, reviewer, reviewNotes);
    if (!reviewed.valid) return reviewed.manifest;
    const approved = approveManifest(reviewed.manifest, reviewer, reviewNotes);
    return approved.manifest;
  });
}

export function importCommunityCardManifests(options = {}) {
  const cards = JSON.parse(readFileSync(options.inputPath || communityCardsPath, "utf8"));
  const drafts = createCommunityCardManifests(cards, options);
  const manifests = reviewAndApproveCommunityManifests(drafts, options);
  if (options.outputPath !== false) writeFileSync(options.outputPath || manifestsPath, JSON.stringify(manifests, null, 2) + "\n");
  return { sourceId: options.sourceId || COMMUNITY_SOURCE_ID, drafts, manifests };
}
