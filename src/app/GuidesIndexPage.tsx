import { useEffect } from "react";
import {
  Badge,
  EmptyState,
  FeatureSection,
  Grid,
  GuideCard,
  PageHeader,
  Section
} from "../design-system";
import {
  AssetImage,
  getGuideCategories,
  getGuides
} from "../data";
import { GuideBreadcrumb, VerificationBadge } from "../components";
import { applyGuidesIndexMetadata } from "./site";

export function GuidesIndexPage() {
  const guides = getGuides();
  const categories = getGuideCategories();
  const featuredGuide = guides.find((guide) => guide.guideTypeId === "guide-type-beginner") ?? null;

  useEffect(() => {
    applyGuidesIndexMetadata(guides.map((guide) => guide.id));
  }, [guides]);

  return (
    <main id="main-content">
      <div className="sv-container guides-index">
        <Section className="guides-index__header">
          <GuideBreadcrumb />
          <PageHeader
            description="Verified-source guides for the SpiritVale systems currently described by official materials."
            title="SpiritVale Guides"
          />
        </Section>
        <Section>
          <FeatureSection description="Start with the first guide in the collection; it distinguishes confirmed information from details that still need verification." title="Featured Guide" variant="highlighted">
            {featuredGuide ? (
              <a className="home-card-link sv-focusable" href={featuredGuide.seo.canonicalPath}>
                <GuideCard
                  description={featuredGuide.shortDescription ?? "Verified guide information."}
                  imageAssetId={featuredGuide.imageAssetIds[0]}
                  media={<AssetImage imageAssetId={featuredGuide.imageAssetIds[0]} />}
                  meta={<VerificationBadge status={featuredGuide.factReviewStatus} />}
                  title={featuredGuide.name}
                  variant="featured"
                />
              </a>
            ) : <EmptyState description="Guide data collection is in progress." title="Featured guide unavailable" />}
          </FeatureSection>
        </Section>
        <Section>
          <FeatureSection description="Each guide is supplied by the existing Guide data collection." title="All Guides">
            {guides.length ? (
              <Grid>
                {guides.map((guide) => (
                  <a className="home-card-link sv-focusable" href={guide.seo.canonicalPath} key={guide.id}>
                    <GuideCard
                      description={guide.shortDescription ?? "Verified guide information."}
                      imageAssetId={guide.imageAssetIds[0]}
                      media={<AssetImage imageAssetId={guide.imageAssetIds[0]} />}
                      meta={<VerificationBadge status={guide.factReviewStatus} />}
                      title={guide.name}
                    />
                  </a>
                ))}
              </Grid>
            ) : <EmptyState description="Guide data collection is in progress." title="No guides available" />}
          </FeatureSection>
        </Section>
        <Section>
          <FeatureSection description="Categories are read from the existing SpiritVale guide taxonomy." title="Guide Categories">
            <div className="guides-index__categories">
              {categories.map((category) => <Badge key={category.id}>{category.name}</Badge>)}
            </div>
          </FeatureSection>
        </Section>
        <Section>
          <aside className="guide-verification-notice">
            Guide content is based on official SpiritVale sources. Details that cannot yet be verified are omitted rather than guessed.
          </aside>
        </Section>
      </div>
    </main>
  );
}
