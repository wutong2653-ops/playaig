import classRecords from "../../data/spiritvale/classes/classes.json";
import guideRecords from "../../data/spiritvale/guides/guides.json";
import sourceRecords from "../../data/spiritvale/sources/sources.json";
import guideTypeRecords from "../../data/spiritvale/taxonomies/guide-types.json";
import skillRecords from "../../data/spiritvale/skills/skills.json";
import equipmentRecords from "../../data/spiritvale/equipment/equipment.json";
import cardRecords from "../../data/spiritvale/cards/cards.json";
import artifactRecords from "../../data/spiritvale/artifacts/artifacts.json";
import monsterRecords from "../../data/spiritvale/monsters/monsters.json";
import bossRecords from "../../data/spiritvale/bosses/bosses.json";
import mapRecords from "../../data/spiritvale/maps/maps.json";
import type {
  DatabaseCategory,
  DatabaseCategoryId,
  SpiritValeCard,
  SpiritValeClass,
  SpiritValeEquipment,
  SpiritValeGuide,
  SpiritValeGuideCategory,
  SpiritValeMonster,
  SpiritValeSource,
  SpiritValeSkill
} from "./types";

const classes = classRecords as SpiritValeClass[];
const guides = guideRecords as SpiritValeGuide[];
const cards = cardRecords as SpiritValeCard[];
const equipment = equipmentRecords as SpiritValeEquipment[];
const monsters = monsterRecords as SpiritValeMonster[];
const skills = skillRecords as SpiritValeSkill[];
const sources = sourceRecords as SpiritValeSource[];
const guideCategories = guideTypeRecords as SpiritValeGuideCategory[];

export const classVisualAssetId = "sv-guide-classes-selection-banner";

export const databaseCategories: DatabaseCategory[] = [
  {
    id: "skills",
    label: "Skills",
    description: "Verified skill records will appear here when official information is available.",
    path: "/database/skills/",
    icon: "search",
    imageAssetId: "sv-guide-classes-selection-banner"
  },
  {
    id: "equipment",
    label: "Equipment",
    description: "Verified equipment records will appear here when official information is available.",
    path: "/database/equipment/",
    icon: "arrowRight",
    imageAssetId: "sv-guide-stats-crafting-banner"
  },
  {
    id: "cards",
    label: "Cards",
    description: "Browse the SpiritVale Cards Database and open each source-backed card entry with its verification status.",
    path: "/database/cards/",
    icon: "arrowRight",
    imageAssetId: "sv-guide-cards-build-banner"
  },
  {
    id: "artifacts",
    label: "Artifacts",
    description: "Verified artifact records will appear here when official information is available.",
    path: "/database/artifacts/",
    icon: "arrowRight",
    imageAssetId: "sv-guide-cards-build-banner"
  },
  {
    id: "monsters",
    label: "Monsters",
    description: "Verified monster records will appear here when official information is available.",
    path: "/database/monsters/",
    icon: "arrowRight",
    imageAssetId: "sv-guide-beginner-combat-banner"
  },
  {
    id: "bosses",
    label: "Bosses",
    description: "Verified boss records will appear here when official information is available.",
    path: "/database/bosses/",
    icon: "arrowRight",
    imageAssetId: "sv-boss-lava-arena-01"
  },
  {
    id: "maps",
    label: "Maps",
    description: "Verified map records will appear here when official information is available.",
    path: "/database/maps/",
    icon: "arrowRight",
    imageAssetId: "sv-map-ice-cavern-01"
  }
];

const databaseEntriesByCategory: Record<DatabaseCategoryId, unknown[]> = {
  skills: skillRecords,
  equipment: equipmentRecords,
  cards: cardRecords,
  artifacts: artifactRecords,
  monsters: monsterRecords,
  bosses: bossRecords,
  maps: mapRecords
};

export function getClasses() {
  return classes.filter((record) => record.classType === "base");
}

export function getClassBySlug(slug: string) {
  return getClasses().find((gameClass) => gameClass.slug === slug) ?? null;
}

export function getGuides() {
  return guides;
}

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug) ?? null;
}

export function getGuidesByIds(ids: string[]) {
  const guideById = new Map(guides.map((guide) => [guide.id, guide]));
  return ids.map((id) => guideById.get(id)).filter((guide): guide is SpiritValeGuide => Boolean(guide));
}

export function getGuidesRelatedToClass(classId: string) {
  return guides.filter((guide) => guide.relatedClassIds.includes(classId));
}

export function getDatabaseCategories() {
  return databaseCategories;
}

export function getDatabaseCategoryBySlug(slug: string) {
  return databaseCategories.find((category) => category.id === slug) ?? null;
}

export function getDatabaseEntries(categoryId: DatabaseCategoryId) {
  return databaseEntriesByCategory[categoryId];
}

function isValidCard(card: SpiritValeCard) {
  return Boolean(card.id && card.slug && card.name && card.sourceIds.length && card.sourceIds.every((sourceId) => sources.some((source) => source.id === sourceId)));
}

export function getCards() {
  return cards.filter(isValidCard);
}

export function getCardBySlug(slug: string) {
  return getCards().find((card) => card.slug === slug) ?? null;
}

function isValidEquipment(equipmentRecord: SpiritValeEquipment) {
  return Boolean(equipmentRecord.id && equipmentRecord.slug && equipmentRecord.name && equipmentRecord.sourceIds.length && equipmentRecord.sourceIds.every((sourceId) => sources.some((source) => source.id === sourceId)));
}

function isValidMonster(monster: SpiritValeMonster) {
  return Boolean(monster.id && monster.slug && monster.name && monster.status === "published" && monster.sourceIds.length && monster.sourceIds.every((sourceId) => sources.some((source) => source.id === sourceId)));
}

export function getEquipments() {
  return equipment.filter(isValidEquipment);
}

export function getEquipmentBySlug(slug: string) {
  return getEquipments().find((equipmentRecord) => equipmentRecord.slug === slug) ?? null;
}

export function getMonsters() {
  return monsters.filter(isValidMonster);
}

export function getMonsterBySlug(slug: string) {
  return getMonsters().find((monster) => monster.slug === slug) ?? null;
}

function isValidSkill(skill: SpiritValeSkill) {
  return Boolean(skill.id && skill.slug && skill.name && skill.status === "published" && skill.sourceIds.length && skill.sourceIds.every((sourceId) => sources.some((source) => source.id === sourceId)));
}

export function getSkills() {
  return skills.filter(isValidSkill);
}

export function getSkillBySlug(slug: string) {
  return getSkills().find((skill) => skill.slug === slug) ?? null;
}

export function getGuidesRelatedToEquipment(equipmentRecord: SpiritValeEquipment) {
  return getGuidesByIds(equipmentRecord.relatedGuideIds);
}

export function getGuidesRelatedToMonster(monster: SpiritValeMonster) {
  return getGuidesByIds(monster.relatedGuideIds);
}

export function getGuidesRelatedToSkill(skill: SpiritValeSkill) {
  return getGuidesByIds(skill.relatedGuideIds);
}

export function getGuidesRelatedToCard(card: SpiritValeCard) {
  return getGuidesByIds(card.relatedGuideIds);
}

export function getGuidesRelatedToDatabaseCategory(categoryId: DatabaseCategoryId) {
  return guides.filter((guide) => guide.relatedDatabaseCategoryIds.includes(categoryId));
}

export function getGuideCategories() {
  return guideCategories;
}

export function getStartHereGuides() {
  return guides.filter((guide) => guide.guideTypeId !== "guide-type-cards");
}

export function getSource(sourceId: string) {
  return sources.find((source) => source.id === sourceId) ?? null;
}

export function getOfficialSteamSource() {
  return getSource("source-official-steam-store");
}

export function getSources() {
  return sources;
}
