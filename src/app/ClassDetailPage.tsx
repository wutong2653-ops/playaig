import { useEffect } from "react";
import { EmptyState, PageHeader, Section } from "../design-system";
import { classVisualAssetId, getGuidesRelatedToClass, getSource, type SpiritValeClass, type SpiritValeSource } from "../data";
import {
  ClassBreadcrumb,
  ClassConfirmedInformation,
  ClassFutureUpdates,
  ClassHeader,
  ClassLayout,
  ClassOverview,
  ClassSources,
  ClassUnverifiedInformation,
  ClassVerificationStatus,
  RelatedGuides
} from "../components";
import { applyClassMetadata } from "./site";

export function ClassDetailPage({ gameClass }: { gameClass: SpiritValeClass }) {
  const sources = gameClass.sourceIds.map(getSource).filter((source): source is SpiritValeSource => Boolean(source));
  const relatedGuides = getGuidesRelatedToClass(gameClass.id);

  useEffect(() => {
    applyClassMetadata(gameClass);
  }, [gameClass]);

  return (
    <main id="main-content">
      <div className="sv-container class-page">
        <Section className="class-page__breadcrumb"><ClassBreadcrumb gameClass={gameClass} /></Section>
        <ClassLayout>
          <ClassHeader gameClass={gameClass} imageAssetId={classVisualAssetId} />
          <ClassOverview gameClass={gameClass} sources={sources} />
          <ClassConfirmedInformation gameClass={gameClass} sources={sources} />
          <ClassUnverifiedInformation />
          <ClassVerificationStatus gameClass={gameClass} />
          <ClassFutureUpdates />
          <RelatedGuides guides={relatedGuides} />
          <ClassSources sources={sources} />
          <aside className="class-disclaimer">SpiritVale and related game assets are trademarks and copyrighted materials of Baikun Interactive. This independent fan site is not affiliated with or endorsed by Baikun Interactive.</aside>
        </ClassLayout>
      </div>
    </main>
  );
}

export function ClassNotFoundPage() {
  return (
    <main id="main-content">
      <div className="sv-container site-safe-route">
        <PageHeader description="The requested class is not part of the confirmed SpiritVale base-class collection." title="Class not found" />
        <EmptyState description="Use the Classes index to browse the seven confirmed base classes." title="This class is unavailable" />
      </div>
    </main>
  );
}
