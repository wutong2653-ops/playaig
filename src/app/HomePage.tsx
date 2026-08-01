import { type FormEvent, type KeyboardEvent, useEffect, useState } from "react";
import {
  Badge,
  Button,
  ClassCard,
  Container,
  DatabaseCard,
  EmptyState,
  FeatureSection,
  Grid,
  GuideCard,
  HeroBanner,
  Icon,
  SearchBar,
  Section
} from "../design-system";
import { AssetImage, databaseCategories, getClasses, getGuides, getOfficialSteamSource, getGuideCategories } from "../data";
import type { SpiritValeGuide } from "../data";
import { applyHomepageMetadata } from "./site";

const worldFeatures = [
  {
    title: "World Exploration",
    imageAssetId: "sv-home-meadow-hero-02",
    description: "Explore official SpiritVale world imagery and future map references."
  },
  {
    title: "Dungeons and Combat",
    imageAssetId: "sv-gameplay-dungeon-battle-03",
    description: "Browse visual references from officially supplied gameplay scenes."
  },
  {
    title: "Boss Encounters",
    imageAssetId: "sv-boss-dungeon-arena-02",
    description: "Follow verified boss encounter references as the collection grows."
  },
  {
    title: "Towns and Biomes",
    imageAssetId: "sv-map-mushroom-forest-02",
    description: "Discover official views of different SpiritVale environments."
  }
] as const;

function guideDescription(guide: SpiritValeGuide) {
  return guide.summary ?? guide.shortDescription ?? guide.description ?? "Verified information will be added as official sources become available.";
}

function verificationLabel(guide: SpiritValeGuide) {
  return guide.factReviewStatus === "verified" ? "Verified Information" : "Partially Verified";
}

export function HomePage() {
  const [query, setQuery] = useState("");
  const classes = getClasses();
  const guides = getGuides();
  const guideCategories = getGuideCategories();
  const steamSource = getOfficialSteamSource();

  useEffect(() => {
    applyHomepageMetadata();
  }, []);

  function navigateToSearch() {
    const path = "/search/?q=" + encodeURIComponent(query.trim());
    window.location.assign(path);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigateToSearch();
  }

  function submitSearchOnEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      navigateToSearch();
    }
  }

  return (
    <>
      <main id="main-content">
        <Container>
          <Section className="home-section--hero">
            <HeroBanner
              actions={
                <div className="home-hero__actions">
                  <a className="sv-button sv-button--primary sv-focusable" href="/guides/">Explore Guides</a>
                  <a className="sv-button sv-button--outline sv-focusable" href="/classes/">Browse Classes</a>
                </div>
              }
              className="home-hero"
              description="Explore verified SpiritVale guides, classes, progression references and game database resources based on official sources."
              eyebrow="PlayAIG"
              gameName="SpiritVale"
              imageAssetId="sv-home-hero"
              media={<AssetImage imageAssetId="sv-home-hero" priority />}
              status={<Badge className="home-hero__status-badge">Verified Game Wiki</Badge>}
              title="SpiritVale Wiki, Guides and Game Database"
              trustSignals={<><Badge>Official Sources</Badge><Badge>Verified Information</Badge><Badge>No Unverified Data</Badge></>}
            />
          </Section>

          <Section aria-label="Quick search" className="home-section--quick-search">
            <FeatureSection className="home-search-section" description="Search the verified reference collection and continue where official information is available." title="Find your next reference">
              <form className="home-search-form" onSubmit={submitSearch}>
                <SearchBar
                  aria-label="Search SpiritVale references"
                  onKeyDown={submitSearchOnEnter}
                  onValueChange={setQuery}
                  placeholder="Search guides, classes, bosses and game data..."
                  value={query}
                />
                <Button type="submit">Search</Button>
              </form>
            </FeatureSection>
          </Section>

          <Section id="guides" className="home-section--guides">
            <FeatureSection className="home-guides-section" description="Start with the essential systems and progression basics, then continue through the current source-led guide collection." title="Featured Guides">
              {guides.length ? (
                <Grid className="home-guide-grid">
                  {guides.map((guide, index) => {
                    const guideType = guideCategories.find((category) => category.id === guide.guideTypeId)?.name ?? "Guide";
                    const imageAssetId = guide.imageAssetIds[index === 0 ? 0 : 1] ?? guide.imageAssetIds[0];
                    return (
                      <a className="home-card-link home-guide-link sv-focusable" href={guide.seo.canonicalPath} key={guide.id}>
                        <GuideCard
                          className={index === 0 ? "home-guide-card home-guide-card--lead" : "home-guide-card"}
                          description={guideDescription(guide)}
                          imageAssetId={imageAssetId}
                          media={<AssetImage imageAssetId={imageAssetId} />}
                          meta={<><Badge>{guideType}</Badge><Badge tone={guide.factReviewStatus === "verified" ? "success" : "warning"}>{verificationLabel(guide)}</Badge></>}
                          title={guide.name}
                          variant={index === 0 ? "featured" : "default"}
                        />
                      </a>
                    );
                  })}
                </Grid>
              ) : <EmptyState description="Guide data collection is in progress." title="Featured guides are coming soon" />}
            </FeatureSection>
          </Section>

          <Section id="classes">
            <FeatureSection className="home-classes-section" description="The seven verified base class names are shown here without inferred roles, weapons, or skills." title="Explore Classes" variant="highlighted">
              {classes.length ? (
                <Grid className="home-class-grid">
                  {classes.map((gameClass) => (
                    <a className="home-card-link sv-focusable" href={"/classes/" + gameClass.slug + "/"} key={gameClass.id}>
                      <ClassCard
                        className="home-class-card"
                        description="Officially confirmed base class."
                        meta={<><Badge>Base Class</Badge><Badge tone="warning">Partially Verified</Badge></>}
                        title={<><span aria-hidden="true" className="home-class-card__initial">{gameClass.name.slice(0, 1)}</span><span>{gameClass.name}</span></>}
                        variant="compact"
                      />
                    </a>
                  ))}
                </Grid>
              ) : <EmptyState description="Class data collection is in progress." title="Classes are coming soon" />}
            </FeatureSection>
          </Section>

          <Section id="database">
            <FeatureSection className="home-database-section" description="Data collection is in progress. These links lead to safely marked planned sections, not unverified database records." title="Game Database">
              <Grid className="home-database-grid">
                {databaseCategories.map((category) => (
                  <a className="home-card-link sv-focusable" href={category.path} key={category.id}>
                    <DatabaseCard
                      className="home-database-card"
                      description={category.description}
                      meta={<Badge tone="warning">Data Collection In Progress</Badge>}
                      title={<><span className="home-database-card__icon"><Icon name={category.icon} /></span><span>{category.label}</span></>}
                      variant="compact"
                    />
                  </a>
                ))}
              </Grid>
            </FeatureSection>
          </Section>

          <Section id="explore">
            <FeatureSection className="home-explore-section" description="A visual index built from registered official images, without assigning unverified proper names to maps, bosses, or story locations." title="Explore SpiritVale" variant="highlighted">
              <div className="home-world-grid">
                {worldFeatures.map((feature) => (
                  <article className="home-world-card" key={feature.title}>
                    <AssetImage imageAssetId={feature.imageAssetId} />
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </FeatureSection>
          </Section>

          <Section id="updates" className="home-section--updates">
            <EmptyState
              action={steamSource ? <a className="sv-button sv-button--outline sv-focusable" href={steamSource.url} rel="noopener noreferrer" target="_blank">Visit Official Steam Page</a> : undefined}
              description="Verified official updates and change summaries will appear here when new information is available."
              title="Latest SpiritVale Updates"
            />
          </Section>
        </Container>
      </main>
    </>
  );
}
