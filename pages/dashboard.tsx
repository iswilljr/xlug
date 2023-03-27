import { Flex, Text } from "@mantine/core";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Flex direction="column" justify="center" align="center" py="md">
      <Text ta="center" sx={(theme) => ({ color: theme.fn.lighten(theme.colors.gray[9], 0.1) })}>
        Nothing to see here
      </Text>
      <Button mt="md" component={Link} href="/new" px="md" py={8}>
        Get Started
      </Button>
    </Flex>
  );
}
