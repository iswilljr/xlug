import { createStyles, Group, ActionIcon, Text } from "@mantine/core";
import { GithubIcon, TwitterIcon } from "./icons";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 64px",
  },
  text: {
    color: theme.colors.gray[6],
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Text className={classes.text} size="xs">
        Copyright © {new Date().getFullYear()} iswilljr.
      </Text>
      <Group spacing={4} position="right" noWrap>
        <IconLink href="https://github.com/iswilljr" icon={GithubIcon} />
        <IconLink href="https://twitter.com/iswilljr" icon={TwitterIcon} />
      </Group>
    </footer>
  );
}

const IconLink = ({ href, icon: Icon }: { href: string; icon: React.ComponentType<any> }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <ActionIcon color="gray" size="xs">
      <Icon />
    </ActionIcon>
  </a>
);
