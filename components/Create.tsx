import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Box } from "@mantine/core";

interface CreateProps {
  action?: string;
}

export function Create({ action }: CreateProps) {
  return (
    <Box component="form" py="md" sx={{ display: "grid", gap: 12 }}>
      <Input id="destination" label="Destination URL" placeholder="https://xlug.vercel.app" inputMode="url" />
      <Input id="id" label="Custom Id" placeholder="xlug" inputMode="url" />
      <Input textarea id="description" label="Description (optional)" />
      <Button px="xl" py={6} w="fit-content" size={16}>
        {action ?? "Create Xlug"}
      </Button>
    </Box>
  );
}
