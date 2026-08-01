# SpiritVale R5 Production Release QA Report

## Project

- Project: SpiritVale Wiki
- QA scope: production release verification only
- QA date: 2026-08-02
- Production URL: https://playaig.com

## Release Status

**FAIL**

The public site is reachable and its release-discovery and SEO endpoints are healthy, but it is serving a build older than the validated D1.4 Final Visual Polish build. Formal release sign-off is therefore blocked until the current committed build is deployed and re-verified.

## Production URL

- `https://playaig.com/` returned HTTP 200 over HTTPS.
- The response is served by Vercel and includes `strict-transport-security: max-age=63072000`.
- The TLS certificate subject is `CN=playaig.com`, issued by Let's Encrypt, valid from 2026-08-01 06:36:53 UTC through 2026-10-30 06:36:52 UTC.
- `https://www.playaig.com/` returned HTTP 308 with `Location: https://playaig.com/`.
- The canonical hostname is consistently `playaig.com` in the production homepage response.

## Environment Check

| Check | Result | Evidence |
| --- | --- | --- |
| HTTPS / SSL | PASS | Valid certificate for `playaig.com`; HSTS present. |
| Hostname redirect | PASS | `www.playaig.com` responds with 308 to `https://playaig.com/`. |
| Production routes | PASS | Homepage, guide, class, database, search, and discovery routes returned 200; an unknown route returned 404. |
| Console errors | NOT VERIFIED | Production browser navigation timed out twice in this QA environment before a page session could be established. No zero-error claim is made. |
| Deployed revision | FAIL | Production serves `/assets/index-C9L4PYiJ.js` and `/assets/index-BaK9R3Nz.css`; the current validated build produces `/assets/index-BbqL6e5v.js` and `/assets/index-DozGPR6u.css`. Two D1.4 CSS markers (`@media (hover: hover)` and `text-wrap:balance`) are absent from the deployed stylesheet. |

## Homepage Verification

| Area | Result | Verification |
| --- | --- | --- |
| Hero | PARTIAL | The official Hero asset returned HTTP 200 (89,548 B). Full rendered production inspection is blocked by the browser-navigation limitation. |
| Quick Search | PARTIAL | `/search/` and `/search/?q=mage` both returned HTTP 200. Interactive production query behavior was not independently observed. |
| Featured Guides | PARTIAL | The deployed route set and local release validator pass; live rendered-card interaction was not independently observed. |
| Classes | PARTIAL | `/classes/` and `/classes/mage/` returned HTTP 200; the local release validator confirms seven class cards. |
| Database | PARTIAL | `/database/` and `/database/bosses/` returned HTTP 200; the local release validator confirms seven database cards. |
| Explore SpiritVale | PARTIAL | The local release validator confirms the module and registered assets; production visual inspection was unavailable. |
| Latest Updates | PARTIAL | The local release validator confirms the updates module; production visual inspection was unavailable. |
| Footer | PARTIAL | The local release validator confirms the footer; production visual inspection was unavailable. |

## SEO Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Metadata | PASS | Homepage and sampled guide, class, and database pages provide title and description metadata. |
| Canonical | PASS | Sampled pages use unique `https://playaig.com/...` canonical URLs. |
| Open Graph / Twitter | PASS | Sampled pages include `og:url` using `https://playaig.com/...` and `twitter:card=summary_large_image`. |
| JSON-LD | PASS | Homepage has Organization and WebSite JSON-LD; sampled content pages include their generated structured-data scripts. |
| `sitemap.xml` | PASS | HTTP 200; 23 unique `https://playaig.com/...` URLs, with no search, 404, or playground route included. |
| `robots.txt` | PASS | HTTP 200; allows `/`, disallows playground/search/404/development paths, and references `https://playaig.com/sitemap.xml`. |
| Googlebot readiness | PASS | Public content routes return HTTP 200 and are allowed by `robots.txt`; sitemap is publicly reachable. |

The local static validation suite confirms that the D1.x homepage changes did not change the expected SEO, canonical, JSON-LD, sitemap, robots, RSS, or OpenSearch outputs. The deployed asset mismatch prevents treating that local result as confirmation of the current production revision.

## Responsive Verification

| Viewport | Result | Evidence |
| --- | --- | --- |
| 320 x 800 | NOT VERIFIED IN PRODUCTION | Production browser navigation timed out. The latest local release QA found no horizontal overflow at 320 px. |
| 375 x 812 | NOT VERIFIED IN PRODUCTION | Production browser navigation timed out. The latest local release QA found no horizontal overflow and a 44 px primary CTA touch target. |
| 1440 x 900 | NOT VERIFIED IN PRODUCTION | Production browser navigation timed out. The latest local release QA found no horizontal overflow and all homepage card groups present. |

## Performance Result

- Direct production request: homepage returned HTTP 200 in **0.450 s** (2,477 B response body from the verification location).
- Direct Hero-image request: returned HTTP 200 in **1.323 s** (89,548 B response body from the verification location).
- Lighthouse: **not run**. Lighthouse is not installed in this project, and this release-QA sprint does not authorize adding tooling or changing dependencies solely to run it.
- Browser-based first-render and runtime-performance measurements: **not verified** because production browser navigation timed out.

## Validation Commands Result

| Command | Result |
| --- | --- |
| `npm run build` | PASS — TypeScript build, Vite build, static guide/class/database output, and SEO discovery generation succeeded. |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test` | PASS — homepage, guides, classes, database, search, technical SEO, and release UI validators passed. |
| `node scripts/validate-playaig-release-ui.mjs` | PASS — 26 registered assets; homepage module order, rhythm, and card system validated. |

## Known Issues

### Critical

1. **Production is not serving the current validated D1.4 build.**
   - Impact: the final visual-polish changes cannot be accepted as released, and current production cannot receive formal release sign-off for this sprint.
   - Evidence: production asset identifiers differ from the current build, and production CSS lacks two D1.4 markers.
   - Required follow-up: deploy commit `418332b199763f293a660ff70026b3023c730193` (or a later commit containing it), then repeat production browser and Lighthouse verification.

### Major

1. **Production browser runtime verification was unavailable in this QA environment.**
   - Impact: console-error count, interactive search behavior, full rendered modules, and production responsive views are not independently evidenced.
   - Observation: two direct production browser navigations exceeded the 30-second automation window; this is a QA-environment limitation, not a confirmed website runtime error.

### Minor

1. **Lighthouse has not been recorded.**
   - Impact: no quantified Performance, Accessibility, Best Practices, or SEO scores are available for this release gate.
   - Follow-up: run a production Lighthouse audit after the current build is deployed, without modifying application code.

## Release Recommendation

**Do not approve formal production release yet.**

The domain, TLS, redirect, public routes, sitemap, robots, and sampled SEO metadata are healthy. However, the production deployment predates the current D1.4 validated build, and browser-console, responsive-production, interactive-search, and Lighthouse checks lack conclusive production evidence. Deploy the committed D1.4 revision, then run this QA gate again. No code changes are recommended or made by this QA sprint.
