import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { manifestToCardEntity, processApprovedCardManifests } from "./card-pipeline.mjs";

const cardsPath = "data/spiritvale/cards/cards.json";
const hash = () => createHash("sha256").update(readFileSync(cardsPath)).digest("hex");
const before = hash();
const approvedManifest = {
  manifestId: "manifest-pipeline-test",
  sourceId: "source-official-steam-store",
  entityType: "card",
  entityIdCandidate: "card-pipeline-test",
  rawData: { test: true },
  extractedFields: { name: "Verified Test Card", category: "officially documented category", rarity: null, effect: null, description: null, imageAssetId: null, notes: "test only" },
  fieldEvidence: { name: "official source test fixture" },
  sourceLocator: "https://store.steampowered.com/app/3767850/SpiritVale/",
  extractionDate: "2026-08-10T00:00:00Z",
  operator: "pipeline-test",
  confidenceScore: 90,
  status: "approved",
  reviewer: "test-reviewer",
  reviewDate: "2026-08-10T00:00:00Z",
  reviewNotes: "test fixture; never written"
};
const converted = manifestToCardEntity(approvedManifest);
assert.equal(converted.errors.length, 0);
assert.equal(converted.record.id, "card-pipeline-test");
assert.equal(converted.record.sourceIds[0], "source-official-steam-store");
assert.equal(converted.record.relatedGuideIds.length, 0);

const result = processApprovedCardManifests([
  { ...approvedManifest, status: "draft" },
  { ...approvedManifest, status: "review" },
  { ...approvedManifest, status: "rejected" }
]);
assert.equal(result.generated.length, 0);
assert.equal(result.writes, 0);
assert.equal(hash(), before, "Pipeline test fixtures must not write cards.json");

console.log("Card Entity pipeline tests PASSED");
console.log("Approved fixture conversion: PASS");
console.log("Draft/review/rejected publication gate: PASS");
console.log("cards.json writes: 0");
