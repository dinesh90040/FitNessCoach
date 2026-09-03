export * from "./colors";
export * from "./typography";
export * from "./spacing";

import { useColorScheme } from "react-native";
import { colors, ThemeColors } from "./colors";

// Central theme hook — every screen/component reads colors through this,
// so light/dark switches for free and there's one source of truth.
export function useTheme(): { colors: ThemeColors; mode: "dark" | "light" } {
  const scheme = useColorScheme();
  const mode = scheme === "light" ? "light" : "dark"; // default to dark
  return { colors: colors[mode], mode };
}
