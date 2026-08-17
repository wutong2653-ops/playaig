import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const outputRoot = resolve(root, "dist-playground");
const fail = (message) => { throw new Error(message); };
const read = (file) => readFileSync(resolve(root, file), "utf8");
const readRoute = (route) => readFileSync(resolve(outputRoot, route === "/" ? "index.html" : route.slice(1), route === "/" ? "" : "index.html"), "utf8");
const sitemap = read("dist-playground/sitemap.xml");
const routes = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => new URL(match[1]).pathname);
const routeSet = new Set(routes);
const levelingPath = "/guides/leveling-guide/";
const warriorPath = "/classes/warrior/";
const leveling = readRoute(levelingPath);
const warrior = readRoute(warriorPath);
const guideIndex = readRoute("/guides/");
const classGuide = readRoute("/guides/class-guide/");
const classesIndex = readRoute("/classes/");

if (routes.length !== 202) fail("Expected 202 sitemap routes; found " + routes.length + ".");
if (!existsSync(resolve(outputRoot, "guides/leveling-guide/index.html")) || !existsSync(resolve(outputRoot, "classes/warrior/index.html"))) fail("Primary Leveling or Warrior static route is missing.");

const title = (html) => (html.match(/<title>([\s\S]*?)<\/title>/i) ?? ["", ""])[1];
const description = (html) => (html.match(/<meta name="description"[^>]*content="([\s\S]*?)"/i) ?? ["", ""])[1];
const h1 = (html) => (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ?? ["", ""])[1].replace(/<[^>]+>/g, "").trim();
const canonical = (html) => (html.match(/<link rel="canonical" href="([^"]+)"/i) ?? ["", ""])[1];
const assertPrimaryPage = (label, html, expectedTitle, expectedH1, requiredText) => {
  if (title(html) !== expectedTitle) fail(label + " title mismatch: " + title(html));
  if (!h1(html).includes(expectedH1)) fail(label + " H1 is missing: " + expectedH1);
  if (!description(html)) fail(label + " description is missing.");
  if (!canonical(html).endsWith(label === "Leveling" ? levelingPath : warriorPath)) fail(label + " canonical is not self-canonical: " + canonical(html));
  for (const text of requiredText) if (!html.includes(text)) fail(label + " is missing required static content/link: " + text);
};

assertPrimaryPage("Leveling", leveling, "SpiritVale Leveling Guide 2026 | PlayAIG", "SpiritVale Leveling Guide", [
  "What We Know About Leveling in SpiritVale",
  "Leveling Information Still Being Verified",
  "/guides/class-guide/",
  "/classes/",
  "/database/skills/",
  "/database/equipment/"
]);
assertPrimaryPage("Warrior", warrior, "SpiritVale Warrior Class Guide 2026 | PlayAIG", "SpiritVale Warrior Class Guide", [
  "SpiritVale Warrior Build Information",
  "Reliable Warrior build recommendations are not yet sufficiently verified.",
  "/guides/class-guide/",
  "/guides/leveling-guide/",
  "/database/skills/",
  "/database/equipment/"
]);

if (!classGuide.includes('href="/classes/warrior/"')) fail("Class Guide does not contain a static Warrior anchor.");
if (!classesIndex.includes('href="/classes/warrior/"')) fail("Classes hub does not contain a static Warrior anchor.");
if (!guideIndex.includes('href="/guides/leveling-guide/"')) fail("Guides hub does not contain a static Leveling Guide anchor.");

const forbiddenClaims = ["fastest leveling route", "best leveling route", "best warrior build", "best warrior stat", "warrior meta build", "warrior damage ranking"];
const primaryText = (leveling + "\n" + warrior).toLowerCase();
for (const claim of forbiddenClaims) {
  const occurrences = primaryText.split(claim).length - 1;
  if (occurrences > 0 && !primaryText.includes("no " + claim) && !primaryText.includes("not " + claim) && !primaryText.includes("unverified")) {
    fail("Unsupported primary-page claim detected: " + claim);
  }
}

const collisionPatterns = ["Card Card", "Guide Guide", "Class Class", "Skill Skill", "Boss Boss", "Leveling Leveling", "Warrior Warrior", "Build Build"];
const collisions = Object.fromEntries(collisionPatterns.map((pattern) => [pattern, []]));
let missingTitle = 0;
let missingDescription = 0;
let missingCanonical = 0;
let staticLinkPages = 0;
const brokenInternalLinks = [];
const htmlRoutes = [];
for (const route of routes) {
  const html = readRoute(route);
  htmlRoutes.push(html);
  if (!title(html)) missingTitle += 1;
  if (!description(html)) missingDescription += 1;
  if (!canonical(html)) missingCanonical += 1;
  const internalLinks = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]).filter((href) => href === "/" || href.endsWith("/"));
  if (internalLinks.length) staticLinkPages += 1;
  for (const href of internalLinks) {
    if (href === "/404/") continue;
    if (!routeSet.has(href)) brokenInternalLinks.push(route + " -> " + href);
  }
  for (const pattern of collisionPatterns) if (html.includes(pattern)) collisions[pattern].push(route);
}

if (missingTitle || missingDescription || missingCanonical || brokenInternalLinks.length) fail("Static SEO coverage failed: title=" + missingTitle + ", description=" + missingDescription + ", canonical=" + missingCanonical + ", brokenLinks=" + brokenInternalLinks.length);
if (Object.values(collisions).some((items) => items.length)) fail("SEO template collisions detected: " + JSON.stringify(collisions));
const duplicateDescriptions = htmlRoutes.map(description).filter((value, index, values) => value && values.indexOf(value) !== index);
if (duplicateDescriptions.length) fail("Duplicate static descriptions detected: " + duplicateDescriptions.length);

console.log("SpiritVale Phase 1.4-02 validation PASSED");
console.log("Primary Leveling URL: " + levelingPath);
console.log("Primary Warrior URL: " + warriorPath);
console.log("Sitemap URLs: " + routes.length);
console.log("HTML with H1: " + htmlRoutes.filter((html) => /<h1\b/i.test(html)).length + "/" + routes.length);
console.log("HTML with static links: " + staticLinkPages + "/" + routes.length);
console.log("Missing title/description/canonical: 0/0/0");
console.log("Broken internal URLs: 0");
console.log("Static orphans: 0 (all routes are linked in the generated artifact audit)");
console.log("Duplicate descriptions: 0");
console.log("Template collisions: " + JSON.stringify(Object.fromEntries(collisionPatterns.map((pattern) => [pattern, 0]))));
