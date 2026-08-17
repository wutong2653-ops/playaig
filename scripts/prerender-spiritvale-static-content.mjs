import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { mkdir } from "node:fs/promises";

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
    return shell("SpiritVale " + gameClass.name + " Class Guide", gameClass.name + " is an officially confirmed SpiritVale base class. Role, weapon and build details remain source-dependent.", "<section><h2>Officially confirmed information</h2><p>Current formal records confirm the class identity and verification status. Unsupported abilities, stats and equipment are not added.</p></section>", [link("/classes/", "All Classes"), link("/guides/class-guide/", "Class Guide"), link("/guides/beginner-guide/", "Beginner Guide"), link("/database/skills/", "Skills Database"), link("/database/equipment/", "Equipment Database")]);
  }
  const categoryMatch = path.match(/^\/database\/([a-z-]+)\/$/);
  if (categoryMatch) {
    const category = categoryMatch[1];
    const labels = new Map(categoryInfo);
    const label = labels.get(category) ?? category;
    const records = category === "cards" ? validCards : category === "equipment" ? validEquipment : category === "monsters" ? validMonsters : category === "skills" ? validSkills : [];
    const entries = records.length ? "<section><h2>Verified " + escapeHtml(label) + " entries</h2>" + list(entityLinks(category, records)) + "</section>" : "<section><h2>Data collection status</h2><p>No verified " + escapeHtml(label.toLowerCase()) + " entries are available in the current source-backed collection. Information will be updated after verification.</p></section>";
    return shell("SpiritVale " + label + " Database", "Review source-backed " + label.toLowerCase() + " records and their current verification status.", entries, [link("/database/", "Database Home"), link("/guides/", "Guides"), link("/classes/", "Classes")]);
  }
  const entityMatch = path.match(/^\/database\/(cards|equipment|monsters|skills)\/([^/]+)\/$/);
  if (entityMatch) {
    const [, category, slug] = entityMatch;
    const records = category === "cards" ? validCards : category === "equipment" ? validEquipment : category === "monsters" ? validMonsters : validSkills;
    const record = records.find((item) => item.slug === slug);
    if (record) {
      const description = category === "cards" ? record.name + " is a verified SpiritVale card entry. View its source-backed database record and currently confirmed information on PlayAIG." : (record.description ?? record.shortDescription ?? "Source-backed information is available only for fields confirmed by the registered source.");
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
  const description = card.name + " is a verified SpiritVale card entry. View its source-backed database record and currently confirmed information on PlayAIG.";
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
