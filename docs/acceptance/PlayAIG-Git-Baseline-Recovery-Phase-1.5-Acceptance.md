# PlayAIG Git Baseline Recovery Phase 1.5 Acceptance

**Project:** PlayAIG / SpiritVale  
**Date:** 2026-08-17  
**Reconstruction:** `/Users/cj/Documents/PlayAIG-Clean-Reconstruction-20260817/`  
**Branch:** `recovery/playaig-clean-baseline-20260817`  
**Starting HEAD:** `2284785c6ea87c82d3336083c8839eb7e830d20f`

## Executive Summary

Phase 1.5 froze and audited the Phase 1.4 clean reconstruction without changing business code, content, SEO strategy, data collections or the original dirty worktree. The Phase 1.3 count conflict was resolved as a documentation counting error: 40 declared candidates versus 39 explicit paths. All 18 unknown-but-required files were individually reviewed and classified as stable validation dependencies. The environment and delta secret checks passed, the final QA suite passed, and the baseline include/exclude/hold boundary is now explicit.

No staging, commit, push, dependency upgrade, production mutation or deployment was performed.

## Manifest Count Conflict Resolution

| Item | Result |
|---|---|
| `DECLARED_COUNT` | 40 |
| `ACTUAL_EXPLICIT_COUNT` | 39 |
| `MISSING_ENTRY` | None |
| `ROOT_CAUSE` | V1 arithmetic/documentation error: 24 runtime/data + 9 build/schema + 6 validation-only = 39 |
| `MANIFEST_COUNT_CONFLICT` | RESOLVED |
| `MANIFEST_V2_FILE_COUNT` | 39 explicit paths |

No file was added merely to reach 40. The corrected manifest is:

`docs/recovery/PLAYAIG_CLEAN_RUNTIME_MANIFEST_V2.md`

## 18 Unknown-But-Required Review

All 18 files exist in the original worktree, contain no secrets, and were copied only after the declared test/validator graph demonstrated the dependency. They are not production runtime modules.

| Path | Purpose / required by | Runtime | Build | Test | Validator | Production dependency | Secret | Generated | Classification | Recommendation |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|
| `data/spiritvale/acquisition/community-cards.json` | 50-row fixture for `test-community-card-import.mjs` | N | N | Y | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `data/spiritvale/acquisition/equipment-pilot-manifests.json` | Equipment records read by database/search validators | N | N | N | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `data/spiritvale/acquisition/manifests.json` | Card manifests read by database/search/card pipeline | N | N | Y | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `data/spiritvale/acquisition/monster-expansion-manifests.json` | Monster approval fixtures read by validators | N | N | N | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `data/spiritvale/acquisition/monster-pilot-manifests.json` | Monster pilot approval fixtures read by validators | N | N | N | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `data/spiritvale/acquisition/schema.json` | Acquisition shape checked by card validator | N | N | N | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `data/spiritvale/acquisition/skill-pilot-manifests.json` | Skill approval fixtures read by validators | N | N | N | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `data/spiritvale/acquisition/skill-secondary-pilot-manifests.json` | Secondary skill approval fixtures read by validators | N | N | N | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `data/spiritvale/cards/schema.json` | Card schema read by `validate-spiritvale-cards.mjs` | N | N | N | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `schemas/spiritvale/acquisition-manifest.schema.json` | JSON Schema read by card validator | N | N | N | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `scripts/source-registry/approval.mjs` | Approval APIs imported by repository tests | N | N | Y | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `scripts/source-registry/card-pipeline.mjs` | Card entity gate imported by tests and card validator | N | N | Y | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `scripts/source-registry/community-card-import.mjs` | Community adapter imported by test and card validator | N | N | Y | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `scripts/source-registry/registry.mjs` | Source permission engine imported by tests/validator | N | N | Y | Y | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `scripts/source-registry/test-approval-workflow.mjs` | Formal approval-queue test invoked by `npm test` | N | N | Y | N | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `scripts/source-registry/test-card-pipeline.mjs` | Formal card pipeline test invoked by `npm test` | N | N | Y | N | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `scripts/source-registry/test-community-card-import.mjs` | Formal community adapter test invoked by `npm test` | N | N | Y | N | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |
| `scripts/source-registry/test-source-registry.mjs` | Formal source registry test invoked by `npm test` | N | N | Y | N | N | N | N | `VALIDATION_REQUIRED` | INCLUDE |

`UNKNOWN_BUT_REQUIRED_REVIEWED=18` and `UNKNOWN_REMAINING_COUNT=0`.

## Acquisition Dependency Review

The acquisition files are stable, source-backed approval fixtures rather than transient dumps:

- `manifests.json`: 50 approved card manifests.
- `equipment-pilot-manifests.json`: 68 records (50 approved, 18 rejected).
- `monster-pilot-manifests.json`: 5 approved records.
- `monster-expansion-manifests.json`: 65 records (47 approved, 18 rejected).
- `skill-pilot-manifests.json`: 5 approved records.
- `skill-secondary-pilot-manifests.json`: 15 approved records.
- `community-cards.json`: 50 stable adapter fixture records.

They are required to validate that published entity collections retain source and approval gates. They are not imported by the browser runtime, are not raw debug dumps, and are included only under `VALIDATION_REQUIRED`. No unreviewed acquisition directory was added wholesale.

## Source Registry Review

`package.json` formally invokes four source-registry tests through `npm test`. `validate-spiritvale-cards.mjs`, `validate-spiritvale-database.mjs` and `validate-spiritvale-search.mjs` import or read the registry, approval, card-pipeline and manifest fixtures. The four implementation modules and four tests therefore belong to the repository's reproducible validation architecture, not local-only tooling. No other source-registry scripts were migrated.

## Env Production Safety

Only variable names and usage were audited; values were not printed.

| Variable | Public/secret | Used by client? | Used by build? | Safe to track? | Action |
|---|---|---:|---:|---:|---|
| `SPIRITVALE_SITE_URL` | Public URL | N | Y | Y | Keep inherited; review URL policy separately |
| `SITE_URL` | Public URL | N | Y | Y | Keep inherited fallback |
| `BASE_URL` | Public URL | N | Y | Y | Keep inherited fallback |
| `SITE_ORIGIN` | Public URL | N | Y | Y | Keep inherited fallback |

`.env.production` contains no API key, OAuth secret, token, password, private key or client secret according to the name/shape audit. It is inherited from HEAD and is not a delta file.

`ENV_PRODUCTION_SECRET_RISK=NO`

## Delta Secret Scan

The final candidate set was scanned for secret paths and signatures (`credentials`, `.env`, API keys, tokens, passwords, private keys and OAuth credential markers). Evidence-document keyword mentions were excluded from the content scan so they do not create false positives.

`DELTA_SECRET_SCAN=PASS`

## Generated Output Policy

`public/sitemap.xml` and `public/rss.xml` are deterministic outputs regenerated by `npm run build`. They are already tracked by the repository's existing policy, so they remain in the proposed include set while still being regenerated rather than copied as source-of-truth. `dist-playground/`, caches and other generated artifacts remain excluded.

`GENERATED_OUTPUT_DECISION=INCLUDE_TRACKED_SITEMAP_RSS; EXCLUDE_DIST_AND_CACHES`

## Final Include Set

`BASELINE_INCLUDE_COUNT=64`

- 24 runtime/data files.
- 9 build/schema files.
- 24 validation files (6 explicit plus 18 audited dependencies).
- 2 tracked SEO discovery outputs.
- 5 recovery documentation files.

Exact paths and reasons are in:

- `docs/recovery/PLAYAIG_CLEAN_RUNTIME_MANIFEST_V2.md`
- `docs/recovery/RECONSTRUCTION_DELTA_MANIFEST_V1.md`

## Final Exclude Set

`BASELINE_EXCLUDE_COUNT=1` candidate delta file:

- `docs/.DS_Store` — macOS metadata.

Policy exclusions absent from the candidate include set: `credentials/`, `credentials/token.json`, `credentials/client_secret.json`, `.env`, `.env.local`, `node_modules/`, `.venv/`, `.npm-cache/`, `dist/`, `dist-playground/`, HAR/debug dumps and unrelated local Search Console/OAuth tooling.

## Final Hold Set

`BASELINE_HOLD_COUNT=0`

All candidate files have an explainable category, no candidate secret risk remains, and all required QA dependencies are reproducible.

## Final QA

`FINAL_QA=PASS`

| Gate | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| `npm test` | PASS |
| Sitemap URL count | 202 |
| Guides / Classes | 12 / 7 |
| Cards / Equipment | 50 / 50 |
| Monsters / Skills | 52 / 20 |
| Maps | 0 |
| Delta secret scan | PASS |

The npm install phase reported one high-severity audit vulnerability. It was not fixed or upgraded in this phase.

`NPM_AUDIT_FOLLOWUP_REQUIRED=YES`

## Baseline Commit Preview

Expected commit boundary: 64 exact include paths, with one candidate `.DS_Store` excluded. Expected build output remains a 202-URL sitemap and the entity counts above. No staging was executed.

Proposed commit message:

`Baseline: reconstruct current PlayAIG production-ready site`

## Exact Staging Plan

The exact path-only `git add -- ...` proposal is recorded in:

`docs/recovery/PLAYAIG_BASELINE_COMMIT_PLAN_V1.md`

It does not use `git add .`, `git add -A`, directory-wide adds or globs. It is documentation only and was not executed.

## Original Worktree Integrity

`ORIGINAL_WORKTREE_PRESERVED=YES`

Read-only checks of `/Users/cj/Documents/SpiritVale站` after the audit show branch `main`, HEAD `2284785c6ea87c82d3336083c8839eb7e830d20f`, and 118 status entries. No business file, SEO file, data collection, main branch or production environment was modified.

## Remaining Risks

- One high-severity npm audit finding remains for a separate follow-up sprint.
- `.env.production` is public URL configuration by shape, but its deployment policy should still be reviewed before production use.
- The 18 validation dependencies are safe and reproducible but should remain clearly separated from runtime/data ownership in future repository organization.
- No commit, push or deployment has occurred; production state is unchanged.

## Final Decision

All Phase 1.5 pass gates are satisfied. The clean reconstruction is ready for a separately approved baseline commit, but this phase stops before staging as required.

`PHASE_STATUS=READY_FOR_BASELINE_COMMIT`  
`MANIFEST_COUNT_CONFLICT=RESOLVED`  
`MANIFEST_V2_FILE_COUNT=39`  
`UNKNOWN_BUT_REQUIRED_REVIEWED=18`  
`UNKNOWN_REMAINING_COUNT=0`  
`ENV_PRODUCTION_SECRET_RISK=NO`  
`DELTA_SECRET_SCAN=PASS`  
`BASELINE_INCLUDE_COUNT=64`  
`BASELINE_EXCLUDE_COUNT=1`  
`BASELINE_HOLD_COUNT=0`  
`FINAL_QA=PASS`  
`NPM_AUDIT_FOLLOWUP_REQUIRED=YES`  
`ORIGINAL_WORKTREE_PRESERVED=YES`  
`COMMIT_READINESS=READY`  
`PUSH_STATUS=NOT_PERFORMED`  
`DEPLOYMENT_STATUS=NOT_PERFORMED`  
`RECOMMENDED_NEXT_PHASE=User-approved baseline commit using the exact staging plan`  
`NEXT_ACTION=Obtain explicit approval, then run only the documented exact staging command; do not push or deploy in this phase.`

