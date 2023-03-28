import { createStyles, getStylesRef } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    ref: getStylesRef("container"),
    width: "100%",
    position: "relative",
    backgroundColor: "transparent",
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.fn.darken(theme.fn.themeColor("blue.2"), 0.1)}`,
    transition: "all .2s",
    padding: theme.spacing.md,
    ":hover": {
      backgroundColor: theme.fn.rgba(theme.colors.cyan[7], 0.5),
    },
  },
  actions: {
    position: "absolute",
    opacity: 0,
    display: "flex",
    alignItems: "center",
    transition: "all .2s",
    top: theme.spacing.md,
    right: theme.spacing.md,
    [`.${getStylesRef("container")}:hover &`]: {
      opacity: 1,
    },
  },
  link: {
    fontSize: theme.fontSizes.xl,
    color: "var(--color)",
    fontWeight: "bold",
  },
  destination: {
    color: theme.fn.darken("#ededed", 0.15),
  },
  description: {
    color: theme.colors.gray[9],
    lineBreak: "anywhere",
  },
  truncate: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));
