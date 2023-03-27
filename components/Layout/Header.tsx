import { Anchor, Flex, Header } from "@mantine/core";
import Link from "next/link";
import { Button } from "../Button";
import { Logo } from "../Logo";
import { useStyles } from "./common.styles";

export function _Header() {
  const { classes, cx } = useStyles();

  return (
    <Header className={cx(classes.container, classes.header)} height={65}>
      <Flex className={classes.body}>
        <Logo />
        <Flex gap={8}>
          <Anchor
            size="xs"
            component={Link}
            href="/dashboard"
            sx={{ color: "var(--color)", display: "flex", alignItems: "center" }}
          >
            Dashboard
          </Anchor>
          <Button component={Link} size="xs" href="/signin" color="cyan.7">
            Sign in
          </Button>
          <Button component={Link} size="xs" href="/new">
            New Xlug
          </Button>
        </Flex>
      </Flex>
    </Header>
  );
}

export { _Header as Header };
