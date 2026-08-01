import { useEffect } from "react";
import { ClassCard, FeatureSection, Grid, HeroBanner, Section } from "../design-system";
import { AssetImage, classVisualAssetId, getClasses, getGuides } from "../data";
import { BaseClassLabel, ClassBreadcrumb, ClassVerificationNotice, RelatedGuides, VerificationBadge } from "../components";
import { applyClassesIndexMetadata } from "./site";

export function ClassesIndexPage() {
  const classes = getClasses();
  const classIds = new Set(classes.map((gameClass) => gameClass.id));
  const relatedGuides = getGuides().filter((guide) => guide.relatedClassIds.some((classId) => classIds.has(classId)));

  useEffect(() => {
    applyClassesIndexMetadata(classes.map((gameClass) => gameClass.id));
  }, [classes]);

  return (
    <main id="main-content">
      <div className="sv-container classes-index">
        <Section className="classes-index__header">
          <ClassBreadcrumb />
          <HeroBanner
            description="Explore all officially confirmed SpiritVale base classes and follow future verified class updates."
            imageAssetId={classVisualAssetId}
            media={<AssetImage imageAssetId={classVisualAssetId} priority />}
            title="SpiritVale Classes"
          />
        </Section>
        <Section>
          <FeatureSection description="Each class card reads from the formal SpiritVale class collection. Individual class artwork is not yet confirmed, so the shared official class banner is used consistently." title="Base Classes">
            <Grid>
              {classes.map((gameClass) => (
                <a aria-label={"View details for " + gameClass.name} className="home-card-link sv-focusable" href={"/classes/" + gameClass.slug + "/"} key={gameClass.id}>
                  <ClassCard
                    description={<><BaseClassLabel /><span className="classes-index__details">View Details</span></>}
                    imageAssetId={classVisualAssetId}
                    media={<AssetImage imageAssetId={classVisualAssetId} />}
                    meta={<VerificationBadge status={gameClass.verificationStatus} />}
                    title={gameClass.name}
                  />
                </a>
              ))}
            </Grid>
          </FeatureSection>
        </Section>
        <Section><ClassVerificationNotice /></Section>
        <Section><RelatedGuides guides={relatedGuides} /></Section>
      </div>
    </main>
  );
}
