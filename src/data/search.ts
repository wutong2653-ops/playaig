import {
  getClasses,
  getCards,
  getDatabaseCategories,
  getDatabaseEntries,
  getEquipments,
  getGuides,
  getMonsters,
  getSkills,
  getSource
} from "./content";
import type { SearchCategory, SpiritValeSearchRecord } from "./types";

export type SearchFilter = "all" | SearchCategory;

function sourceTypeFor(sourceIds: string[]) {
  return getSource(sourceIds[0])?.sourceType ?? "official-source";
}

function normalized(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function getSpiritValeSearchIndex(): SpiritValeSearchRecord[] {
  const classes = getClasses();
  const guides = getGuides().map((guide) => {
    // Broad navigation relationships in other guides should not cause a query
    // for every class to match them. Individual class names are searchable in
    // the verified Class Guide, where that relationship is editorially direct.
    const relatedClassNames =
      guide.guideTypeId === "guide-type-classes"
        ? guide.relatedClassIds
            .map((classId) => classes.find((gameClass) => gameClass.id === classId)?.name)
            .filter((name): name is string => Boolean(name))
        : [];
    const guideText = [
      guide.name,
      guide.shortDescription,
      guide.description,
      guide.summary,
      guide.intro,
      ...relatedClassNames
    ].filter((value): value is string => Boolean(value)).join(" ");
    return {
      id: guide.id,
      title: guide.name,
      category: "guides" as const,
      summary: guide.shortDescription ?? guide.description ?? "Verified guide information.",
      verificationStatus: guide.factReviewStatus,
      url: guide.seo.canonicalPath,
      sourceType: sourceTypeFor(guide.sourceIds),
      searchableText: guideText
    };
  });
  const classRecords = classes.map((gameClass) => ({
    id: gameClass.id,
    title: gameClass.name + " Class",
    category: "classes" as const,
    summary: gameClass.name + " is an officially confirmed SpiritVale Base Class.",
    verificationStatus: gameClass.verificationStatus,
    url: "/classes/" + gameClass.slug + "/",
    sourceType: sourceTypeFor(gameClass.sourceIds),
    searchableText: [gameClass.name, "class", "base class"].join(" ")
  }));
  const databaseRecords = getDatabaseCategories().map((category) => ({
    id: "database-" + category.id,
    title: category.label + " Database",
    category: "database" as const,
    summary: getDatabaseEntries(category.id).length === 0
      ? "Data Collection In Progress. No verified " + category.label.toLowerCase() + " entries are available."
      : category.description,
    verificationStatus: getDatabaseEntries(category.id).length === 0 ? "awaiting-official-information" as const : "partially-verified" as const,
    url: category.path,
    sourceType: "official-steam",
    searchableText: [category.label, "database", category.description].join(" ")
  }));
  const cardRecords = getCards().map((card) => ({
    id: "card-" + card.id,
    title: card.name + " Card",
    category: "database" as const,
    summary: card.description ?? "Verified SpiritVale card information.",
    verificationStatus: "verified" as const,
    url: "/database/cards/" + card.slug + "/",
    sourceType: sourceTypeFor(card.sourceIds),
    searchableText: [card.name, card.slug, card.category, card.rarity, card.effect, card.description].filter((value): value is string => Boolean(value)).join(" ")
  }));
  const equipmentRecords = getEquipments().map((equipment) => ({
    id: "equipment-" + equipment.id,
    title: equipment.name + " Equipment",
    category: "database" as const,
    summary: equipment.shortDescription ?? equipment.description ?? "Source-backed SpiritVale equipment information.",
    verificationStatus: equipment.verificationStatus,
    url: "/database/equipment/" + equipment.slug + "/",
    sourceType: sourceTypeFor(equipment.sourceIds),
    searchableText: [equipment.name, equipment.slug, equipment.category, ...equipment.stats, equipment.effect, equipment.location, equipment.drop, equipment.description].filter((value): value is string => Boolean(value)).join(" ")
  }));
  const monsterRecords = getMonsters().map((monster) => ({
    id: "monster-" + monster.id,
    title: monster.name + " Monster",
    category: "database" as const,
    summary: monster.level === null ? "Source-backed SpiritVale monster record." : "Level " + monster.level + " source-backed SpiritVale monster record.",
    verificationStatus: monster.verificationStatus,
    url: "/database/monsters/" + monster.slug + "/",
    sourceType: sourceTypeFor(monster.sourceIds),
    searchableText: [monster.name, monster.slug, monster.level === null ? null : String(monster.level), ...monster.location, ...monster.drop, monster.description, monster.notes].filter((value): value is string => Boolean(value)).join(" ")
  }));
  const skillRecords = getSkills().map((skill) => ({
    id: "skill-" + skill.id,
    title: skill.name + " Skill",
    category: "database" as const,
    summary: skill.shortDescription ?? skill.description ?? "Source-backed SpiritVale skill information.",
    verificationStatus: skill.verificationStatus,
    url: "/database/skills/" + skill.slug + "/",
    sourceType: sourceTypeFor(skill.sourceIds),
    searchableText: [skill.name, skill.slug, skill.description, skill.effectText, ...skill.classIds, skill.notes].filter((value): value is string => Boolean(value)).join(" ")
  }));
  return [...guides, ...classRecords, ...databaseRecords, ...cardRecords, ...equipmentRecords, ...monsterRecords, ...skillRecords];
}

export function searchSpiritVale(query: string, filter: SearchFilter = "all") {
  const terms = normalized(query).split(/\s+/).filter(Boolean);
  const records = getSpiritValeSearchIndex().filter((record) => filter === "all" || record.category === filter);
  if (!terms.length) return [];
  return records.filter((record) => {
    const text = normalized(record.searchableText + " " + record.title + " " + record.summary);
    return terms.every((term) => text.includes(term));
  });
}
