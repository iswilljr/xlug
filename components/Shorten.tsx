import Link from "next/link";
import { Anchor, Button, Group, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { EyeIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useStyles } from "../styles/shorten";

interface ShortenProps {
  destination: string;
  id: string;
  onlyShowShortenLink?: boolean;
}

const Shorten = ({ destination, id, onlyShowShortenLink }: ShortenProps) => {
  const { classes, cx } = useStyles({ idOnText: onlyShowShortenLink });
  const clipboard = useClipboard();

  const link = `${process.env.NEXT_PUBLIC_URL ?? ""}/${id}`;

  return (
    <div className={classes.control}>
      <Link href={`/${id}+`}>
        <Anchor className={classes.details} href={`/${id}+`} id="details" title="Shorten link details">
          <EyeIcon width="24" height="24" />
        </Anchor>
      </Link>
      <LinkIcon className={classes.icon} />
      <Text className={cx(classes.truncate, classes.destination)}>{onlyShowShortenLink ? link : destination}</Text>
      <Group spacing="sm" className={classes.options}>
        {onlyShowShortenLink ? (
          <Text className={cx(classes.truncate, classes.destination, classes.link)}>{link}</Text>
        ) : (
          <Anchor
            href={link}
            target="_blank"
            rel="noreferrer"
            className={cx(classes.truncate, classes.destination, classes.link)}
          >
            {link}
          </Anchor>
        )}
        <Button
          onClick={() => clipboard.copy(link)}
          color={clipboard.error ? "red" : clipboard.copied ? "green" : undefined}
        >
          {clipboard.error ? "Error Copying" : clipboard.copied ? "Copied" : "Copy"}
        </Button>
      </Group>
    </div>
  );
};

export default Shorten;
