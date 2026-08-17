# PlayAIG Clean Runtime Manifest V2

**Baseline:** `origin/main` / `2284785c6ea87c82d3336083c8839eb7e830d20f`  
**Reconstruction:** `/Users/cj/Documents/PlayAIG-Clean-Reconstruction-20260817/`  
**Purpose:** final file-boundary proposal after Phase 1.5 dependency audit.  
**V1 conflict:** declared 40 candidates, explicit paths 39.  
**Resolved candidate count:** 39 explicit paths.  
**Unknown-but-required additions:** 18 validation dependencies.  
**Tracked generated outputs:** 2.  
**Documentation additions:** 5.  
**Proposed include count:** 64.  
**Proposed exclude count:** 1 candidate artifact (`docs/.DS_Store`).  
**Proposed hold count:** 0.

## Manifest Count Resolution

`MANIFEST_COUNT_CONFLICT=RESOLVED`

The V1 number 40 was a counting error. Its explicit groups contain 24 runtime/data files, 9 build/schema files and 6 validation-only delta files, for 39 total. No fourth group or missing runtime path is needed. The 18 additional files discovered by `npm test` and validators are recorded separately as validation dependencies, not silently folded into the explicit runtime candidate count.

## Final Include Set

### RUNTIME / DATA (24)

`src/app/App.tsx`, `src/app/GuideDetailPage.tsx`, `src/app/ClassDetailPage.tsx`, `src/app/DatabaseCategoryPage.tsx`, `src/app/DatabaseIndexPage.tsx`, `src/app/site.ts`, `src/app/site.css`, `src/app/seoLandingContent.ts`, `src/app/CardDetailPage.tsx`, `src/app/EquipmentDetailPage.tsx`, `src/app/MonsterDetailPage.tsx`, `src/app/SkillDetailPage.tsx`, `src/components/classes/index.tsx`, `src/components/database/templates.tsx`, `src/components/guides/index.tsx`, `src/data/content.ts`, `src/data/search.ts`, `src/data/types.ts`, `data/spiritvale/guides/guides.json`, `data/spiritvale/cards/cards.json`, `data/spiritvale/equipment/equipment.json`, `data/spiritvale/monsters/monsters.json`, `data/spiritvale/skills/skills.json`, `data/spiritvale/sources/sources.json`.

### BUILD (9)

`package.json`, `scripts/generate-spiritvale-seo.mjs`, `scripts/prerender-spiritvale-guides.mjs`, `scripts/prerender-spiritvale-classes.mjs`, `scripts/prerender-spiritvale-database.mjs`, `schemas/spiritvale/equipment.schema.json`, `schemas/spiritvale/monster.schema.json`, `schemas/spiritvale/skill.schema.json`, `schemas/spiritvale/source.schema.json`.

### VALIDATION (24)

Explicit validation delta:

`scripts/validate-spiritvale-classes.mjs`, `scripts/validate-spiritvale-database.mjs`, `scripts/validate-spiritvale-guides.mjs`, `scripts/validate-spiritvale-homepage.mjs`, `scripts/validate-spiritvale-search.mjs`, `scripts/validate-spiritvale-cards.mjs`.

Unknown-but-required, now approved as stable validation dependencies:

`data/spiritvale/acquisition/community-cards.json`, `data/spiritvale/acquisition/equipment-pilot-manifests.json`, `data/spiritvale/acquisition/manifests.json`, `data/spiritvale/acquisition/monster-expansion-manifests.json`, `data/spiritvale/acquisition/monster-pilot-manifests.json`, `data/spiritvale/acquisition/schema.json`, `data/spiritvale/acquisition/skill-pilot-manifests.json`, `data/spiritvale/acquisition/skill-secondary-pilot-manifests.json`, `data/spiritvale/cards/schema.json`, `schemas/spiritvale/acquisition-manifest.schema.json`, `scripts/source-registry/approval.mjs`, `scripts/source-registry/card-pipeline.mjs`, `scripts/source-registry/community-card-import.mjs`, `scripts/source-registry/registry.mjs`, `scripts/source-registry/test-approval-workflow.mjs`, `scripts/source-registry/test-card-pipeline.mjs`, `scripts/source-registry/test-community-card-import.mjs`, `scripts/source-registry/test-source-registry.mjs`.

### SEO_DISCOVERY (2, tracked generated policy)

- `public/sitemap.xml`
- `public/rss.xml`

These files are deterministic build outputs, but they are already tracked by repository policy. The baseline proposal preserves that policy and verifies regeneration to 202 sitemap URLs and 12 RSS guide items.

### DOCUMENTATION (5)

- `docs/recovery/RECONSTRUCTION_DELTA_MANIFEST_V1.md`
- `docs/recovery/PLAYAIG_CLEAN_RUNTIME_MANIFEST_V2.md`
- `docs/recovery/PLAYAIG_BASELINE_COMMIT_PLAN_V1.md`
- `docs/acceptance/PlayAIG-Git-Baseline-Recovery-Phase-1.4-Acceptance.md`
- `docs/acceptance/PlayAIG-Git-Baseline-Recovery-Phase-1.5-Acceptance.md`

These are recovery evidence and review documents, not website runtime modules.

## Final Exclude Set

- `docs/.DS_Store` — macOS metadata; candidate artifact count 1.
- `credentials/`, `credentials/token.json`, `credentials/client_secret.json` — secret excluded.
- `.env`, `.env.local` — secret/local environment excluded.
- `node_modules/`, `.venv/`, `.npm-cache/`, `dist/`, `dist-playground/` — local/generated artifacts.
- HAR/debug dumps, temporary screenshots and historical reports not listed in the include set.
- Search Console/OAuth acquisition tooling not required by the website or formal baseline QA.

## Final Hold Set

`BASELINE_HOLD_SET=0`

No candidate remains unexplained after the validator dependency audit. `.env.production` is inherited unchanged from HEAD, contains only public URL variable names, and is not part of this delta.

## Safety Gates

- `ENV_PRODUCTION_SECRET_RISK=NO` — four URL fallback variables only; no client secret, token, password or private key.
- `DELTA_SECRET_SCAN=PASS` — no sensitive paths or secret signatures in the include set; evidence-document keyword mentions were excluded from the scan.
- `UNKNOWN_REMAINING_COUNT=0`.
- `FINAL_QA=PASS`.

