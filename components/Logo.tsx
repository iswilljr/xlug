import Link from "next/link";
import { createStyles, Text } from "@mantine/core";
import { LogoIcon } from "./icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    "& svg": { display: "block" },
  },
  logo: {
    ...theme.fn.focusStyles(),
    textDecoration: "none",
    userSelect: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    display: "block",
  },
  image: {
    height: 30,
  },
  version: {
    ...theme.fn.focusStyles(),
    fontWeight: 700,
    textDecoration: "none",
    marginLeft: theme.spacing.md,
  },
  iconWrrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    marginLeft: 8,
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

export default function Logo({ className, ...others }: any) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Link href="/">
        <a className={cx(classes.logo, className)} aria-label="Url Shortener" {...others}>
          <div className={classes.iconWrrapper} id="url-shortener-icon">
            <span>
              <LogoIcon className={classes.image} />
            </span>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              size="xl"
              weight={700}
              className={classes.iconText}
            >
              Url Shortener
            </Text>
          </div>
        </a>
      </Link>
    </div>
  );
}
