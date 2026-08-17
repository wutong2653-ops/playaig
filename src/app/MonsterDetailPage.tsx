import { useEffect } from "react";
import { Badge, EmptyState, PageHeader, Section } from "../design-system";
import { getGuidesRelatedToMonster, getSource, type SpiritValeMonster, type SpiritValeSource } from "../data";
import { DatabaseDisclaimer, DatabaseLayout, DatabaseSources, MonsterEntityBreadcrumb, RelatedGuides } from "../components";
import { applyMonsterMetadata } from "./site";

const pendingText = "Not verified / unavailable.";

export function MonsterDetailPage({ monster }: { monster: SpiritValeMonster }) {
  const relatedGuides = getGuidesRelatedToMonster(monster);
  const sources = monster.sourceIds.map(getSource).filter((source): source is SpiritValeSource => Boolean(source));

  useEffect(() => { applyMonsterMetadata(monster); }, [monster]);

  return (
    <main id="main-content">
      <div className="sv-container database-page monster-detail-page">
        <Section className="database-page__breadcrumb"><MonsterEntityBreadcrumb monster={monster} /></Section>
        <DatabaseLayout>
          <header className="card-detail__header">
            <div className="database-header__meta"><Badge tone="warning">Partially Verified</Badge><Badge>Monster</Badge></div>
            <h1>{monster.name}</h1>
            <p>{monster.description ?? pendingText}</p>
          </header>
          <section className="database-section" id="overview">
            <h2>Overview</h2>
            <p>{monster.description ?? pendingText}</p>
            <dl className="card-detail__fields">
              <div className="card-detail__field"><dt>Verification Status</dt><dd>Partially verified community record</dd></div>
              <div className="card-detail__field"><dt>Verified at</dt><dd>{monster.lastVerifiedAt ?? pendingText}</dd></div>
            </dl>
          </section>
          <section className="database-section" id="level"><h2>Level</h2><p>{monster.level === null ? pendingText : String(monster.level)}</p></section>
          <section className="database-section" id="location-evidence">
            <h2>Location Evidence</h2>
            {monster.location.length ? <ul>{monster.location.map((location) => <li key={location}>{location}</li>)}</ul> : <p>{pendingText}</p>}
          </section>
          <section className="database-section" id="drops-evidence">
            <h2>Drops Evidence</h2>
            {monster.drop.length ? <ul>{monster.drop.map((drop) => <li key={drop}>{drop}</li>)}</ul> : <p>{pendingText}</p>}
          </section>
          <section className="database-section" id="field-safety">
            <h2>Not Verified / Unavailable</h2>
            <p>Only fields supported by the registered source are shown. The following are not verified for this record:</p>
            <ul><li>Stats</li><li>Abilities</li><li>Weakness and resistance</li><li>Drop-rate calculations or best farming location</li></ul>
          </section>
          <section className="database-section" id="related-guides">
            <h2>Related Guides</h2>
            <ul>
              <li><a className="sv-focusable" href="/database/monsters/">Monster Database</a></li>
              <li><a className="sv-focusable" href="/guides/beginner-guide/">Beginner Guide</a></li>
              <li><a className="sv-focusable" href="/guides/leveling-guide/">Leveling Guide</a></li>
              <li><a className="sv-focusable" href="/classes/">Classes</a></li>
              <li><a className="sv-focusable" href="/guides/class-guide/">Class and Build Guides</a></li>
            </ul>
            <RelatedGuides guides={relatedGuides} />
          </section>
          <DatabaseSources sources={sources} />
          <DatabaseDisclaimer />
        </DatabaseLayout>
      </div>
    </main>
  );
}

export function MonsterNotFoundPage() {
  return <main id="main-content"><div className="sv-container site-safe-route"><PageHeader description="The requested Monster is not part of the source-backed SpiritVale Monsters collection." title="Monster not found" /><EmptyState action={<a className="sv-button sv-button--outline sv-focusable" href="/database/monsters/">Browse Monsters Database</a>} description="Information will be updated after verification." title="This Monster is unavailable" /></div></main>;
}
