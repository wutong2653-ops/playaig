import { useEffect } from "react";
import { EmptyState, PageHeader, Section } from "../design-system";
import { getDatabaseEntries, getGuidesRelatedToDatabaseCategory, getOfficialSteamSource, type DatabaseCategory, type SpiritValeSource } from "../data";
import { DatabaseBreadcrumb, DatabaseCurrentStatus, DatabaseDisclaimer, DatabaseEmptyEntries, DatabaseHeader, DatabaseLayout, DatabaseSources, type DatabaseVerificationStatus, RelatedGuides } from "../components";
import { applyDatabaseCategoryMetadata } from "./site";

function statusForEntryCount(entryCount: number): DatabaseVerificationStatus {
  return entryCount === 0 ? "awaiting-official-information" : "partially-verified";
}

export function DatabaseCategoryPage({ category }: { category: DatabaseCategory }) {
  const entries = getDatabaseEntries(category.id);
  const status = statusForEntryCount(entries.length);
  const source = getOfficialSteamSource();
  const sources = source ? [source] : [] as SpiritValeSource[];
  const relatedGuides = getGuidesRelatedToDatabaseCategory(category.id);

  useEffect(() => {
    applyDatabaseCategoryMetadata(category);
  }, [category]);

  return (
    <main id="main-content">
      <div className="sv-container database-page">
        <Section className="database-page__breadcrumb"><DatabaseBreadcrumb category={category} /></Section>
        <DatabaseLayout>
          <DatabaseHeader category={category} status={status} />
          <DatabaseCurrentStatus category={category} entryCount={entries.length} status={status} />
          <DatabaseEmptyEntries category={category} />
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
