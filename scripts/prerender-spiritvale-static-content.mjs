import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { mkdir } from "node:fs/promises";
import { cardDescription } from "../src/shared/card-seo.mjs";

const root = process.cwd();
const outputRoot = resolve(root, "dist-playground");
const siteUrl = (process.env.SPIRITVALE_SITE_URL || process.env.SITE_URL || process.env.BASE_URL || process.env.SITE_ORIGIN || "https://playaig.com").replace(/\/$/, "");
const absolute = (path) => new URL(path, siteUrl).href;

const guides = JSON.parse(await readFile(resolve(root, "data/spiritvale/guides/guides.json"), "utf8"));
const classes = JSON.parse(await readFile(resolve(root, "data/spiritvale/classes/classes.json"), "utf8"));
const cards = JSON.parse(await readFile(resolve(root, "data/spiritvale/cards/cards.json"), "utf8"));
const equipment = JSON.parse(await readFile(resolve(root, "data/spiritvale/equipment/equipment.json"), "utf8"));
const monsters = JSON.parse(await readFile(resolve(root, "data/spiritvale/monsters/monsters.json"), "utf8"));
const skills = JSON.parse(await readFile(resolve(root, "data/spiritvale/skills/skills.json"), "utf8"));
const sources = JSON.parse(await readFile(resolve(root, "data/spiritvale/sources/sources.json"), "utf8"));
const sourceIds = new Set(sources.map((source) => source.id));
const baseClasses = classes.filter((gameClass) => gameClass.classType === "base");
const validCards = cards.filter((card) => card.id && card.slug && card.name && card.sourceIds?.length && card.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const validEquipment = equipment.filter((item) => item.id && item.slug && item.name && item.status === "published" && item.sourceIds?.length && item.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const validMonsters = monsters.filter((monster) => monster.id && monster.slug && monster.name && monster.status === "published" && monster.sourceIds?.length && monster.sourceIds.every((sourceId) => sourceIds.has(sourceId)));
const validSkills = skills.filter((skill) => skill.id && skill.slug && skill.name && skill.status === "published" && skill.sourceIds?.length && skill.sourceIds.every((sourceId) => sourceIds.has(sourceId)));

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function link(path, label) {
  return '<a href="' + escapeHtml(path) + '">' + escapeHtml(label) + "</a>";
}

function list(items) {
  return "<ul>" + items.map((item) => "<li>" + item + "</li>").join("") + "</ul>";
}

function globalNav() {
  return "<nav aria-label=\"Primary navigation\"><ul>" + [
    link("/", "Home"),
    link("/guides/", "Guides"),
    link("/classes/", "Classes"),
    link("/guides/class-guide/", "Build guidance"),
    link("/database/", "Database"),
    link("/database/bosses/", "Bosses")
  ].map((item) => "<li>" + item + "</li>").join("") + "</ul></nav>";
}

function shell(title, intro, content, extraLinks = []) {
  const related = extraLinks.length ? "<section><h2>Related SpiritVale pages</h2>" + list(extraLinks) + "</section>" : "";
  return '<main id="main-content" class="prerendered-seo-content"><div class="sv-container">' + globalNav() + "<header><h1>" + escapeHtml(title) + "</h1><p>" + escapeHtml(intro) + "</p></header>" + content + related + "</div></main>";
}

function guideLinks() {
  return guides.map((guide) => link(guide.seo.canonicalPath, guide.name));
}

function classLinks() {
  return baseClasses.map((gameClass) => link("/classes/" + gameClass.slug + "/", gameClass.name));
}

const categoryInfo = [
  ["skills", "Skills"], ["equipment", "Equipment"], ["cards", "Cards"], ["artifacts", "Artifacts"], ["monsters", "Monsters"], ["bosses", "Bosses"], ["maps", "Maps"]
];

function databaseLinks() {
  return categoryInfo.map(([id, label]) => link("/database/" + id + "/", label + " Database"));
}

function entityLinks(category, records) {
  return records.map((record) => link("/database/" + category + "/" + record.slug + "/", record.name));
}

function bodyForPath(path) {
  if (path === "/") {
    return shell("SpiritVale Wiki, Guides and Game Database", "PlayAIG is a source-led SpiritVale reference for verified guides, classes and database records.", "<section><h2>Start with verified references</h2><p>Use the guide, class and database hubs to find source-backed information and clearly marked unknowns.</p>" + list([link("/guides/", "Explore SpiritVale Guides"), link("/classes/", "Browse SpiritVale Classes"), link("/database/", "Open the SpiritVale Database")]) + "</section>", [link("/guides/beginner-guide/", "Beginner Guide"), link("/classes/knight/", "Knight Class"), link("/database/cards/", "Cards Database")]);
  }
  if (path === "/guides/") {
    return shell("SpiritVale Guides", "Browse source-backed beginner, class, progression, stats and card system guides.", "<section><h2>Guide collection</h2>" + list(guideLinks()) + "</section>", [link("/classes/", "SpiritVale Classes"), link("/database/", "SpiritVale Database")]);
  }
  if (path === "/classes/") {
    return shell("SpiritVale Classes", "Explore the seven confirmed SpiritVale base classes without unsupported roles, weapons or builds.", "<section><h2>Confirmed base classes</h2>" + list(classLinks()) + "</section>", [link("/guides/class-guide/", "Class Guide"), link("/guides/beginner-guide/", "Beginner Guide"), link("/database/skills/", "Skills Database")]);
  }
  if (path === "/database/") {
    return shell("SpiritVale Database", "Browse verified SpiritVale skills, equipment, cards, artifacts, monsters, bosses and maps.", "<section><h2>Database categories</h2>" + list(databaseLinks()) + "</section>", [link("/guides/", "SpiritVale Guides"), link("/classes/", "SpiritVale Classes")]);
  }
  const guide = guides.find((record) => record.seo.canonicalPath === path);
  if (guide) {
    if (guide.slug === "leveling-guide") {
      const levelingContent = [
        "<section><h2>What We Know About Leveling in SpiritVale</h2><p>Official SpiritVale information confirms character leveling and references skill progression, class switching, equipment, loot, combat and multiplayer. It does not publish a verified fastest route, experience formula, level cap or recommended area, so this page keeps those details marked as awaiting confirmation.</p></section>",
        "<section><h2>Leveling Information Still Being Verified</h2><p>XP requirements, progression routes, recommended areas and efficient leveling methods remain unverified in the registered source set. Information will be updated when a first-party SpiritVale source confirms one of these details.</p><ul><li>XP requirements: awaiting official information.</li><li>Level cap and progression table: awaiting official information.</li><li>Route, area and efficiency claims: not published as verified facts.</li></ul></section>",
        "<section><h2>Related SpiritVale Guides</h2><p>Use the <a href=\"/guides/class-guide/\">SpiritVale Class Guide</a> and <a href=\"/classes/\">SpiritVale Classes</a> to compare confirmed class names. The <a href=\"/database/skills/\">SpiritVale Skills Database</a>, <a href=\"/database/equipment/\">SpiritVale Equipment Database</a> and <a href=\"/database/\">SpiritVale Database</a> show where source-backed records are tracked.</p></section>"
      ].join("");
      return shell("SpiritVale Leveling Guide", "Follow PlayAIG's SpiritVale leveling guide for currently verified progression information and clearly marked unknowns.", levelingContent, [link("/guides/", "SpiritVale Guides"), link("/guides/class-guide/", "SpiritVale Class Guide"), link("/classes/", "SpiritVale Classes")]);
    }
    const sections = guide.sections.slice(0, 8).map((section) => "<section><h2>" + escapeHtml(section.heading) + "</h2>" + section.contentBlocks.slice(0, 3).map((block) => {
      if (block.type === "list") return list(block.items.map(escapeHtml));
      return block.text ? "<p>" + escapeHtml(block.text) + "</p>" : "";
    }).join("") + "</section>").join("");
    const related = [link("/guides/", "All Guides"), link("/classes/", "Classes"), link("/database/", "Database")];
    for (const id of guide.relatedClassIds ?? []) {
      const gameClass = baseClasses.find((record) => record.id === id);
      if (gameClass) related.push(link("/classes/" + gameClass.slug + "/", gameClass.name + " Class"));
    }
    for (const id of guide.relatedDatabaseCategoryIds ?? []) related.push(link("/database/" + id + "/", id + " Database"));
    return shell(guide.name, guide.summary ?? guide.shortDescription ?? "Source-backed SpiritVale guide information from PlayAIG.", sections || "<section><h2>Overview</h2><p>Information will be updated as verified sources are reviewed.</p></section>", related);
  }
  const gameClass = baseClasses.find((record) => path === "/classes/" + record.slug + "/");
  if (gameClass) {
    if (gameClass.slug === "warrior") {
      const warriorContent = [
        "<section><h2>Warrior Class Overview</h2><p>Warrior is one of the seven confirmed SpiritVale base-class names. The official record confirms the class identity, but does not assign a role, weapon, main stat, difficulty or universal progression route.</p></section>",
        "<section><h2>SpiritVale Warrior Build Information</h2><p>Reliable Warrior build recommendations are not yet sufficiently verified. Related community skill records may be useful for research, but they do not establish a best rotation, stat priority, equipment set, damage ranking or meta build.</p><ul><li>Skills: review only source-backed records.</li><li>Equipment and stats: awaiting a complete verified relationship.</li><li>Best build and tier claims: not published.</li></ul></section>",
        "<section><h2>Related Warrior Resources</h2><p>Read the <a href=\"/guides/class-guide/\">SpiritVale Class Guide</a>, <a href=\"/guides/leveling-guide/\">SpiritVale Leveling Guide</a>, <a href=\"/classes/\">SpiritVale Classes</a>, <a href=\"/database/skills/\">SpiritVale Skills Database</a> and <a href=\"/database/equipment/\">SpiritVale Equipment Database</a> for source status and related research.</p></section>"
      ].join("");
      return shell("SpiritVale Warrior Class Guide", "Explore the SpiritVale Warrior class with currently verified information and clearly marked build questions.", warriorContent, [link("/classes/", "SpiritVale Classes"), link("/guides/class-guide/", "SpiritVale Class Guide"), link("/guides/leveling-guide/", "SpiritVale Leveling Guide")]);
    }
    return shell("SpiritVale " + gameClass.name + " Class Guide", gameClass.name + " is an officially confirmed SpiritVale base class. Role, weapon and build details remain source-dependent.", "<section><h2>Officially confirmed information</h2><p>Current formal records confirm the class identity and verification status. Unsupported abilities, stats and equipment are not added.</p></section>", [link("/classes/", "All Classes"), link("/guides/class-guide/", "Class Guide"), link("/guides/beginner-guide/", "Beginner Guide"), link("/database/skills/", "Skills Database"), link("/database/equipment/", "Equipment Database")]);
  }
  const categoryMatch = path.match(/^\/database\/([a-z-]+)\/$/);
  if (categoryMatch) {
    const category = categoryMatch[1];
    const labels = new Map(categoryInfo);
    const label = labels.get(category) ?? category;
    const records = category === "cards" ? validCards : category === "equipment" ? validEquipment : category === "monsters" ? validMonsters : category === "skills" ? validSkills : [];
    if (category === "cards") {
      const intro = "Browse the SpiritVale Cards Database with " + validCards.length + " currently verified card entries. Each card links to its own source-backed database page, with additional details added as reliable information becomes available.";
      const content = "<section><h2>About SpiritVale Cards</h2><p>SpiritVale includes a card system connected to character builds and equipment customization. This database organizes currently verified card records into individual pages so players can quickly browse known SpiritVale cards. Only source-backed information should be presented as confirmed.</p></section>" +
        "<section><h2>Verified Card Entries</h2>" + list(entityLinks(category, records)) + "</section>";
      return shell("SpiritVale Cards Database - Complete Card List", intro, content, [link("/guides/card-system-guide/", "SpiritVale Card System Guide"), link("/database/", "SpiritVale Database"), link("/guides/", "SpiritVale Guides")]);
    }
    const entries = records.length ? "<section><h2>Verified " + escapeHtml(label) + " entries</h2>" + list(entityLinks(category, records)) + "</section>" : "<section><h2>Data collection status</h2><p>No verified " + escapeHtml(label.toLowerCase()) + " entries are available in the current source-backed collection. Information will be updated after verification.</p></section>";
    return shell("SpiritVale " + label + " Database", "Review source-backed " + label.toLowerCase() + " records and their current verification status.", entries, [link("/database/", "Database Home"), link("/guides/", "Guides"), link("/classes/", "Classes")]);
  }
  const entityMatch = path.match(/^\/database\/(cards|equipment|monsters|skills)\/([^/]+)\/$/);
  if (entityMatch) {
    const [, category, slug] = entityMatch;
    const records = category === "cards" ? validCards : category === "equipment" ? validEquipment : category === "monsters" ? validMonsters : validSkills;
    const record = records.find((item) => item.slug === slug);
    if (record) {
      const description = category === "cards" ? cardDescription(record.name) : (record.description ?? record.shortDescription ?? "Source-backed information is available only for fields confirmed by the registered source.");
      const fields = [record.category ? "Category: " + record.category : "", record.rarity ? "Rarity: " + record.rarity : "", record.effect ? "Effect: " + record.effect : "", record.level ? "Level: " + record.level : ""].filter(Boolean);
      return shell(record.name, description, "<section><h2>Overview</h2><p>" + escapeHtml(description) + "</p>" + (fields.length ? list(fields.map(escapeHtml)) : "") + "</section>", [link("/database/" + category + "/", labelForCategory(category) + " Database"), link("/guides/", "SpiritVale Guides"), link("/classes/", "SpiritVale Classes"), link("/guides/class-guide/", "Class Guide")]);
    }
  }
  throw new Error("No static SEO body mapping for sitemap route: " + path);
}

function labelForCategory(category) {
  return category[0].toUpperCase() + category.slice(1);
}

function updateCardMetadata(html, card) {
  const description = cardDescription(card.name);
  html = html.replace(/(<meta name="description"[^>]*content=")[^"]*(")/i, "$1" + escapeHtml(description) + "$2");
  html = html.replace(/(<meta property="og:description"[^>]*content=")[^"]*(")/i, "$1" + escapeHtml(description) + "$2");
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (match, raw) => {
    try {
      const data = JSON.parse(raw);
      if (data && typeof data === "object" && data.description) data.description = description;
      return '<script type="application/ld+json">' + JSON.stringify(data) + "</script>";
    } catch {
      return match;
    }
  });
  return html;
}

function routeFile(path) {
  return path === "/" ? resolve(outputRoot, "index.html") : resolve(outputRoot, path.slice(1), "index.html");
}

const sitemap = await readFile(resolve(outputRoot, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => new URL(match[1]).pathname);
const routeBodies = new Map();
for (const path of sitemapPaths) routeBodies.set(path, bodyForPath(path));
if (routeBodies.size !== new Set(sitemapPaths).size) throw new Error("Duplicate sitemap route source detected.");

const cardByPath = new Map(validCards.map((card) => ["/database/cards/" + card.slug + "/", card]));
for (const path of sitemapPaths) {
  const file = routeFile(path);
  let html = await readFile(file, "utf8");
  const card = cardByPath.get(path);
  if (card) html = updateCardMetadata(html, card);
  html = html.replace(/<body>[\s\S]*?<\/body>/i, "<body><div id=\"root\">" + routeBodies.get(path) + "</div></body>");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

console.log("SpiritVale static content prerender PASSED");
console.log("Prerender route files: " + sitemapPaths.length);
console.log("Static HTML H1 route files: " + sitemapPaths.length);
console.log("Static link route files: " + sitemapPaths.length);
console.log("Card descriptions normalized: " + validCards.length);
