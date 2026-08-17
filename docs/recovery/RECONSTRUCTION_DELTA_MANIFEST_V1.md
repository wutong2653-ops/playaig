# PlayAIG Reconstruction Delta Manifest V1

**Reconstruction:** `/Users/cj/Documents/PlayAIG-Clean-Reconstruction-20260817/`  
**Branch:** `recovery/playaig-clean-baseline-20260817`  
**Base:** `origin/main` / `2284785c6ea87c82d3336083c8839eb7e830d20f`  
**Status entries before evidence files:** 45 (35 tracked changes plus 24 untracked files grouped by directory); 47 after adding the two Phase 1.4 evidence files  
**Source delta files:** 57  
**Generated output files:** 2  
**Total reconstruction delta files:** 59

## Manifest Conflict

`MANIFEST_CONFLICT=YES`: the approved runtime manifest declares 40 candidates, while its explicit enumerated lists contain 39 files (24 runtime/data, 9 build/schema and 6 validation-only delta files). No unlisted runtime file was silently added. The additional files below were copied only after the existing `npm test` and database/card validators proved they were required dependencies, and are marked `UNKNOWN_BUT_REQUIRED`.

## Explicit Manifest Files (39, required)

### Runtime/data (24)

- `src/app/App.tsx`
- `src/app/GuideDetailPage.tsx`
- `src/app/ClassDetailPage.tsx`
- `src/app/DatabaseCategoryPage.tsx`
- `src/app/DatabaseIndexPage.tsx`
- `src/app/site.ts`
- `src/app/site.css`
- `src/app/seoLandingContent.ts`
- `src/app/CardDetailPage.tsx`
- `src/app/EquipmentDetailPage.tsx`
- `src/app/MonsterDetailPage.tsx`
- `src/app/SkillDetailPage.tsx`
- `src/components/classes/index.tsx`
- `src/components/database/templates.tsx`
- `src/components/guides/index.tsx`
- `src/data/content.ts`
- `src/data/search.ts`
- `src/data/types.ts`
- `data/spiritvale/guides/guides.json`
- `data/spiritvale/cards/cards.json`
- `data/spiritvale/equipment/equipment.json`
- `data/spiritvale/monsters/monsters.json`
- `data/spiritvale/skills/skills.json`
- `data/spiritvale/sources/sources.json`

### Build/schema (9)

- `package.json`
- `scripts/generate-spiritvale-seo.mjs`
- `scripts/prerender-spiritvale-guides.mjs`
- `scripts/prerender-spiritvale-classes.mjs`
- `scripts/prerender-spiritvale-database.mjs`
- `schemas/spiritvale/equipment.schema.json`
- `schemas/spiritvale/monster.schema.json`
- `schemas/spiritvale/skill.schema.json`
- `schemas/spiritvale/source.schema.json`

### Validation-only delta (6)

- `scripts/validate-spiritvale-classes.mjs`
- `scripts/validate-spiritvale-database.mjs`
- `scripts/validate-spiritvale-guides.mjs`
- `scripts/validate-spiritvale-homepage.mjs`
- `scripts/validate-spiritvale-search.mjs`
- `scripts/validate-spiritvale-cards.mjs`

## Unknown But Required (18)

These files were not in the approved runtime/build manifest. They were added only because the declared `npm test` and validator dependency graph failed without them. They are test/validation or source-backed manifest inputs, not a request to broaden production scope.

- `data/spiritvale/acquisition/community-cards.json`
- `data/spiritvale/acquisition/equipment-pilot-manifests.json`
- `data/spiritvale/acquisition/manifests.json`
- `data/spiritvale/acquisition/monster-expansion-manifests.json`
- `data/spiritvale/acquisition/monster-pilot-manifests.json`
- `data/spiritvale/acquisition/schema.json`
- `data/spiritvale/acquisition/skill-pilot-manifests.json`
- `data/spiritvale/acquisition/skill-secondary-pilot-manifests.json`
- `data/spiritvale/cards/schema.json`
- `schemas/spiritvale/acquisition-manifest.schema.json`
- `scripts/source-registry/approval.mjs`
- `scripts/source-registry/card-pipeline.mjs`
- `scripts/source-registry/community-card-import.mjs`
- `scripts/source-registry/registry.mjs`
- `scripts/source-registry/test-approval-workflow.mjs`
- `scripts/source-registry/test-card-pipeline.mjs`
- `scripts/source-registry/test-community-card-import.mjs`
- `scripts/source-registry/test-source-registry.mjs`

`scripts/validate-playaig-release-ui.mjs` was initially suspected as an extra test dependency, but it is already present unchanged in `origin/main`; it is inherited, not counted as migrated or unknown.

## Generated Outputs (2, never source-of-truth)

- `public/sitemap.xml` — regenerated to 202 URLs
- `public/rss.xml` — regenerated from the 12 guide records

## Required / Provenance / Secret Matrix

| Group | Required? | Provenance | Secret risk |
|---|---|---|---|
| Explicit manifest runtime/data | Yes | Manifest-approved candidate | None identified; source review still required |
| Explicit manifest build/schema | Yes | Manifest-approved candidate | None |
| Explicit manifest validation-only | Test/QA only | Manifest-approved validation candidate | None |
| Acquisition and source-registry additions | Test/validator required | `UNKNOWN_BUT_REQUIRED` | No secrets detected |
| Generated sitemap/RSS | Build output | Regenerated, not migrated as source | None |
| Credentials and local env secrets | No | Excluded | Protected |

## Hash Verification

All 39 explicit manifest files and all 18 unknown-but-required files have matching SHA-256 hashes between the original worktree and reconstruction copy (`HASH_MISMATCHES=0`).
