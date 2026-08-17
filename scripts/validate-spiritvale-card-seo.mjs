import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { cardTitle } from "../src/shared/card-seo.mjs";

const root = process.cwd();
const cards = JSON.parse(readFileSync(resolve(root, "data/spiritvale/cards/cards.json"), "utf8"));
const sources = JSON.parse(readFileSync(resolve(root, "data/spiritvale/sources/sources.json"), "utf8"));
const validCards = cards.filter((card) => card.id && card.slug && card.name && card.sourceIds?.length && card.sourceIds.every((sourceId) => sources.some((source) => source.id === sourceId)));
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
const sitemapPaths = new Set([...sitemap.matchAll(/<loc>\s*https:\/\/playaig\.com([^<]+)<\/loc>/gi)].map((match) => match[1]));
const fail = (message) => { throw new Error(message); };

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });
}

const htmlFiles = walk(resolve(root, "dist-playground"));
const htmlByPath = new Map();
for (const file of htmlFiles) {
  const relative = file.slice(resolve(root, "dist-playground").length).replaceAll("\\", "/") || "/index.html";
  const route = relative === "/index.html" ? "/" : relative.replace(/\/index\.html$/, "/");
  htmlByPath.set(route, readFileSync(file, "utf8"));
}

const titleByRoute = [...htmlByPath.entries()].map(([route, html]) => ({ route, title: html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "", h1: html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? "" }));
const repeatedTemplateMatches = { "Card Card": [], "Guide Guide": [], "Class Class": [], "Skill Skill": [], "Boss Boss": [] };
for (const record of titleByRoute) {
  for (const label of Object.keys(repeatedTemplateMatches)) {
    if (new RegExp(label.replace(" ", "\\s+"), "i").test(record.title) || new RegExp(label.replace(" ", "\\s+"), "i").test(record.h1)) repeatedTemplateMatches[label].push(record.route);
  }
}
if (repeatedTemplateMatches["Card Card"].length) fail("Card Card titles found: " + repeatedTemplateMatches["Card Card"].join(", "));
if (repeatedTemplateMatches["Guide Guide"].length) fail("Guide Guide titles found: " + repeatedTemplateMatches["Guide Guide"].join(", "));

const hub = htmlByPath.get("/database/cards/");
if (!hub) fail("Cards Hub static HTML is missing.");
if (!hub.includes("SpiritVale Cards Database") || !hub.includes("SpiritVale Card System Guide") || !hub.includes("/guides/card-system-guide/")) fail("Cards Hub is missing the Card System Guide contextual link.");
if (!hub.includes(validCards.length + " currently verified card entries")) fail("Cards Hub count does not match valid Card records.");
if (!sitemapPaths.has("/database/cards/")) fail("Sitemap is missing Cards Hub.");

for (const card of validCards) {
  const route = "/database/cards/" + card.slug + "/";
  const html = htmlByPath.get(route);
  if (!html) fail("Missing Card detail HTML: " + route);
  if (!sitemapPaths.has(route)) fail("Sitemap is missing Card detail: " + route);
  if (!html.includes("<title>" + cardTitle(card.name) + "</title>")) fail("Card title template mismatch: " + route);
  if (/Card\s+Card|Guide\s+Guide/i.test(html)) fail("Repeated Card/Guide template text found: " + route);
  if (!html.includes('rel="canonical" href="https://playaig.com' + route + '"')) fail("Card canonical mismatch: " + route);
  if (!html.includes('href="/database/cards/"')) fail("Card detail missing Cards Hub backlink: " + route);
  for (const href of [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]).filter((href) => href.startsWith("/"))) {
    if (!sitemapPaths.has(href) && href !== "/404/") fail("Broken static Card link " + href + " from " + route);
  }
}

const cardGuide = htmlByPath.get("/guides/card-system-guide/");
if (!cardGuide?.includes('href="/database/cards/"')) fail("Card System Guide is missing Cards Database backlink.");

console.log("SpiritVale Card SEO validation PASSED");
console.log("Verified Card records: " + validCards.length);
console.log("Card detail title collisions: Card Card=0, Guide Guide=0");
console.log("Card Hub ↔ Card System Guide links: present");
console.log("Card detail → Cards Hub backlinks: " + validCards.length + "/" + validCards.length);
console.log("Template scan: " + JSON.stringify(repeatedTemplateMatches));
