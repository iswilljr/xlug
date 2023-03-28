import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const borderStyle = `1px solid ${theme.colors.gray[2]}`;

  return {
    container: {
      backgroundColor: "var(--background)",
    },
    header: {
      borderBottom: borderStyle,
    },
    footer: {
      borderTop: borderStyle,
    },
    body: {
      margin: "auto",
      height: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: theme.breakpoints.lg,
      padding: `0 ${rem(24)}`,
      [theme.fn.largerThan("sm")]: {
        padding: `0 ${rem(64)}`,
      },
    },
  };
});
