# SpiritVale Data Model

## Purpose

This directory defines the first production-facing data foundation for SpiritVale SEO pages. It separates verified game facts, explicitly unverified placeholders, sources, and image assets so page generation can use stable IDs rather than names or opaque URLs.

The model contains Class, Build, Skill, Equipment, Card, Artifact, Boss, Monster, Map, Guide, Source, Taxonomy, and GameVersion data. It contains no generated page UI or article body.

## Data layout

- data/spiritvale/ contains formal production data.
- data/spiritvale/fixtures/ is reserved for non-production test fixtures and is intentionally empty of game entities.
- schemas/spiritvale/ contains one Draft 2020-12 JSON Schema for each model.
- data/assets/spiritvale-assets.json remains the sole image-asset registry.

## ID and slug rules

IDs are lowercase kebab-case and globally unique across production entities, for example class-mage and source-official-steam-store. Slugs are lowercase kebab-case and unique within their entity type, for example mage.

All cross-entity relations use IDs. Display names must never be used as relation keys.

## Verification and unknown values

Use the following values deliberately:

- verified: a source supports the recorded fact; sourceIds must not be empty.
- partially-verified: only part of the entity is confirmed.
- unverified: a shell or candidate structure with no confirmed claim.
- null: the value is unknown or not collected.
- []: no relation has been collected.

Do not replace unknown values with guesses. Weapon types, stats, skill names/effects, boss names, monster names, map names, drops, numbers, and version numbers are prohibited until a qualifying source supports them.

## Adding a production record

1. Select the matching JSON file in data/spiritvale/.
2. Add every required field from the matching schema.
3. Use a globally unique ID and an entity-type-unique slug.
4. Add only stable-ID relationships that already exist.
5. Add at least one sourceIds entry before marking an entity verified.
6. Keep unknown data as null, [], or unverified.
7. Run node scripts/validate-spiritvale-data.mjs.

## Images and sources

imageAssetIds may contain only IDs present in data/assets/spiritvale-assets.json; never add a direct image URL or a presumed file path. Empty arrays are valid when a source image is missing.

Sources are recorded in data/spiritvale/sources/sources.json. A source record owns the original URL, owner, access time, source type, and reliability. Entity records reference those source IDs.

## Formal data versus fixtures

Formal data is intended for generated pages and must only contain supported facts. Fixtures are test-only examples and belong exclusively in data/spiritvale/fixtures/; they must never be imported by a page generator or mixed into a formal collection. This project currently has no fictional game fixture.

## Page-generation contract

Future list pages load one collection by type. Detail pages resolve one record by slug and then resolve its ID relations from the matching collections. Guides use their related*Ids and imageAssetIds for internal links and registered artwork. Empty relations mean that a page generator must omit the corresponding section rather than fabricate content.

## Validation

Run:

    node scripts/validate-spiritvale-data.mjs

The validator checks schema shape, unknown fields, ID and slug uniqueness, entity and taxonomy references, asset IDs, source IDs, verification/status rules, and Build test metadata.

## GameVersion exception

Most production entities use editorial status values (draft, review, published, archived). GameVersion.status intentionally uses the version lifecycle enum (unknown, current, historical) required by the GameVersion model. The current version-unknown record preserves the absence of a confirmed version number.
