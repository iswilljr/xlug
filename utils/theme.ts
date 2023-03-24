import { type MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "blue",
  primaryShade: 7,
  globalStyles: (theme) => ({
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
    ":root": {
      "--background": "#00060d",
    },
    html: {
      colorScheme: "dark",
      color: "#ededed",
      lineHeight: "inherit",
    },
    body: {
      backgroundColor: "var(--background)",
      overflowX: "hidden",
    },
    "[data-sonner-toast]": {
      [theme.fn.smallerThan(600)]: {
        width: "calc(100% - 32px) !important",
      },
    },
  }),
};
