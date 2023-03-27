import { Button } from "@/components/Button";
import { createStyles, Flex, SimpleGrid, Text, Title } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    margin: "auto",
    padding: "5rem 0",
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
  },
  body: {
    gridColumn: "span 2",
  },
}));

const links = [
  {
    href: "/new",
    label: "Get Started",
  },
  {
    href: "/dashboard",
    label: "Go to dashboard",
    color: "cyan.7",
  },
];

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
        <Flex mt="xl" gap="xs">
          {links.map((link) => (
            <Button key={link.href} component={Link} href={link.href} color={link.color} px="md" py={8}>
              {link.label}
            </Button>
          ))}
        </Flex>
      </section>
    </SimpleGrid>
  );
}
