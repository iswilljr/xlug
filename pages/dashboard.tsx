import { Box, Text } from "@mantine/core";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Box py="md">
      <Text ta="center" sx={(theme) => ({ color: theme.fn.lighten(theme.colors.gray[9], 0.1) })}>
        Nothing to see here
      </Text>
      <Button mx="auto" w="fit-content" mt="md" component={Link} href="/new" px="md" py={8} size={16}>
        Get Started
      </Button>
    </Box>
  );
}
