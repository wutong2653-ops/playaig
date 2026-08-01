# Component Reference

Every component is TypeScript-only, controlled where it has interaction, and independently rendered in playground/App.tsx.

## Base

- Button: primary, secondary, outline, and ghost variants; disabled and loading disable the native control.
- IconButton: requires label for the accessible name; the shared Icon set includes menu, search, sun, and moon glyphs for navigation and theme controls.
- Badge: primary, success, warning, or danger tone; accepts loading and disabled presentation state.
- Chip: button-style compact option with disabled/loading support.
- Tag: compact metadata label with disabled/loading presentation state.
- Divider: semantic horizontal rule.
- Tooltip: content is displayed on hover or focus within.
- Avatar: alt is required; imageAssetId is metadata only and does not produce an image path.
- Spinner and Skeleton: loading primitives. Skeleton supports line, block, and circle shapes.

## Layout

- Container: centers and constrains reading width.
- Section: supplies responsive block padding and can render section or div.
- Grid: columns is a layout hint; styles progressively adapt at the documented breakpoints.
- Stack: vertical composition primitive.
- Sidebar: requires an aside slot and lays out beside children at tablet sizes and above.
- PageHeader: title is required; description and actions are optional slots.

## SpiritVale

HeroBanner, ClassCard, GuideCard, BuildCard, BossCard, MonsterCard, and DatabaseCard all accept imageAssetId. The value is deliberately not a URL and appears only as a data attribute for the application asset resolver. HeroBanner and cards can receive resolver-backed media through their media slot without ever accepting a raw image path. HeroBanner also exposes optional `eyebrow`, `gameName`, `status`, and `trustSignals` slots so a channel can create a clear, accessible brand hierarchy without creating a second Hero component.

ClassCard provides default and compact variants. GuideCard provides default and featured variants. DatabaseCard provides default and compact variants. FeatureSection provides default and highlighted variants.

SearchBar calls onValueChange with the current input string. Pagination calls onPageChange with a requested number. Breadcrumb takes label/href items. FeatureSection, FilterBar, EmptyState, and SearchResultItem are slot-based presentational components.

## Guide components

GuideLayout, GuideHeader, GuideTableOfContents, GuideSection, GuideSources, GuideFaq, RelatedGuides, GuideBreadcrumb, and VerificationBadge are reusable presentation components in src/components/guides. They receive Guide records, resolved source records, and data passed by the route; they do not fetch JSON directly.

- GuideTableOfContents renders stable section anchors and exposes an accessible mobile toggle.
- GuideSources renders the supplied first-party source records with safe external-link attributes.
- GuideFaq uses accessible buttons and aria-expanded state.
- RelatedGuides accepts already-resolved related Guide records, so relationship selection remains data-driven.
- VerificationBadge maps a Guide factReviewStatus to an existing Badge tone.

## Class components

ClassLayout, ClassHeader, ClassOverview, ClassConfirmedInformation, ClassUnverifiedInformation, ClassVerificationStatus, ClassFutureUpdates, ClassSources, ClassBreadcrumb, and ClassVerificationNotice are reusable presentation components in `src/components/classes`.

- They receive an existing formal `SpiritValeClass` record, resolved source records, and a supplied registered general class `imageAssetId`; they do not add role, weapon, skill, stat, build, or portrait data.
- ClassHeader identifies the shared visual as general class artwork, never an individual class portrait.
- ClassUnverifiedInformation supplies the standard first-party-source limitation statement, while ClassSources renders registered source records with safe external-link attributes.

## Database components

DatabaseLayout, DatabaseHeader, DatabaseCurrentStatus, DatabaseEmptyEntries, DatabaseSources, DatabaseBreadcrumb, DatabaseVerificationBadge, and DatabaseDisclaimer are reusable presentation components in `src/components/database`.

- They receive existing `DatabaseCategory` configuration, formal collection counts, resolved source records, and registered `imageAssetId` values; they do not create database entries.
- DatabaseEmptyEntries provides the shared `Data Collection In Progress` state and Browse Guides CTA instead of displaying synthetic zero-count records.
- DatabaseHeader always labels its supplied image as a general official visual rather than a verified database entry.

    <ClassCard
      imageAssetId="sv-class-mage"
      title="Card title supplied by the application"
      description="Presentation only."
    />

    <Pagination currentPage={page} totalPages={pageCount} onPageChange={setPage} />

## State coverage

Native interactive components expose default, hover, focus-visible, disabled, and loading states. Informational components receive loading or disabled semantic state where applicable. The shared focus style uses the focus token and all state transitions use the motion tokens.
