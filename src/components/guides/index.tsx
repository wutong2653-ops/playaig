import { useState, type ReactNode } from "react";
import {
  Badge,
  Breadcrumb,
  GuideCard,
  Tag
} from "../../design-system";
import { AssetImage } from "../../data";
import type {
  SpiritValeClass,
  SpiritValeGuide,
  SpiritValeGuideContentBlock,
  SpiritValeGuideFaqItem,
  SpiritValeGuideSection,
  SpiritValeSource
} from "../../data";

export type GuideLayoutProps = {
  children: ReactNode;
  tableOfContents: ReactNode;
};

export function GuideLayout({ children, tableOfContents }: GuideLayoutProps) {
  return (
    <div className="guide-layout">
      <article className="guide-layout__article">{children}</article>
      <aside className="guide-layout__aside">{tableOfContents}</aside>
    </div>
  );
}

export function VerificationBadge({
  status
}: {
  status: SpiritValeGuide["factReviewStatus"] | SpiritValeClass["verificationStatus"];
}) {
  const labels = {
    verified: "Verified",
    "partially-verified": "Partially verified",
    unverified: "Awaiting more official details"
  };
  const tones = {
    verified: "success",
    "partially-verified": "warning",
    unverified: "primary"
  } as const;
  return <Badge tone={tones[status]}>{labels[status]}</Badge>;
}

export type GuideHeaderProps = {
  guide: SpiritValeGuide;
  categoryName: string;
};

export function GuideHeader({ categoryName, guide }: GuideHeaderProps) {
  const heroAssetId = guide.imageAssetIds[0];
  return (
    <header className="guide-header">
      <div className="guide-header__meta">
        <Tag>{categoryName}</Tag>
        <VerificationBadge status={guide.factReviewStatus} />
      </div>
      <h1>{guide.name}</h1>
      {guide.summary ? <p className="guide-header__summary">{guide.summary}</p> : null}
      {guide.reviewedAt ? <p className="guide-header__reviewed">Last reviewed: {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(guide.reviewedAt))}</p> : null}
      {heroAssetId ? <AssetImage className="guide-header__image" imageAssetId={heroAssetId} priority /> : null}
    </header>
  );
}

export type GuideTableOfContentsProps = {
  sections: SpiritValeGuideSection[];
};

export function GuideTableOfContents({ sections }: GuideTableOfContentsProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav aria-label="Guide table of contents" className="guide-toc">
      <button aria-expanded={isOpen} className="guide-toc__toggle sv-button sv-button--outline sv-focusable" onClick={() => setOpen((open) => !open)} type="button">
        Table of contents
      </button>
      <ol className={isOpen ? "guide-toc__list guide-toc__list--open" : "guide-toc__list"}>
        {sections.map((section) => <li key={section.id}><a className="sv-focusable" href={"#" + section.anchor}>{section.heading}</a></li>)}
      </ol>
    </nav>
  );
}

function GuideSourceMarkers({
  sourceIds,
  sources
}: {
  sourceIds: string[];
  sources: SpiritValeSource[];
}) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  if (!sourceIds.length) return null;
  return (
    <span className="guide-source-markers">
      {sourceIds.map((sourceId) => {
        const source = sourceById.get(sourceId);
        return source ? <a aria-label={"Source: " + source.name} className="sv-focusable" href={"#source-" + source.id} key={source.id}>[source]</a> : null;
      })}
    </span>
  );
}

function GuideContentBlock({
  block,
  classes,
  sources
}: {
  block: SpiritValeGuideContentBlock;
  classes: SpiritValeClass[];
  sources: SpiritValeSource[];
}) {
  if (block.type === "list") {
    return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  }
  if (block.type === "callout") {
    return <aside className="guide-callout">{block.text}<GuideSourceMarkers sourceIds={block.sourceIds} sources={sources} /></aside>;
  }
  if (block.type === "image" && block.imageAssetId) {
    return <figure><AssetImage imageAssetId={block.imageAssetId} /><figcaption>{block.caption}</figcaption></figure>;
  }
  if (block.type === "class-list") {
    return (
      <div className="guide-class-list">
        {block.text ? <p>{block.text}<GuideSourceMarkers sourceIds={block.sourceIds} sources={sources} /></p> : null}
        <ul>{classes.map((gameClass) => <li key={gameClass.id}><strong>{gameClass.name}</strong> <span>Base Class</span></li>)}</ul>
      </div>
    );
  }
  return (
    <>
      {block.text ? <p>{block.text}<GuideSourceMarkers sourceIds={block.sourceIds} sources={sources} /></p> : null}
      {block.imageAssetId ? (
        <figure>
          <AssetImage imageAssetId={block.imageAssetId} />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      ) : null}
    </>
  );
}

export function GuideSection({
  section,
  classes,
  sources
}: {
  section: SpiritValeGuideSection;
  classes: SpiritValeClass[];
  sources: SpiritValeSource[];
}) {
  return (
    <section className="guide-section" id={section.anchor}>
      <h2>{section.heading}</h2>
      {section.contentBlocks.map((block, index) => <GuideContentBlock block={block} classes={classes} key={section.id + "-" + index} sources={sources} />)}
    </section>
  );
}

export function GuideSources({ sources }: { sources: SpiritValeSource[] }) {
  return (
    <section className="guide-sources" id="sources">
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

export function GuideFaq({ items, sources }: { items: SpiritValeGuideFaqItem[]; sources: SpiritValeSource[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  if (!items.length) return null;
  return (
    <section className="guide-faq" id="faq">
      <h2>Frequently asked questions</h2>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div className="guide-faq__item" key={item.id}>
            <button aria-expanded={isOpen} className="sv-focusable" onClick={() => setOpenId(isOpen ? null : item.id)} type="button">{item.question}</button>
            {isOpen ? <p>{item.answer}<GuideSourceMarkers sourceIds={item.sourceIds} sources={sources} /></p> : null}
          </div>
        );
      })}
    </section>
  );
}

export function RelatedGuides({ guides }: { guides: SpiritValeGuide[] }) {
  if (!guides.length) return null;
  return (
    <section className="guide-related" id="related-guides">
      <h2>Related Guides</h2>
      <div className="guide-related__grid">
        {guides.map((guide) => (
          <a className="home-card-link sv-focusable" href={guide.seo.canonicalPath} key={guide.id}>
            <GuideCard
              description={guide.shortDescription ?? "Verified guide information."}
              imageAssetId={guide.imageAssetIds[0]}
              media={<AssetImage imageAssetId={guide.imageAssetIds[0]} />}
              meta={<VerificationBadge status={guide.factReviewStatus} />}
              title={guide.name}
              variant="featured"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export function GuideBreadcrumb({ guide }: { guide?: SpiritValeGuide }) {
  const items = guide
    ? [{ href: "/", label: "Home" }, { href: "/guides/", label: "Guides" }, { current: true, label: guide.name }]
    : [{ href: "/", label: "Home" }, { current: true, label: "Guides" }];
  return <Breadcrumb items={items} />;
}
