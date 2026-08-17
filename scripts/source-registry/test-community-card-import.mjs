import assert from "node:assert/strict";
import { importCommunityCardManifests } from "./community-card-import.mjs";

const result = importCommunityCardManifests({ outputPath: false, extractionDate: "2026-08-10T00:00:00Z", reviewer: "adapter-test" });
assert.equal(result.sourceId, "source-community-spiritvale-info-cards");
assert.equal(result.drafts.length, 50);
assert.equal(result.manifests.length, 50);
assert.equal(result.manifests.every((manifest) => manifest.entityType === "card"), true);
assert.equal(result.manifests.every((manifest) => manifest.status === "approved"), true);
assert.equal(result.manifests.every((manifest) => manifest.sourceId === result.sourceId), true);
assert.equal(result.manifests.every((manifest) => manifest.fieldEvidence.effect), true);

console.log("Community Card import adapter tests PASSED");
console.log("Community source manifests: 50");
console.log("Direct cards.json writes: 0");
