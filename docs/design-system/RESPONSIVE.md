# Responsive Rules

The component library is mobile-first. No component relies on a page route, viewport listener, or business data to change its structure.

| Minimum width | Name | Library behavior |
| --- | --- | --- |
| 375px | Mobile | Single-column baseline, compact container gutters. |
| 768px | Tablet | Grid progresses to two columns; Sidebar becomes two-column. |
| 1024px | Desktop | Grid progresses to three columns; Section uses its expanded vertical rhythm. |
| 1280px | Wide desktop | HeroBanner receives the wide horizontal padding token. |
| 1440px | Max desktop | Container caps at the content-width component token. |

The named device groups are Mobile at 375, Tablet at 768, and Desktop from 1024 upward. Width 1280 and 1440 are desktop refinements, not separate component APIs.

## Implementation rule

Use Container, Section, Grid, Stack, and Sidebar for responsive structure. Do not introduce arbitrary margins, gaps, or pixel breakpoints in a component. Add a token first if a reusable responsive measurement is needed.
