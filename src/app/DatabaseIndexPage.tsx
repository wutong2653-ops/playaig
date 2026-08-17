import { useEffect } from "react";
import { DatabaseCard, FeatureSection, Grid, HeroBanner, Section } from "../design-system";
import { AssetImage, getCards, getDatabaseCategories, getDatabaseEntries, getGuidesRelatedToDatabaseCategory } from "../data";
import { DatabaseBreadcrumb, DatabaseVerificationBadge, RelatedGuides } from "../components";
import { applyDatabaseIndexMetadata, databaseIndexFaqItems } from "./site";

export function DatabaseIndexPage() {
  const categories = getDatabaseCategories();
  const entryCountFor = (categoryId: (typeof categories)[number]["id"]) => categoryId === "cards" ? getCards().length : getDatabaseEntries(categoryId).length;
  const statusFor = (entryCount: number) => entryCount ? "partially-verified" as const : "awaiting-official-information" as const;
  const relatedGuides = [...new Map(categories.flatMap((category) => getGuidesRelatedToDatabaseCategory(category.id)).map((guide) => [guide.id, guide])).values()];

  useEffect(() => {
    applyDatabaseIndexMetadata(categories.map((category) => category.id));
  }, [categories]);

  return (
    <main id="main-content">
      <div className="sv-container database-index">
        <Section className="database-index__header">
          <DatabaseBreadcrumb />
          <HeroBanner
            description="Explore verified SpiritVale game data and follow future entries as official information is confirmed."
            imageAssetId="sv-home-hero"
            media={<AssetImage imageAssetId="sv-home-hero" priority />}
            title="SpiritVale Database"
          />
        </Section>
        <Section className="database-index__intro">
          <div className="database-index__summary">
            <p className="database-index__summary-label">Database overview</p>
            <p>The <a className="sv-focusable" href="/database/">SpiritVale Database</a> is an independent reference index for information tied to registered, evidence-backed sources. It currently maps the main data collections without inventing unconfirmed game details.</p>
          </div>
          <h2>How to use the SpiritVale Database</h2>
          <ol>
            <li>Choose a collection below, such as Skills, Cards or Maps.</li>
            <li>Read the verification status before relying on an entry.</li>
            <li>Use <a className="sv-focusable" href="/guides/">verified SpiritVale Guides</a> and <a className="sv-focusable" href="/classes/">SpiritVale Classes</a> for related context.</li>
          </ol>
        </Section>
        <Section>
          <FeatureSection description="Every category reads its existing formal collection. Empty collections remain empty until official information is registered." title="Database Categories">
            <div className="database-index__table-wrap">
              <table className="database-index__table">
                <caption className="sv-visually-hidden">SpiritVale Database collections and current verification status</caption>
                <thead><tr><th scope="col">Collection</th><th scope="col">Current status</th><th scope="col">Browse</th></tr></thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <th scope="row">{category.label}</th>
                      <td><DatabaseVerificationBadge status={statusFor(entryCountFor(category.id))} /></td>
                      <td><a aria-label={"Browse " + category.label + " database"} className="sv-focusable" href={category.path}>View {category.label}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="database-index__cards">
              <h3>Explore each collection</h3>
              <Grid>
                {categories.map((category) => (
                  <a aria-label={"Browse " + category.label + " database"} className="home-card-link sv-focusable" href={category.path} key={category.id}>
                    <DatabaseCard
                      description={entryCountFor(category.id) ? entryCountFor(category.id) + " verified entries" : "Data Collection In Progress"}
                      imageAssetId={category.imageAssetId}
                      media={<AssetImage imageAssetId={category.imageAssetId} />}
                      meta={<DatabaseVerificationBadge status={statusFor(entryCountFor(category.id))} />}
                      title={category.label}
                    />
                  </a>
                ))}
              </Grid>
            </div>
          </FeatureSection>
        </Section>
        <Section className="database-index__details">
          <h2>What the database contains</h2>
          <ul>
            <li>Skills and equipment references.</li>
            <li>Cards and artifacts collections.</li>
            <li>Monsters, bosses and maps collections.</li>
          </ul>
          <aside className="database-verification-notice">No unverified stats, drops, skills or map details are added. Information will be updated when official SpiritVale sources confirm it.</aside>
          <h3>Update frequency</h3>
          <p>There is no fixed public update schedule. The database is reviewed when official SpiritVale sources publish information that can be verified.</p>
          <p>For broader context, visit the <a className="sv-focusable" href="/">PlayAIG home page</a> or continue with the <a className="sv-focusable" href="/guides/">SpiritVale Guides</a>.</p>
        </Section>
        <Section className="database-index__faq" id="faq">
          <h2>Frequently asked questions</h2>
          {databaseIndexFaqItems.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
        </Section>
        <Section><RelatedGuides guides={relatedGuides} /></Section>
      </div>
    </main>
  );
}
