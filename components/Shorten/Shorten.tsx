import Link from "next/link";
import { Anchor, Button, Group, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { EyeIcon, LinkIcon } from "@heroicons/react/outline";
import { useStyles } from "./styles";

interface ShortenProps {
  destination: string;
  id: string;
  idOnText?: boolean;
}

const Shorten = ({ destination, id, idOnText }: ShortenProps) => {
  const { classes, cx } = useStyles({ idOnText });
  const clipboard = useClipboard();

  const link =
    typeof window !== "undefined" ? `${window.location.origin}/${id}` : `${process.env.NEXT_PUBLIC_URL ?? ""}/${id}`;

  return (
    <div className={classes.control}>
      <Link href={`/${id}+`}>
        <Anchor className={classes.details} href={`/${id}+`} id="details" title="Shorten link details">
          <EyeIcon width="24" height="24" />
        </Anchor>
      </Link>

      <LinkIcon className={classes.icon} />
      <Text className={cx(classes.truncate, classes.destination)}>{idOnText ? link : destination}</Text>

      <Group spacing="sm" className={classes.options}>
        {idOnText ? (
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

        <Button onClick={() => clipboard.copy(link)} color={clipboard.copied ? "green" : undefined}>
          {clipboard.copied ? "Copied" : "Copy"}
        </Button>
      </Group>
    </div>
  );
};

export default Shorten;
