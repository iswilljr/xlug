import type { MantineTheme, MantineThemeOther } from "@mantine/core";

const getBoxShadow = (theme: MantineTheme, color: string) => {
  return `${theme.colors.dark[0]} 0 0 0 0,${theme.colors.dark[0]} 0 0 0 0,${theme.colors.dark[7]} 0 1px 1px 0,${color} 0 0 0 1px,${theme.colors.dark[0]} 0 0 0 0,${theme.colors.dark[0]} 0 0 0 0,rgb(64 68 82/8%) 0 2px 5px 0`;
};

export const other: MantineThemeOther = {
  getBoxShadow,
};
