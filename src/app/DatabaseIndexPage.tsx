import { useEffect } from "react";
import { DatabaseCard, FeatureSection, Grid, HeroBanner, Section } from "../design-system";
import { AssetImage, getDatabaseCategories, getGuidesRelatedToDatabaseCategory } from "../data";
import { DatabaseBreadcrumb, DatabaseVerificationBadge, RelatedGuides } from "../components";
import { applyDatabaseIndexMetadata } from "./site";

export function DatabaseIndexPage() {
  const categories = getDatabaseCategories();
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
            description="Browse officially verified SpiritVale game data including skills, equipment, cards, artifacts, monsters, bosses and maps."
            imageAssetId="sv-home-hero"
            media={<AssetImage imageAssetId="sv-home-hero" priority />}
            title="SpiritVale Database"
          />
        </Section>
        <Section>
          <FeatureSection description="Every category reads its existing formal collection. Empty collections remain empty until official information is registered." title="Database Categories">
            <Grid>
              {categories.map((category) => (
                <a aria-label={"Browse " + category.label + " database"} className="home-card-link sv-focusable" href={category.path} key={category.id}>
                  <DatabaseCard
                    description="Data Collection In Progress"
                    imageAssetId={category.imageAssetId}
                    media={<AssetImage imageAssetId={category.imageAssetId} />}
                    meta={<DatabaseVerificationBadge status="awaiting-official-information" />}
                    title={category.label}
                  />
                </a>
              ))}
            </Grid>
          </FeatureSection>
        </Section>
        <Section><aside className="database-verification-notice">Database entries are shown only after their details can be tied to a registered official SpiritVale source.</aside></Section>
        <Section><RelatedGuides guides={relatedGuides} /></Section>
      </div>
    </main>
  );
}
