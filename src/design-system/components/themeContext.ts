import { createContext } from "react";
import type { ThemeMode } from "../tokens";

export type DesignSystemContextValue = {
  mode: ThemeMode;
};

export const DesignSystemContext = createContext<DesignSystemContextValue>({ mode: "dark" });
