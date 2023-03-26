import { Flex, Header } from "@mantine/core";
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
          <Button component={Link} href="/signin" color="cyan.7">
            Sign in
          </Button>
          <Button component={Link} href="/new">
            New Xlug
          </Button>
        </Flex>
      </Flex>
    </Header>
  );
}

export { _Header as Header };
