import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/analytics/googleAnalytics.ts", import.meta.url), "utf8");
const main = await readFile(new URL("../src/main.tsx", import.meta.url), "utf8");

assert.doesNotMatch(source, /dataLayer\.push\(args\)/, "GA4 must not push rest-parameter Arrays.");
assert.doesNotMatch(source, /dataLayer\.push\(\[\.\.\.args\]\)/, "GA4 must not convert Arguments into an Array.");
assert.match(source, /dataLayer\.push\(arguments\)/, "GA4 must push the native Arguments object.");
assert.match(source, /function gtag\(\)/, "GA4 must declare a standard function stub.");
assert.equal((source.match(/script\[data-ga4-id=/g) ?? []).length, 1, "Google Tag script injection must have one implementation.");
assert.equal((source.match(/window\.gtag\("config"/g) ?? []).length, 1, "GA4 config must execute in one place.");
assert.match(source, /send_page_view: false/, "Initial page_view must be explicit.");
assert.match(source, /window\.gtag\("event", "page_view"/, "Initial and SPA page_view events must be explicit.");
assert.match(source, /send_to: MEASUREMENT_ID/, "testGA must target the configured Measurement ID.");
assert.match(source, /\["pushState", "replaceState"\]/, "SPA history navigation must be tracked.");
assert.match(source, /window\.addEventListener\("popstate"/, "SPA popstate navigation must be tracked.");
assert.match(source, /if \(locationKey === lastTrackedLocation\)/, "Identical route tracking must be de-duplicated.");
assert.match(source, /!MEASUREMENT_ID \|\| !GA4_ID_PATTERN\.test\(MEASUREMENT_ID\)/, "Missing or invalid Measurement IDs must safely disable GA4.");
assert.equal((main.match(/initializeGoogleAnalytics\(\)/g) ?? []).length, 1, "Application boot must initialize GA4 once.");

console.log("GA4 integration static validation PASSED");
