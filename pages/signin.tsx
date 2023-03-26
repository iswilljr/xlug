import { Button } from "@/components/Button";
import { IconGithub } from "@/components/icons";
import { Box, Center } from "@mantine/core";
import React from "react";

export default function SignIn() {
  return (
    <Center w="100%" mih="100vh">
      <Box ta="center">
        <Button
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            paddingLeft: `calc(${theme.spacing.xl} * 2)`,
            paddingRight: `calc(${theme.spacing.xl} * 2)`,
            ":hover": {
              backgroundColor: "transparent",
            },
          })}
          mt="sm"
          mx="auto"
          size={16}
          color="gray.5"
        >
          <Center mr={4}>
            <IconGithub fill="#fff" size={30} />
          </Center>
          Continue With Github
        </Button>
      </Box>
    </Center>
  );
}

SignIn.layoutProps = {
  hidden: true,
};
