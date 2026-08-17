import { useEffect } from "react";
import { EmptyState, PageHeader, Section } from "../design-system";
import {
  getClasses,
  getGuideCategories,
  getGuidesByIds,
  getSource,
  type SpiritValeGuide,
  type SpiritValeSource
} from "../data";
import {
  GuideBreadcrumb,
  GuideFaq,
  GuideHeader,
  GuideLayout,
  GuideSection,
  GuideSources,
  GuideTableOfContents,
  RelatedGuides
} from "../components";
import { applyGuideMetadata } from "./site";
import { getGuideLandingContent } from "./seoLandingContent";

export function GuideDetailPage({ guide }: { guide: SpiritValeGuide }) {
  const classes = getClasses();
  const categories = getGuideCategories();
  const categoryName = categories.find((category) => category.id === guide.guideTypeId)?.name ?? "Guides";
  const sources = guide.sourceIds.map(getSource).filter((source): source is SpiritValeSource => Boolean(source));
  const relatedGuides = getGuidesByIds(guide.relatedGuideIds).filter((relatedGuide) => relatedGuide.id !== guide.id);
  const landing = getGuideLandingContent(guide.slug);
  const faqItems = landing
    ? [...guide.faqItems, ...landing.faq.map((item, index) => ({ id: guide.id + "-seo-faq-" + index, ...item, sourceIds: guide.sourceIds }))]
    : guide.faqItems;

  useEffect(() => {
    applyGuideMetadata(guide);
  }, [guide]);

  return (
    <main id="main-content">
      <div className="sv-container guide-page">
        <Section className="guide-page__breadcrumb">
          <GuideBreadcrumb guide={guide} />
        </Section>
        <GuideLayout tableOfContents={<GuideTableOfContents sections={guide.sections} />}>
          <GuideHeader categoryName={categoryName} guide={guide} title={landing?.h1} />
          {guide.intro ? <p className="guide-page__intro">{guide.intro}</p> : null}
          <GuideTableOfContents sections={guide.sections} />
          {guide.sections.map((section) => <GuideSection classes={classes} key={section.id} section={section} sources={sources} />)}
          {landing ? (
            <section className="seo-landing-content" aria-label={landing.h1}>
              {landing.sections.map((section) => (
                <section className="seo-landing-content__section" id={section.heading.toLowerCase().replaceAll(" ", "-")} key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                </section>
              ))}
              <section className="seo-landing-content__section" id="related-database-pages">
                <h2>Related Guides and Pages</h2>
                <ul>{landing.links.map((link) => <li key={link.href}><a className="sv-focusable" href={link.href}>{link.label}</a></li>)}</ul>
              </section>
            </section>
          ) : null}
          <GuideSources sources={sources} />
          <GuideFaq items={faqItems} sources={sources} />
          <RelatedGuides guides={relatedGuides} />
          <aside className="guide-disclaimer">
            SpiritVale and related game assets are trademarks and copyrighted materials of Baikun Interactive. This independent fan site is not affiliated with or endorsed by Baikun Interactive.
          </aside>
        </GuideLayout>
      </div>
    </main>
  );
}

export function GuideNotFoundPage() {
  return (
    <main id="main-content">
      <div className="sv-container site-safe-route">
        <PageHeader description="The requested guide is not part of the published SpiritVale Guide collection." title="Guide not found" />
        <EmptyState description="Use the Guides index to browse the verified guide collection." title="This guide is unavailable" />
      </div>
    </main>
  );
}
