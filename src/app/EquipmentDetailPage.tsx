import { useEffect } from "react";
import { Badge, EmptyState, PageHeader, Section } from "../design-system";
import { getGuidesRelatedToEquipment, getSource, type SpiritValeEquipment, type SpiritValeSource } from "../data";
import { DatabaseDisclaimer, EquipmentEntityBreadcrumb, DatabaseLayout, DatabaseSources, RelatedGuides } from "../components";
import { applyEquipmentMetadata } from "./site";

const pendingText = "Information will be updated after verification.";

function EquipmentField({ label, value }: { label: string; value: string | null }) {
  return <div className="card-detail__field"><dt>{label}</dt><dd>{value ?? pendingText}</dd></div>;
}

export function EquipmentDetailPage({ equipment }: { equipment: SpiritValeEquipment }) {
  const relatedGuides = getGuidesRelatedToEquipment(equipment);
  const sources = equipment.sourceIds.map(getSource).filter((source): source is SpiritValeSource => Boolean(source));

  useEffect(() => { applyEquipmentMetadata(equipment); }, [equipment]);

  return (
    <main id="main-content">
      <div className="sv-container database-page equipment-detail-page">
        <Section className="database-page__breadcrumb"><EquipmentEntityBreadcrumb equipment={equipment} /></Section>
        <DatabaseLayout>
          <header className="card-detail__header">
            <div className="database-header__meta"><Badge tone="warning">Partially Verified</Badge><Badge>Equipment</Badge></div>
            <h1>{equipment.name}</h1>
            <p>{equipment.description ?? equipment.shortDescription ?? pendingText}</p>
          </header>
          <section className="database-section" id="overview">
            <h2>Overview</h2>
            <p>{equipment.description ?? pendingText}</p>
            <dl className="card-detail__fields">
              <EquipmentField label="Category" value={equipment.category} />
              <EquipmentField label="Verification Status" value="Partially verified community record" />
              <EquipmentField label="Verified at" value={equipment.lastVerifiedAt} />
            </dl>
          </section>
          <section className="database-section" id="stats"><h2>Stats</h2>{equipment.stats.length ? <ul>{equipment.stats.map((stat) => <li key={stat}>{stat}</li>)}</ul> : <p>{pendingText}</p>}</section>
          <section className="database-section" id="effect"><h2>Effect</h2><p>{equipment.effect ?? pendingText}</p></section>
          <section className="database-section" id="acquisition-evidence"><h2>Acquisition Evidence</h2><dl className="card-detail__fields"><EquipmentField label="Crafting / Location" value={equipment.location} /><EquipmentField label="Drop Evidence" value={equipment.drop} /></dl></section>
          <section className="database-section" id="related-guides">
            <h2>Related Guides</h2>
            <ul>
              <li><a className="sv-focusable" href="/database/equipment/">Equipment Database</a></li>
              <li><a className="sv-focusable" href="/guides/equipment/upgrade-system/">Equipment Upgrade Guide</a></li>
              <li><a className="sv-focusable" href="/guides/stats-guide/">Stats Guide</a></li>
              <li><a className="sv-focusable" href="/guides/class-guide/">Class and build guidance</a></li>
              <li><a className="sv-focusable" href="/classes/">Related Classes</a></li>
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

export function EquipmentNotFoundPage() {
  return <main id="main-content"><div className="sv-container site-safe-route"><PageHeader description="The requested equipment is not part of the source-backed SpiritVale Equipment collection." title="Equipment not found" /><EmptyState action={<a className="sv-button sv-button--outline sv-focusable" href="/database/equipment/">Browse Equipment Database</a>} description={pendingText} title="This equipment is unavailable" /></div></main>;
}
