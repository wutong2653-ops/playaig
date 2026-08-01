import { useContext } from "react";
import { DesignSystemContext } from "../components/themeContext";

export function useDesignSystem() {
  return useContext(DesignSystemContext);
}
