import { type ReactNode } from "react";
import { Badge, Breadcrumb, Tag } from "../../design-system";
import { AssetImage } from "../../data";
import type { SpiritValeClass, SpiritValeSource } from "../../data";
import { VerificationBadge } from "../guides";

export function ClassLayout({ children }: { children: ReactNode }) {
  return <article className="class-layout">{children}</article>;
}

export function ClassBreadcrumb({ gameClass }: { gameClass?: SpiritValeClass }) {
  const items = gameClass
    ? [{ href: "/", label: "Home" }, { href: "/classes/", label: "Classes" }, { current: true, label: gameClass.name }]
    : [{ href: "/", label: "Home" }, { current: true, label: "Classes" }];
  return <Breadcrumb items={items} />;
}

export function ClassHeader({ gameClass, imageAssetId }: { gameClass: SpiritValeClass; imageAssetId: string }) {
  return (
    <header className="class-header">
      <div className="class-header__meta">
        <Tag>Base Class</Tag>
        <VerificationBadge status={gameClass.verificationStatus} />
      </div>
      <h1>{gameClass.name}</h1>
      <p>{gameClass.name} is an officially confirmed SpiritVale base class. No unverified role, weapon, stat, skill, or build claim is shown here.</p>
      <AssetImage className="class-header__image" imageAssetId={imageAssetId} priority />
      <p className="class-header__caption">Official general class artwork. It is not presented as an individual {gameClass.name} portrait.</p>
    </header>
  );
}

function ClassSourceMarkers({ sourceIds, sources }: { sourceIds: string[]; sources: SpiritValeSource[] }) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  return (
    <span className="class-source-markers">
      {sourceIds.map((sourceId) => {
        const source = sourceById.get(sourceId);
        return source ? <a aria-label={"Source: " + source.name} className="sv-focusable" href={"#source-" + source.id} key={source.id}>[source]</a> : null;
      })}
    </span>
  );
}

export function ClassOverview({ gameClass, sources }: { gameClass: SpiritValeClass; sources: SpiritValeSource[] }) {
  return (
    <section className="class-section" id="overview">
      <h2>Overview</h2>
      <p>{gameClass.name} is listed by official SpiritVale material as one of the game&apos;s seven base classes.<ClassSourceMarkers sourceIds={gameClass.sourceIds} sources={sources} /></p>
    </section>
  );
}

export function ClassConfirmedInformation({ gameClass, sources }: { gameClass: SpiritValeClass; sources: SpiritValeSource[] }) {
  return (
    <section className="class-section" id="officially-confirmed">
      <h2>Officially Confirmed Information</h2>
      <ul>
        <li><strong>Name:</strong> {gameClass.name}</li>
        <li><strong>Classification:</strong> Base Class</li>
      </ul>
      <p>These are the only individual {gameClass.name} facts currently recorded with a first-party SpiritVale source.<ClassSourceMarkers sourceIds={gameClass.sourceIds} sources={sources} /></p>
    </section>
  );
}

export function ClassUnverifiedInformation() {
  return (
    <section className="class-section" id="not-yet-verified">
      <h2>Information Not Yet Verified</h2>
      <aside className="class-unverified-notice">This information has not yet been confirmed by official SpiritVale sources.</aside>
      <p>Role, weapon, main stat, difficulty, skills, strengths, weaknesses, build, equipment, progression, and advanced-class details are intentionally omitted until a first-party source confirms them.</p>
    </section>
  );
}

export function ClassVerificationStatus({ gameClass }: { gameClass: SpiritValeClass }) {
  const label = gameClass.verificationStatus === "partially-verified" ? "Partially verified" : gameClass.verificationStatus;
  return (
    <section className="class-section" id="verification-status">
      <h2>Verification Status</h2>
      <p>This class record is currently <strong>{label}</strong>: its name and Base Class identity are supported by the registered official source, while further individual details are not yet confirmed.</p>
    </section>
  );
}

export function ClassFutureUpdates() {
  return (
    <section className="class-section" id="future-updates">
      <h2>Future Updates</h2>
      <p>This page will be updated when official SpiritVale sources provide verifiable information for this base class.</p>
    </section>
  );
}

export function ClassSources({ sources }: { sources: SpiritValeSource[] }) {
  return (
    <section className="class-sources" id="sources">
      <h2>Sources</h2>
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

export function ClassVerificationNotice() {
  return (
    <aside className="class-verification-notice">
      Class pages distinguish officially confirmed base-class information from details that are not yet verified.
    </aside>
  );
}

export function BaseClassLabel() {
  return <Badge>Base Class</Badge>;
}
