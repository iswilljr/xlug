import { Button } from "@/components/Button";
import { createStyles, rem, SimpleGrid, Text, Title } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    margin: "auto",
    maxWidth: theme.breakpoints.xl,
    padding: `5rem ${rem(24)}`,
    "::before": {
      content: '""',
      background: theme.fn.rgba(theme.colors.blue[7], 0.1),
      filter: "blur(100px)",
      width: 400,
      height: 500,
      position: "absolute",
      right: 0,
      top: -50,
      zIndex: -1,
    },
    [theme.fn.largerThan("sm")]: {
      padding: `5rem ${rem(64)}`,
    },
  },
  body: {
    gridColumn: "span 2",
  },
}));

export default function Home() {
  const { classes } = useStyles();

  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]} className={classes.container}>
      <section className={classes.body}>
        <Title size={50}>A fast and simple URL shortener.</Title>
        <Text mt="xl" color="gray.9">
          A link shortener tool that allows you to create shorter, more manageable versions of long URLs. Take the long
          URL and generate a unique, shortened URL that redirects to the original website when clicked.
        </Text>
        <Button component={Link} href="/dashboard" w="fit-content" mt="xl" px="xl" py={8} lh={1} size={18}>
          Get Started
        </Button>
      </section>
    </SimpleGrid>
  );
}
