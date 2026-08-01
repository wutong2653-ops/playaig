# Tokens

All visual values are centralized in src/design-system/tokens. Components use CSS custom properties emitted by themeVariables, not hardcoded color or spacing values.

| File | Contract |
| --- | --- |
| colors.ts | Semantic dark and light colors: primary, secondary, accent, background, surface, border, text, success, warning, danger, and focus. |
| typography.ts | Display, H1, H2, H3, H4, body, small, caption, and code font size, line height, and weight. |
| spacing.ts | The only spatial scale: 4, 8, 12, 16, 24, 32, 48, 64, 80. |
| radius.ts | None, small, medium, large, and pill radii. |
| shadow.ts | Small, medium, and focus shadows. |
| motion.ts | Fast, base, slow duration and the shared easing curve. |
| breakpoints.ts | 375, 768, 1024, 1280, and 1440 pixel breakpoints. |
| zIndex.ts | Base through tooltip layering scale. |
| component.ts | Non-spatial component primitives such as border width and control height. |

Color text/background pairings were selected for AA-sized-text contrast in both themes. Primary, secondary, accent, success, warning, and danger are semantic role tokens; components may not introduce an unrelated color.

## Usage

    import { colorTokens, spacingTokens, typographyTokens } from "../src/design-system";

    const darkPrimary = colorTokens.dark.primary;
    const space = spacingTokens[16];
    const body = typographyTokens.body;

Application CSS should consume the provider variables, for example var(--sv-space-16) and var(--sv-color-surface), instead of literal color or spacing values.
