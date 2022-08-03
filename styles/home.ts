import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  control: {
    width: "100%",
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "800px",
  },

  input: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
    },
  },

  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
}));
