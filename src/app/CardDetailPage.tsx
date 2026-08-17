import { useEffect } from "react";
import { Badge, EmptyState, PageHeader, Section } from "../design-system";
import { AssetImage, getGuidesRelatedToCard, getSource, type SpiritValeCard, type SpiritValeSource } from "../data";
import { CardEntityBreadcrumb, DatabaseDisclaimer, DatabaseLayout, DatabaseSources, RelatedGuides } from "../components";
import { applyCardMetadata } from "./site";

const pendingText = "Information will be updated after verification.";

function CardField({ label, value }: { label: string; value: string | null }) {
  return <div className="card-detail__field"><dt>{label}</dt><dd>{value ?? pendingText}</dd></div>;
}

export function CardDetailPage({ card }: { card: SpiritValeCard }) {
  const relatedGuides = getGuidesRelatedToCard(card);
  const sources = card.sourceIds.map(getSource).filter((source): source is SpiritValeSource => Boolean(source));

  useEffect(() => { applyCardMetadata(card); }, [card]);

  return (
    <main id="main-content">
      <div className="sv-container database-page card-detail-page">
        <Section className="database-page__breadcrumb"><CardEntityBreadcrumb card={card} /></Section>
        <DatabaseLayout>
          <header className="card-detail__header">
            <div className="database-header__meta"><Badge tone="success">Verified</Badge><Badge>Card</Badge></div>
            <h1>{card.name}</h1>
            <p>{card.description ?? pendingText}</p>
            {card.imageAssetId ? <AssetImage className="card-detail__image" imageAssetId={card.imageAssetId} priority /> : null}
          </header>
          <section className="database-section" id="overview">
            <h2>Overview</h2>
            <p>{card.description ?? pendingText}</p>
            <dl className="card-detail__fields"><CardField label="Category" value={card.category} /><CardField label="Rarity" value={card.rarity} /><CardField label="Verified at" value={card.verifiedAt} /></dl>
          </section>
          <section className="database-section" id="effect"><h2>Effect</h2><p>{card.effect ?? pendingText}</p></section>
          <section className="database-section" id="how-to-obtain"><h2>How To Obtain</h2><p>{pendingText}</p></section>
          <section className="database-section" id="usage-context"><h2>Usage Context</h2><p>{card.notes ?? pendingText}</p></section>
          <section className="database-section" id="related-guides">
            <h2>Related Guides</h2>
            <ul>
              <li><a className="sv-focusable" href="/guides/card-system-guide/">SpiritVale Card System Guide</a></li>
              <li><a className="sv-focusable" href="/guides/cards/card-effects/">SpiritVale Card Effects Guide</a></li>
              <li><a className="sv-focusable" href="/classes/">Related Classes</a></li>
              <li><a className="sv-focusable" href="/guides/class-guide/">Class and build guidance</a></li>
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

export function CardNotFoundPage() {
  return <main id="main-content"><div className="sv-container site-safe-route"><PageHeader description="The requested card is not part of the source-backed SpiritVale Cards collection." title="Card not found" /><EmptyState action={<a className="sv-button sv-button--outline sv-focusable" href="/database/cards/">Browse Cards Database</a>} description={pendingText} title="This card is unavailable" /></div></main>;
}
