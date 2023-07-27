/* eslint-disable react-hooks/rules-of-hooks */
import { Anchor, Flex, Footer, Text } from "@mantine/core";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { useStyles } from "./common.styles";

export function _Footer() {
  const { classes, cx } = useStyles();

  return (
    <Footer className={cx(classes.container, classes.footer)} height={65}>
      <Flex className={classes.body}>
        <Text color="gray.9" size="xs">
          Made by{" "}
          <Anchor
            color="blue.9"
            href="https://github.com/iswilljr"
            target="_blank"
            rel="noreferrer"
            aria-label="My github profile"
          >
            iswilljr
          </Anchor>
        </Text>
        <Anchor
          sx={(theme) => ({ color: theme.white })}
          href="https://github.com/iswilljr/xlug"
          target="_blank"
          rel="noreferrer"
          aria-label="Source code of the project"
        >
          <Flex align="flex-end">
            <IconBrandGithubFilled />
          </Flex>
        </Anchor>
      </Flex>
    </Footer>
  );
}

export { _Footer as Footer };
