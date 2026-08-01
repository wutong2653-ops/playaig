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
import { AssetImage, databaseCategories, getClasses, getGuides, getOfficialSteamSource, getStartHereGuides } from "../data";
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

function guideDescription() {
  return "A guide shell is being prepared with verified information.";
}

export function HomePage() {
  const [query, setQuery] = useState("");
  const classes = getClasses();
  const guides = getGuides();
  const startHereGuides = getStartHereGuides();
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
                  <a className="sv-button sv-button--primary sv-focusable" href="/classes/">Explore Classes</a>
                  <a className="sv-button sv-button--outline sv-focusable" href="/guides/">Browse Guides</a>
                </div>
              }
              description="Explore SpiritVale classes, guides, skills, equipment, cards, monsters, bosses and essential progression resources."
              imageAssetId="sv-home-hero"
              media={<AssetImage imageAssetId="sv-home-hero" priority />}
              title="SpiritVale Wiki, Builds and Game Database"
            />
          </Section>

          <Section aria-label="Quick search">
            <FeatureSection description="Start with the references already being verified for SpiritVale." title="Find your next reference">
              <form className="home-search-form" onSubmit={submitSearch}>
                <SearchBar
                  aria-label="Search SpiritVale references"
                  onKeyDown={submitSearchOnEnter}
                  onValueChange={setQuery}
                  placeholder="Search classes, guides, skills, equipment and bosses..."
                  value={query}
                />
                <Button type="submit">Search</Button>
              </form>
            </FeatureSection>
          </Section>

          <Section id="start-here">
            <FeatureSection description="Start with the essential systems and progression basics." title="Start Here">
              {startHereGuides.length ? (
                <Grid>
                  {startHereGuides.map((guide) => (
                    <a className="home-card-link sv-focusable" href={guide.seo.canonicalPath} key={guide.id}>
                      <GuideCard
                        description={guideDescription()}
                        imageAssetId={guide.imageAssetIds[0]}
                        media={<AssetImage imageAssetId={guide.imageAssetIds[0]} />}
                        meta={<Badge>Guide coming soon</Badge>}
                        title={guide.name}
                      />
                    </a>
                  ))}
                </Grid>
              ) : <EmptyState description="Guide data collection is in progress." title="Start Here is coming soon" />}
            </FeatureSection>
          </Section>

          <Section id="classes">
            <FeatureSection description="The seven verified base class names are shown here without inferred roles, weapons, or skills." title="Explore Classes" variant="highlighted">
              {classes.length ? (
                <Grid>
                  {classes.map((gameClass) => (
                    <a className="home-card-link sv-focusable" href={"/classes/" + gameClass.slug + "/"} key={gameClass.id}>
                      <ClassCard
                        description="Guide coming soon"
                        meta={<Badge>Base Class</Badge>}
                        title={gameClass.name}
                        variant="compact"
                      />
                    </a>
                  ))}
                </Grid>
              ) : <EmptyState description="Class data collection is in progress." title="Classes are coming soon" />}
            </FeatureSection>
          </Section>

          <Section id="database">
            <FeatureSection description="Data collection is in progress. These links lead to safely marked planned sections, not unverified database records." title="Game Database">
              <Grid>
                {databaseCategories.map((category) => (
                  <a className="home-card-link sv-focusable" href={category.path} key={category.id}>
                    <DatabaseCard
                      description={category.description}
                      meta={<Badge tone="warning">Coming soon</Badge>}
                      title={<><Icon name={category.icon} /> {category.label}</>}
                      variant="compact"
                    />
                  </a>
                ))}
              </Grid>
            </FeatureSection>
          </Section>

          <Section id="guides">
            <FeatureSection description="Guide pages will publish only after their content is verified." title="Featured Guides">
              {guides.length ? (
                <Grid>
                  {guides.map((guide) => (
                    <a className="home-card-link sv-focusable" href={guide.seo.canonicalPath} key={guide.id}>
                      <GuideCard
                        description={guideDescription()}
                        imageAssetId={guide.imageAssetIds[1] ?? guide.imageAssetIds[0]}
                        media={<AssetImage imageAssetId={guide.imageAssetIds[1] ?? guide.imageAssetIds[0]} />}
                        meta={<Badge>Guide coming soon</Badge>}
                        title={guide.name}
                        variant="featured"
                      />
                    </a>
                  ))}
                </Grid>
              ) : <EmptyState description="Guide data collection is in progress." title="Featured guides are coming soon" />}
            </FeatureSection>
          </Section>

          <Section id="explore">
            <FeatureSection description="A visual index built from registered official images, without assigning unverified proper names to maps, bosses, or story locations." title="Explore SpiritVale" variant="highlighted">
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

          <Section id="updates">
            <EmptyState
              action={steamSource ? <a className="sv-button sv-button--outline sv-focusable" href={steamSource.url} rel="noopener noreferrer" target="_blank">Visit Official Steam Page</a> : undefined}
              description="Official update coverage and change summaries will appear here after they are verified."
              title="Latest SpiritVale Updates"
            />
          </Section>
        </Container>
      </main>
    </>
  );
}
