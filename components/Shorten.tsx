import { LinkIcon } from "@heroicons/react/solid";
import { Anchor, Button, createStyles, Group, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  control: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[1],
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 4,
    [theme.fn.smallerThan("xs")]: { display: "block" },
  },
  truncate: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  destination: { flex: 1, [theme.fn.smallerThan("xs")]: { display: "none" } },
  link: {},
  options: {
    maxWidth: 200,
    flexWrap: "nowrap",
    display: "flex",
    alignItems: "center",
    marginLeft: 16,
    [theme.fn.smallerThan("xs")]: { flex: 1, justifyContent: "space-between", maxWidth: "initial", flexWrap: "wrap" },
  },
  icon: {
    width: 16,
    height: 16,
    fill: theme.colors.gray[6],
    marginRight: 8,
    [theme.fn.smallerThan("xs")]: { display: "none" },
  },
}));

interface ShortenProps {
  destination: string;
  id: string;
  idOnText?: boolean;
  host?: string;
}

const Shorten = ({ destination, id, idOnText, host }: ShortenProps) => {
  const { classes, cx } = useStyles();
  const clipboard = useClipboard();

  const link = `https://${host}/${id}`;

  return (
    <div className={classes.control}>
      <LinkIcon className={classes.icon} />
      <Text className={cx(classes.truncate, classes.destination)}>{idOnText ? link : destination}</Text>
      <Group spacing="sm" className={classes.options}>
        {!idOnText && <Anchor className={cx(classes.truncate, classes.link)}>{link}</Anchor>}
        <Button onClick={() => clipboard.copy(link)} color={clipboard.copied ? "green" : undefined}>
          {clipboard.copied ? "Copied" : "Copy"}
        </Button>
      </Group>
    </div>
  );
};

export default Shorten;
