import { type ReactNode } from "react";
import { Badge, Breadcrumb, EmptyState, Tag } from "../../design-system";
import { AssetImage } from "../../data";
import type { DatabaseCategory, SpiritValeCard, SpiritValeEquipment, SpiritValeMonster, SpiritValeSkill, SpiritValeSource } from "../../data";

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

export function CardEntityBreadcrumb({ card }: { card?: SpiritValeCard }) {
  const items = card
    ? [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { href: "/database/cards/", label: "Cards" }, { current: true, label: card.name }]
    : [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { current: true, label: "Cards" }];
  return <Breadcrumb items={items} />;
}

export function EquipmentEntityBreadcrumb({ equipment }: { equipment?: SpiritValeEquipment }) {
  const items = equipment
    ? [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { href: "/database/equipment/", label: "Equipment" }, { current: true, label: equipment.name }]
    : [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { current: true, label: "Equipment" }];
  return <Breadcrumb items={items} />;
}

export function MonsterEntityBreadcrumb({ monster }: { monster?: SpiritValeMonster }) {
  const items = monster
    ? [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { href: "/database/monsters/", label: "Monsters" }, { current: true, label: monster.name }]
    : [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { current: true, label: "Monsters" }];
  return <Breadcrumb items={items} />;
}

export function SkillEntityBreadcrumb({ skill }: { skill?: SpiritValeSkill }) {
  const items = skill
    ? [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { href: "/database/skills/", label: "Skills" }, { current: true, label: skill.name }]
    : [{ href: "/", label: "Home" }, { href: "/database/", label: "Database" }, { current: true, label: "Skills" }];
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

export function DatabaseHeader({ category, status, title }: { category: DatabaseCategory; status: DatabaseVerificationStatus; title?: string }) {
  return (
    <header className="database-header">
      <div className="database-header__meta"><Tag>Database Category</Tag><DatabaseVerificationBadge status={status} /></div>
      <h1>{title ?? "SpiritVale " + category.label + " Database"}</h1>
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
      <aside className="database-verification-notice">Only entries supported by registered, evidence-backed SpiritVale sources will be added to this collection.</aside>
    </section>
  );
}

export function CardEntityList({ cards }: { cards: SpiritValeCard[] }) {
  return (
    <section className="database-section card-entity-list" id="card-list">
      <h2>Verified Card List</h2>
      <div className="card-entity-list__grid">
        {cards.map((card) => (
          <a className="home-card-link sv-focusable" href={"/database/cards/" + card.slug + "/"} key={card.id}>
            <article className="sv-card card-entity-list__item">
              <div className="sv-card__content">
                <div className="sv-card__meta"><DatabaseVerificationBadge status="verified" /></div>
                <h3>{card.name}</h3>
                <p>{card.description ?? "Verified SpiritVale card information."}</p>
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}

export function EquipmentEntityList({ equipment }: { equipment: SpiritValeEquipment[] }) {
  return (
    <section className="database-section card-entity-list" id="equipment-list">
      <h2>Verified Equipment List</h2>
      <div className="card-entity-list__grid">
        {equipment.map((item) => (
          <a className="home-card-link sv-focusable" href={"/database/equipment/" + item.slug + "/"} key={item.id}>
            <article className="sv-card card-entity-list__item">
              <div className="sv-card__content">
                <div className="sv-card__meta"><DatabaseVerificationBadge status="partially-verified" /></div>
                <h3>{item.name}</h3>
                <p>{item.shortDescription ?? "Source-backed equipment record."}</p>
                <span className="sv-card__link-label">View Equipment</span>
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}

export function MonsterEntityList({ monsters }: { monsters: SpiritValeMonster[] }) {
  return (
    <section className="database-section card-entity-list" id="monster-list">
      <h2>Verified Monster List</h2>
      <div className="card-entity-list__grid">
        {monsters.map((monster) => (
          <a className="home-card-link sv-focusable" href={"/database/monsters/" + monster.slug + "/"} key={monster.id}>
            <article className="sv-card card-entity-list__item">
              <div className="sv-card__content">
                <div className="sv-card__meta"><DatabaseVerificationBadge status="partially-verified" /></div>
                <h3>{monster.name}</h3>
                <p>{monster.level === null ? "Source-backed Monster record." : "Level " + monster.level + " source-backed Monster record."}</p>
                <span className="sv-card__link-label">View Monster</span>
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}

export function SkillEntityList({ skills }: { skills: SpiritValeSkill[] }) {
  return (
    <section className="database-section card-entity-list" id="skill-list">
      <h2>Verified Skill List</h2>
      <div className="card-entity-list__grid">
        {skills.map((skill) => (
          <a className="home-card-link sv-focusable" href={"/database/skills/" + skill.slug + "/"} key={skill.id}>
            <article className="sv-card card-entity-list__item">
              <div className="sv-card__content">
                <div className="sv-card__meta"><DatabaseVerificationBadge status="partially-verified" /></div>
                <h3>{skill.name}</h3>
                <p>{skill.shortDescription ?? "Source-backed SpiritVale skill record."}</p>
                <span className="sv-card__link-label">View Skill</span>
              </div>
            </article>
          </a>
        ))}
      </div>
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
