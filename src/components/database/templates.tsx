import { type ReactNode } from "react";
import { Badge, Breadcrumb, EmptyState, Tag } from "../../design-system";
import { AssetImage } from "../../data";
import type { DatabaseCategory, SpiritValeSource } from "../../data";

export type DatabaseVerificationStatus = "verified" | "partially-verified" | "awaiting-official-information";

function singularCategoryName(category: DatabaseCategory) {
  const names: Record<DatabaseCategory["id"], string> = {
    skills: "skill",
    equipment: "equipment",
    cards: "card",
    artifacts: "artifact",
    monsters: "monster",
    bosses: "boss",
    maps: "map"
  };
  return names[category.id];
}

export function DatabaseLayout({ children }: { children: ReactNode }) {
  return <article className="database-layout">{children}</article>;
}

export function DatabaseBreadcrumb({ category }: { category?: DatabaseCategory }) {
  const items = category
    ? [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { current: true, label: category.label }]
    : [{ href: "/", label: "Home" }, { current: true, label: "Database" }];
  return <Breadcrumb items={items} />;
}

export function DatabaseVerificationBadge({ status }: { status: DatabaseVerificationStatus }) {
  const presentation = {
    verified: { label: "Verified", tone: "success" },
    "partially-verified": { label: "Partially Verified", tone: "warning" },
    "awaiting-official-information": { label: "Awaiting Official Information", tone: "primary" }
  } as const;
  return <Badge tone={presentation[status].tone}>{presentation[status].label}</Badge>;
}

export function DatabaseHeader({ category, status }: { category: DatabaseCategory; status: DatabaseVerificationStatus }) {
  return (
    <header className="database-header">
      <div className="database-header__meta"><Tag>Database Category</Tag><DatabaseVerificationBadge status={status} /></div>
      <h1>SpiritVale {category.label} Database</h1>
      <p>{category.description}</p>
      <AssetImage className="database-header__image" imageAssetId={category.imageAssetId} priority />
      <p className="database-header__caption">This image is a general official visual rather than a verified database entry.</p>
    </header>
  );
}

export function DatabaseCurrentStatus({ category, entryCount, status }: { category: DatabaseCategory; entryCount: number; status: DatabaseVerificationStatus }) {
  const name = singularCategoryName(category);
  return (
    <section className="database-section" id="current-status">
      <h2>Current Database Status</h2>
      <DatabaseVerificationBadge status={status} />
      <p>{entryCount === 0 ? "Data Collection In Progress. No verified " + name + " entries are available." : entryCount + " verified " + name + " entries are available."}</p>
    </section>
  );
}

export function DatabaseEmptyEntries({ category }: { category: DatabaseCategory }) {
  const name = singularCategoryName(category);
  return (
    <section className="database-section" id="verified-entries">
      <h2>Verified Entries</h2>
      <EmptyState
        action={<a className="sv-button sv-button--outline sv-focusable" href="/guides/">Browse Guides</a>}
        description={"No verified " + name + " entries are available. Future verified " + name + " data will appear here."}
        title="Data Collection In Progress"
      />
      <aside className="database-verification-notice">Only entries supported by registered official SpiritVale sources will be added to this collection.</aside>
    </section>
  );
}

export function DatabaseSources({ sources }: { sources: SpiritValeSource[] }) {
  return (
    <section className="database-sources" id="sources">
      <h2>Sources and References</h2>
      <ol>
        {sources.map((source) => (
          <li id={"source-" + source.id} key={source.id}>
            <a className="sv-focusable" href={source.url} rel="noopener noreferrer" target="_blank">{source.name}</a>
            <span>{source.owner} · {source.sourceType}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function DatabaseDisclaimer() {
  return <aside className="database-disclaimer">SpiritVale and related game assets are trademarks and copyrighted materials of Baikun Interactive. This independent fan site is not affiliated with or endorsed by Baikun Interactive.</aside>;
}
