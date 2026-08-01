export type ThemeMode = "dark" | "light";

export const colorTokens = {
  dark: {
    primary: "#8bd450", secondary: "#6eb8e7", accent: "#f7bd4a",
    background: "#101710", surface: "#172219", surfaceRaised: "#203021",
    border: "#405642", text: "#f3f7ed", textMuted: "#c0cbbd",
    success: "#79cf88", warning: "#f7bd4a", danger: "#ef7777", focus: "#c8ff8a"
  },
  light: {
    primary: "#356d20", secondary: "#176f9d", accent: "#9a5a00",
    background: "#f6f8f1", surface: "#ffffff", surfaceRaised: "#eef3e9",
    border: "#81927c", text: "#162016", textMuted: "#4b5a49",
    success: "#176d36", warning: "#825200", danger: "#a22727", focus: "#356d20"
  }
} as const;
