import { Flex, Header } from "@mantine/core";
import { Button } from "../Button";
import { Logo } from "../Logo";
import { useStyles } from "./common.styles";

export function _Header() {
  const { classes, cx } = useStyles();

  return (
    <Header className={cx(classes.container, classes.header)} height={65}>
      <Flex className={classes.body}>
        <Logo />
        <Button color="cyan.8">Sign in</Button>
      </Flex>
    </Header>
  );
}

export { _Header as Header };
