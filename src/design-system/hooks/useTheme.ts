import { useEffect, useState } from "react";
import type { ThemeMode } from "../tokens";

export function useTheme(initialMode: ThemeMode = "dark") {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);
  return { mode, setMode, toggleTheme: () => setMode((current) => current === "dark" ? "light" : "dark") };
}
