import { createStyles, Tooltip, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";

const useStyles = createStyles((theme) => ({
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
  },
  button: {
    ...theme.fn.focusStyles(),
    width: 34,
    height: 34,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[7],
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[0],
    },
  },
}));

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <Logo />
      <Tooltip label={`${colorScheme === "dark" ? "Light" : "Dark"} mode`} position="bottom">
        <UnstyledButton className={classes.button} onClick={() => toggleColorScheme()}>
          {colorScheme === "dark" ? <SunIcon width={22} height={22} /> : <MoonIcon width={22} height={22} />}
        </UnstyledButton>
      </Tooltip>
    </header>
  );
}
