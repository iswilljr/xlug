import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, { idOnText }: { idOnText?: boolean }) => ({
  control: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[1],
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 4,
    [theme.fn.smallerThan("xs")]: { display: "block" },
    "&:hover": {
      boxShadow: !idOnText
        ? `0 0 3px 1px rgba(${theme.colorScheme === "dark" ? "255,255,255" : "0,0,0"}, 0.2)`
        : undefined,
      "& > #details": {
        display: !idOnText ? "block" : "none",
      },
    },
  },

  truncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  destination: {
    flex: 1,
    [theme.fn.smallerThan("xs")]: { display: "none" },
  },

  details: {
    display: "none",
    position: "absolute",
    top: -16,
    right: -16,
    padding: 4,
    borderRadius: 4,
  },

  link: {
    display: idOnText ? "none" : undefined,
    [theme.fn.smallerThan("xs")]: {
      display: "block",
    },
  },

  options: {
    flexWrap: "nowrap",
    display: "flex",
    alignItems: "center",
    marginLeft: 16,
    [theme.fn.smallerThan("xs")]: {
      marginLeft: 0,
      flex: 1,
      justifyContent: "space-between",
      maxWidth: "initial",
      flexWrap: "wrap",
    },
  },

  icon: {
    width: 16,
    height: 16,
    fill: theme.colors.gray[6],
    marginRight: 8,
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));
