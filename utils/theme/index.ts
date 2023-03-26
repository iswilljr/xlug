import { colors } from "./colors";
import { globalStyles } from "./global-styles";
import { other } from "./other";
import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  other,
  colors,
  globalStyles,
  primaryShade: 7,
  primaryColor: "blue",
  colorScheme: "dark",
};
