import { type PropsWithChildren } from "react";
import { type ThemeMode } from "../tokens";
import { cn } from "../utils/cn";
import { themeVariables } from "../utils/theme";
import { DesignSystemContext } from "./themeContext";
import "../styles";

export type DesignSystemProviderProps = PropsWithChildren<{
  mode?: ThemeMode;
  className?: string;
}>;

export function DesignSystemProvider({
  children,
  className,
  mode = "dark"
}: DesignSystemProviderProps) {
  return (
    <DesignSystemContext.Provider value={{ mode }}>
      <div className={cn("sv-shell", className)} data-theme={mode} style={themeVariables(mode)}>
        {children}
      </div>
    </DesignSystemContext.Provider>
  );
}
