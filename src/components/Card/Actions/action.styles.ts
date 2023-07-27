import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  action: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.gray[9],
    marginLeft: 4,
  },
  dangerAction: {
    color: theme.colors.red[7],
  },
}));
