import { useState } from "react";
import {
  Avatar,
  Badge,
  BossCard,
  Breadcrumb,
  BuildCard,
  Button,
  Chip,
  ClassCard,
  Container,
  DatabaseCard,
  DesignSystemProvider,
  Divider,
  EmptyState,
  FeatureSection,
  FilterBar,
  Grid,
  GuideCard,
  HeroBanner,
  Icon,
  IconButton,
  MonsterCard,
  PageHeader,
  Pagination,
  SearchBar,
  SearchResultItem,
  Section,
  Sidebar,
  Skeleton,
  Spinner,
  Stack,
  Tag,
  Tooltip,
  useTheme
} from "../src/design-system";
import { VerificationBadge } from "../src/components";

export function App() {
  const { mode, toggleTheme } = useTheme();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  return (
    <DesignSystemProvider mode={mode}>
      <main id="main-content">
      <Container>
        <Section>
          <PageHeader
            actions={<Button onClick={toggleTheme}>Switch to {mode === "dark" ? "light" : "dark"}</Button>}
            description="A component-only preview. It does not represent a website page or game record."
            title="SpiritVale Design System"
          />
          <Stack>
            <HeroBanner
              actions={<Button startIcon={<Icon name="arrowRight" />}>Primary action</Button>}
              description="HeroBanner accepts imageAssetId but resolves no image path itself."
              imageAssetId="sv-home-hero"
              title="Component preview"
            />
            <FeatureSection description="Base controls demonstrate default, hover, focus, disabled, and loading states." title="Base components">
              <div className="sv-playground-row">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <IconButton icon={<Icon name="menu" />} label="Open menu" />
                <Badge>Badge</Badge>
                <Badge tone="success">Success</Badge>
                <VerificationBadge status="partially-verified" />
                <Chip>Chip</Chip>
                <Tag>Tag</Tag>
                <Tooltip content="Tooltip content"><Button variant="ghost">Tooltip</Button></Tooltip>
                <Avatar alt="Avatar preview" imageAssetId="sv-avatar-preview" initials="SV" />
                <Spinner />
                <Skeleton className="sv-playground-skeleton" />
              </div>
              <Divider />
            </FeatureSection>
            <FeatureSection description="Layout primitives set structure without page-specific behavior." title="Layout components">
              <Sidebar aside={<Tag>Sidebar slot</Tag>}>
                <Grid columns={3}>
                  <Skeleton shape="block" />
                  <Skeleton shape="block" />
                  <Skeleton shape="block" />
                </Grid>
              </Sidebar>
            </FeatureSection>
            <FeatureSection description="Cards identify only component roles; imageAssetId is a data attribute, not a path." title="SpiritVale components">
              <Grid>
                <ClassCard title="ClassCard" description="Compact variant preview." variant="compact" />
                <GuideCard imageAssetId="sv-guide-preview" title="GuideCard" description="Featured variant preview." variant="featured" />
                <BuildCard imageAssetId="sv-build-preview" title="BuildCard" description="Reusable component preview." />
                <BossCard imageAssetId="sv-boss-preview" title="BossCard" description="Reusable component preview." />
                <MonsterCard imageAssetId="sv-monster-preview" title="MonsterCard" description="Reusable component preview." />
                <DatabaseCard title="DatabaseCard" description="Compact variant preview." variant="compact" />
              </Grid>
            </FeatureSection>
            <FeatureSection description="Interaction samples are controlled by the playground only." title="Navigation and feedback">
              <Breadcrumb items={[{ label: "Preview" }, { label: "Components" }]} />
              <SearchBar onValueChange={setQuery} value={query} />
              <FilterBar><Chip>Filter option</Chip><Button variant="ghost">Reset filters</Button></FilterBar>
              <SearchResultItem description={query ? "Current query: " + query : "Type in the search field to preview a controlled prop."} meta="Component result" title="SearchResultItem" />
              <Pagination currentPage={page} onPageChange={setPage} totalPages={3} />
              <EmptyState action={<Button variant="ghost">Optional action</Button>} description="Composable empty-state presentation." title="EmptyState" />
            </FeatureSection>
          </Stack>
        </Section>
      </Container>
      </main>
    </DesignSystemProvider>
  );
}
