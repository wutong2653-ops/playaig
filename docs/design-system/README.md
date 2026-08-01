# SpiritVale Design System

This package is the presentation-only foundation for SpiritVale. It has no route, SEO, article, database query, or game-data logic. Import the provider once around a rendered surface, then compose documented components.

    import { Button, DesignSystemProvider } from "../src/design-system";

    export function Preview() {
      return (
        <DesignSystemProvider mode="dark">
          <Button>Continue</Button>
        </DesignSystemProvider>
      );
    }

The provider defaults to dark mode. Use its mode prop with dark or light; light is a supported extension theme, not a separate component set.

## Component catalogue

| Group | Component | Purpose | Primary props | Minimal usage |
| --- | --- | --- | --- | --- |
| Base | Button | Button with visual variants and loading state. | variant (primary, secondary, outline, ghost), loading, disabled, startIcon | Button variant="primary" |
| Base | IconButton | Accessible icon-only button. | icon, label, loading, disabled | IconButton icon={...} label="Open menu" |
| Base | Badge | Compact status label. | tone, loading, disabled | Badge tone="success" |
| Base | Chip | Selectable compact control. | loading, disabled | Chip |
| Base | Tag | Non-interactive metadata label. | loading, disabled | Tag |
| Base | Divider | Semantic visual separator. | standard HTML hr props | Divider |
| Base | Tooltip | Hover/focus supporting label. | content, children | Tooltip content="Help" |
| Base | Avatar | Initial-based asset reference avatar. | alt, initials, imageAssetId | Avatar alt="Profile" |
| Base | Spinner | Loading indicator. | standard span props | Spinner |
| Base | Skeleton | Loading placeholder. | shape | Skeleton shape="block" |
| Layout | Container | Responsive centered content width. | standard div props | Container |
| Layout | Section | Responsive vertical region. | as | Section |
| Layout | Grid | Responsive grid structure. | columns | Grid columns={3} |
| Layout | Stack | Vertical-flow primitive. | standard div props | Stack |
| Layout | Sidebar | Responsive aside plus main content. | aside | Sidebar aside={...} |
| Layout | PageHeader | Page-level title and action slot. | title, description, actions | PageHeader title="Preview" |
| SpiritVale | HeroBanner | Flexible hero presentation. | title, description, actions, imageAssetId | HeroBanner imageAssetId="sv-home-hero" |
| SpiritVale | SearchBar | Controlled presentational search field. | value, onValueChange, placeholder | SearchBar onValueChange={setQuery} |
| SpiritVale | ClassCard | Asset-aware class card. | title, description, meta, imageAssetId, variant (default, compact) | ClassCard imageAssetId="sv-class-mage" title="..." |
| SpiritVale | GuideCard | Asset-aware guide card. | title, description, meta, imageAssetId, variant (default, featured) | GuideCard imageAssetId="..." title="..." |
| SpiritVale | BuildCard | Asset-aware build card. | title, description, meta, imageAssetId | BuildCard imageAssetId="..." title="..." |
| SpiritVale | BossCard | Asset-aware boss card. | title, description, meta, imageAssetId | BossCard imageAssetId="..." title="..." |
| SpiritVale | MonsterCard | Asset-aware monster card. | title, description, meta, imageAssetId | MonsterCard imageAssetId="..." title="..." |
| SpiritVale | DatabaseCard | Asset-aware database card. | title, description, meta, imageAssetId, variant (default, compact) | DatabaseCard imageAssetId="..." title="..." |
| SpiritVale | FeatureSection | Feature block with content slot. | title, description, children, variant (default, highlighted) | FeatureSection title="..." |
| Navigation | Breadcrumb | Ordered navigation trail. | items, separator | Breadcrumb items={[...]} |
| Navigation | Pagination | Controlled page selection. | currentPage, totalPages, onPageChange | Pagination currentPage={1} totalPages={3} |
| Navigation | FilterBar | Filter-control container. | children | FilterBar |
| Feedback | EmptyState | Empty-result presentation. | title, description, action | EmptyState title="..." |
| Feedback | SearchResultItem | Search-result presentation. | title, description, meta, href | SearchResultItem title="..." |

For full prop details and composition examples, read COMPONENTS.md. Token contracts and responsive behavior are documented in TOKENS.md and RESPONSIVE.md.

## Asset rule

Components expose imageAssetId only. They never accept or construct a public image URL, so asset resolution remains the responsibility of the consuming application and its validated SV-03 manifest.

## Local Playground

After dependencies are installed:

    npm run playground

The preview renders every component independently and uses presentation labels only. It neither creates a business page nor reads game data.
