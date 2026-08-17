import assert from "node:assert/strict";
import { checkFieldPermission, dryRun, loadSourceRegistry } from "./registry.mjs";

const registry = loadSourceRegistry();
const invalidSource = dryRun({ manifestId: "manifest-invalid-source", sourceId: "source-missing", entityType: "cards", rawData: {}, extractedFields: {}, extractionDate: "2026-08-10T00:00:00Z", operator: "test", status: "draft" }, registry);
assert.equal(invalidSource.validation.valid, false);
assert.match(invalidSource.validation.errors.join(" "), /unknown sourceId/);

const unauthorizedField = dryRun({ manifestId: "manifest-unauthorized-field", sourceId: "source-official-press-kit", entityType: "cards", rawData: {}, extractedFields: { effect: "not permitted" }, extractionDate: "2026-08-10T00:00:00Z", operator: "test", status: "review" }, registry);
assert.equal(unauthorizedField.validation.valid, false);
assert.match(unauthorizedField.validation.errors.join(" "), /effect is not allowed/);

const validManifest = dryRun({ manifestId: "manifest-valid-source", sourceId: "source-official-steam-store", entityType: "cards", rawData: { source: "official" }, extractedFields: { name: "future-source-backed-name" }, extractionDate: "2026-08-10T00:00:00Z", operator: "test", status: "draft" }, registry);
assert.equal(validManifest.validation.valid, true);
assert.equal(validManifest.writes.length, 0);
assert.equal(checkFieldPermission("source-official-steam-store", "effect", registry).allowed, true);
assert.equal(checkFieldPermission("source-official-press-kit", "effect", registry).allowed, false);

console.log("Source Registry tests PASSED");
console.log("Invalid Source: rejected");
console.log("Unauthorized Field: rejected");
console.log("Valid Source: accepted with zero entity writes");
