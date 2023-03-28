import type { MantineTheme } from "@mantine/core";

declare module "@mantine/core" {
  interface MantineThemeOther {
    getBoxShadow: (theme: MantineTheme, color: string) => string;
  }
}

export {};
