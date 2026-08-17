import { useEffect } from "react";
import { EmptyState, PageHeader, Section } from "../design-system";
import { getCards, getDatabaseEntries, getEquipments, getGuidesRelatedToDatabaseCategory, getMonsters, getOfficialSteamSource, getSkills, getSource, type DatabaseCategory, type SpiritValeSource } from "../data";
import { CardEntityList, DatabaseBreadcrumb, DatabaseCurrentStatus, DatabaseDisclaimer, DatabaseEmptyEntries, DatabaseHeader, DatabaseLayout, DatabaseSources, EquipmentEntityList, MonsterEntityList, SkillEntityList, type DatabaseVerificationStatus, RelatedGuides } from "../components";
import { applyDatabaseCategoryMetadata } from "./site";
import { getDatabaseLandingContent } from "./seoLandingContent";

function statusForEntryCount(entryCount: number): DatabaseVerificationStatus {
  return entryCount === 0 ? "awaiting-official-information" : "partially-verified";
}

export function DatabaseCategoryPage({ category }: { category: DatabaseCategory }) {
  const entries = getDatabaseEntries(category.id);
  const cards = category.id === "cards" ? getCards() : [];
  const equipment = category.id === "equipment" ? getEquipments() : [];
  const monsters = category.id === "monsters" ? getMonsters() : [];
  const skills = category.id === "skills" ? getSkills() : [];
  const entryCount = category.id === "cards" ? cards.length : category.id === "equipment" ? equipment.length : category.id === "monsters" ? monsters.length : category.id === "skills" ? skills.length : entries.length;
  const status = statusForEntryCount(entryCount);
  const source = getOfficialSteamSource();
  const sources = category.id === "skills"
    ? [...new Map(skills.flatMap((skill) => skill.sourceIds.map(getSource).filter((item): item is SpiritValeSource => Boolean(item))).map((item) => [item.id, item])).values()]
    : category.id === "cards"
    ? [...new Map(cards.flatMap((card) => card.sourceIds.map(getSource).filter((item): item is SpiritValeSource => Boolean(item))).map((item) => [item.id, item])).values()]
    : category.id === "equipment"
      ? [...new Map(equipment.flatMap((item) => item.sourceIds.map(getSource).filter((sourceItem): sourceItem is SpiritValeSource => Boolean(sourceItem))).map((item) => [item.id, item])).values()]
      : category.id === "monsters"
        ? [...new Map(monsters.flatMap((item) => item.sourceIds.map(getSource).filter((sourceItem): sourceItem is SpiritValeSource => Boolean(sourceItem))).map((item) => [item.id, item])).values()]
    : source ? [source] : [] as SpiritValeSource[];
  const relatedGuides = getGuidesRelatedToDatabaseCategory(category.id);
  const landing = getDatabaseLandingContent(category.id);

  useEffect(() => {
    applyDatabaseCategoryMetadata(category);
  }, [category]);

  return (
    <main id="main-content">
      <div className="sv-container database-page">
        <Section className="database-page__breadcrumb"><DatabaseBreadcrumb category={category} /></Section>
        <DatabaseLayout>
          <DatabaseHeader category={category} status={status} title={landing?.h1} />
          <DatabaseCurrentStatus category={category} entryCount={entryCount} status={status} />
          {skills.length ? <SkillEntityList skills={skills} /> : cards.length ? <CardEntityList cards={cards} /> : equipment.length ? <EquipmentEntityList equipment={equipment} /> : monsters.length ? <MonsterEntityList monsters={monsters} /> : <DatabaseEmptyEntries category={category} />}
          {landing ? (
            <section className="seo-landing-content" aria-label={landing.h1}>
              {landing.sections.map((section) => (
                <section className="seo-landing-content__section" id={section.heading.toLowerCase().replaceAll(" ", "-")} key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                </section>
              ))}
              <section className="seo-landing-content__section" id="faq">
                <h2>Frequently Asked Questions</h2>
                {landing.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
              </section>
              <section className="seo-landing-content__section" id="related-pages">
                <h2>Related Guides and Pages</h2>
                <ul>{landing.links.map((link) => <li key={link.href}><a className="sv-focusable" href={link.href}>{link.label}</a></li>)}</ul>
              </section>
            </section>
          ) : null}
          <RelatedGuides guides={relatedGuides} />
          <DatabaseSources sources={sources} />
          <DatabaseDisclaimer />
        </DatabaseLayout>
      </div>
    </main>
  );
}

export function DatabaseNotFoundPage() {
  return (
    <main id="main-content">
      <div className="sv-container site-safe-route">
        <PageHeader description="The requested database category is not part of the published SpiritVale Database." title="Database category not found" />
        <EmptyState description="Use the Database index to browse the verified SpiritVale collections." title="This database category is unavailable" />
      </div>
    </main>
  );
}
