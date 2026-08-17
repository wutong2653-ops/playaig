# PlayAIG Baseline Commit Plan V1

## Baseline Purpose

Create a reviewable baseline commit for the reconstructed PlayAIG / SpiritVale site after the Phase 1.5 delta audit. This plan is advisory only; no staging or commit was performed in Phase 1.5.

## Starting HEAD

- Branch: `recovery/playaig-clean-baseline-20260817`
- HEAD: `2284785c6ea87c82d3336083c8839eb7e830d20f`
- Base: `origin/main`
- Worktree: `/Users/cj/Documents/PlayAIG-Clean-Reconstruction-20260817/`

## Include Set

Proposed include count: **64**.

- Runtime/data: 24
- Build: 9
- Validation: 24
- Tracked SEO discovery outputs: 2
- Recovery documentation: 5

The exact file-by-file classification is in `PLAYAIG_CLEAN_RUNTIME_MANIFEST_V2.md`. The 18 acquisition/source-registry files are validation dependencies only; they are not production runtime modules.

## Exclude Set

The candidate exclusion set contains `docs/.DS_Store`. Policy exclusions that are absent from the candidate include set are credentials, `.env`, `.env.local`, local dependencies, caches, dist output, HAR/debug dumps and unrelated local monitoring tools.

`.env.production` is inherited from the starting commit, not part of this delta. Its four variables are public URL fallbacks used by build/prerender scripts; no secret values were printed.

## Hold Set

`BASELINE_HOLD_SET=0` after the explicit 39-versus-40 resolution and audit of all 18 unknown-but-required files.

## Exact Stage List

The next approved commit phase may use only this exact path list. This is a proposal; it was not executed here.

```sh
git add -- \
  src/app/App.tsx src/app/GuideDetailPage.tsx src/app/ClassDetailPage.tsx \
  src/app/DatabaseCategoryPage.tsx src/app/DatabaseIndexPage.tsx \
  src/app/site.ts src/app/site.css src/app/seoLandingContent.ts \
  src/app/CardDetailPage.tsx src/app/EquipmentDetailPage.tsx \
  src/app/MonsterDetailPage.tsx src/app/SkillDetailPage.tsx \
  src/components/classes/index.tsx src/components/database/templates.tsx \
  src/components/guides/index.tsx src/data/content.ts src/data/search.ts src/data/types.ts \
  data/spiritvale/guides/guides.json data/spiritvale/cards/cards.json \
  data/spiritvale/equipment/equipment.json data/spiritvale/monsters/monsters.json \
  data/spiritvale/skills/skills.json data/spiritvale/sources/sources.json \
  package.json scripts/generate-spiritvale-seo.mjs \
  scripts/prerender-spiritvale-guides.mjs scripts/prerender-spiritvale-classes.mjs \
  scripts/prerender-spiritvale-database.mjs \
  schemas/spiritvale/equipment.schema.json schemas/spiritvale/monster.schema.json \
  schemas/spiritvale/skill.schema.json schemas/spiritvale/source.schema.json \
  scripts/validate-spiritvale-classes.mjs scripts/validate-spiritvale-database.mjs \
  scripts/validate-spiritvale-guides.mjs scripts/validate-spiritvale-homepage.mjs \
  scripts/validate-spiritvale-search.mjs scripts/validate-spiritvale-cards.mjs \
  data/spiritvale/acquisition/community-cards.json \
  data/spiritvale/acquisition/equipment-pilot-manifests.json \
  data/spiritvale/acquisition/manifests.json \
  data/spiritvale/acquisition/monster-expansion-manifests.json \
  data/spiritvale/acquisition/monster-pilot-manifests.json \
  data/spiritvale/acquisition/schema.json \
  data/spiritvale/acquisition/skill-pilot-manifests.json \
  data/spiritvale/acquisition/skill-secondary-pilot-manifests.json \
  data/spiritvale/cards/schema.json schemas/spiritvale/acquisition-manifest.schema.json \
  scripts/source-registry/approval.mjs scripts/source-registry/card-pipeline.mjs \
  scripts/source-registry/community-card-import.mjs scripts/source-registry/registry.mjs \
  scripts/source-registry/test-approval-workflow.mjs \
  scripts/source-registry/test-card-pipeline.mjs \
  scripts/source-registry/test-community-card-import.mjs \
  scripts/source-registry/test-source-registry.mjs \
  public/sitemap.xml public/rss.xml \
  docs/recovery/RECONSTRUCTION_DELTA_MANIFEST_V1.md \
  docs/recovery/PLAYAIG_CLEAN_RUNTIME_MANIFEST_V2.md \
  docs/recovery/PLAYAIG_BASELINE_COMMIT_PLAN_V1.md \
  docs/acceptance/PlayAIG-Git-Baseline-Recovery-Phase-1.4-Acceptance.md \
  docs/acceptance/PlayAIG-Git-Baseline-Recovery-Phase-1.5-Acceptance.md
```

Never replace this list with `git add .`, `git add -A`, a directory-wide add, or an unreviewed glob.

## Secret Review

- `ENV_PRODUCTION_SECRET_RISK=NO`.
- `DELTA_SECRET_SCAN=PASS`.
- Credentials and local env files are excluded.
- No secret values are included in this plan.

## QA Gates

Before staging, rerun and record:

```sh
npm run typecheck
npm run lint
npm run build
npm test
```

Expected results: all PASS, sitemap 202, Guides 12, Classes 7, Cards 50, Equipment 50, Monsters 52, Skills 20, Maps 0.

## Proposed Commit Message

`Baseline: reconstruct current PlayAIG production-ready site`

## Post-Commit Verification

After an approved commit, verify the staged file list, commit SHA, clean worktree, deterministic build, 202 sitemap URLs, generated discovery files and the Phase 1 target routes. Do not include credentials or local environment secrets.

## Push Gate

Push is a separate user-approved action. Confirm branch, commit SHA, remote and staged diff before any push. Phase 1.5 does not push.

## Deployment Gate

Vercel/production deployment, DNS, GA4 and Search Console changes are separate actions requiring explicit approval after the baseline commit is reviewed. Phase 1.5 does not deploy.

