import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  approveManifest,
  CONFIDENCE_THRESHOLD,
  getReviewQueue,
  isEntityReady,
  rejectManifest,
  reviewManifest,
  validateManifestWorkflow
} from "./approval.mjs";

const cardsPath = resolve(process.cwd(), "data/spiritvale/cards/cards.json");
const hash = () => createHash("sha256").update(readFileSync(cardsPath)).digest("hex");
const base = {
  entityType: "cards",
  rawData: { sourceRecord: "dry-run" },
  extractedFields: { name: "Source-backed candidate" },
  fieldEvidence: { name: "official listing" },
  sourceLocator: "https://store.steampowered.com/app/3767850/SpiritVale/",
  extractionDate: "2026-08-10T00:00:00Z",
  operator: "approval-test"
};

const before = hash();

const invalidSource = reviewManifest({ ...base, manifestId: "manifest-invalid-source", sourceId: "source-missing" }, "reviewer");
assert.equal(invalidSource.manifest.status, "rejected");
assert.equal(invalidSource.report.valid, false);

const unauthorized = reviewManifest({ ...base, manifestId: "manifest-unauthorized-field", sourceId: "source-official-press-kit", extractedFields: { effect: "not permitted" } }, "reviewer");
assert.equal(unauthorized.manifest.status, "rejected");
assert.match(unauthorized.report.errors.join(" "), /effect is not allowed/);

const lowConfidence = reviewManifest({ ...base, manifestId: "manifest-low-confidence", sourceId: "source-official-steam-store", confidenceScore: CONFIDENCE_THRESHOLD - 1 }, "reviewer", "Needs stronger evidence");
assert.equal(lowConfidence.manifest.status, "review");
assert.equal(lowConfidence.report.approvalStatus, "review_required");
assert.equal(approveManifest(lowConfidence.manifest, "reviewer").approved, false);

const approvedReview = reviewManifest({ ...base, manifestId: "manifest-approved", sourceId: "source-official-steam-store", confidenceScore: CONFIDENCE_THRESHOLD }, "reviewer", "Evidence checked");
const approved = approveManifest(approvedReview.manifest, "reviewer", "Approved for future entity ingestion");
assert.equal(approved.manifest.status, "approved");
assert.equal(approved.entityReady, true);
assert.equal(isEntityReady(approved.manifest), true);
assert.deepEqual(getReviewQueue([lowConfidence.manifest, approved.manifest]).map((item) => item.manifestId), ["manifest-low-confidence"]);
assert.equal(hash(), before, "Approval workflow must not modify cards.json");

const rejected = rejectManifest(base, "reviewer", "Rejected in test");
assert.equal(rejected.manifest.status, "rejected");

console.log("Acquisition Approval Queue tests PASSED");
console.log("Invalid Source: rejected");
console.log("Unauthorized Field: rejected");
console.log("Low Confidence: review required");
console.log("Approved Manifest: entity ready");
console.log("cards.json writes: 0");
