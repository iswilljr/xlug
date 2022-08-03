import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { TextInput, PasswordInput, Text, Paper, Group, Button, Anchor, Notification } from "@mantine/core";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { login, signup } from "utils/requests";
import { isValidEmail, isValidUsername } from "utils/constants";
import { LoginNotificationStyle, LoginNotificationWrapperStyle, LoginSx } from "styles/styles";
import { supabase } from "lib/initSupabase";

export default function Profile() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [type, toggle] = useToggle<"login" | "register">(["login", "register"]);
  const form = useForm({
    initialValues: { username: "", email: "", password: "", submit: "" },
    validate: {
      username: (v) =>
        isValidUsername(v, type)
          ? null
          : "Username must be between 4 and 20 characters and can only contain letters, numbers, dots and underscores",
      email: isValidEmail,
      password: (v) => (v.length >= 6 ? null : "Password should include at least 6 characters"),
    },
  });

  return (
    <Paper sx={LoginSx} radius="md" p="xl" mx="xl" withBorder>
      <Text align="center" size="xl" mb="xl" weight={500} style={{ width: "100%" }}>
        Welcome to Url Shortener, please {type === "login" ? "login" : "signup"}
      </Text>
      <form
        onSubmit={form.onSubmit(async ({ email, username, password }) => {
          try {
            const res = await (type === "login" ? login(email, password) : signup(email, username, password));
            if (!res.ok) return form.setErrors({ submit: "Invalid credentials" });
            if (type === "login") return router.push("/");
            form.reset(), toggle("login"), setOpened(true);
          } catch (error) {
            form.setFieldError("submit", "Something went wrong, please try again");
          }
        })}
        style={{ width: "100%" }}
      >
        {type === "register" && (
          <TextInput
            mb={8}
            label="Username"
            placeholder="Your name"
            value={form.values.username}
            onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
            error={form.errors.username}
          />
        )}
        <TextInput
          mb={8}
          label="Email"
          placeholder="youremail@email.com"
          value={form.values.email}
          onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
          error={form.errors.email}
        />
        <PasswordInput
          mb={8}
          label="Password"
          placeholder="Your password"
          value={form.values.password}
          onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
          error={form.errors.password}
        />
        {form.errors.submit && (
          <Text size="sm" color="red">
            {form.errors.submit}
          </Text>
        )}
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => (toggle(), form.clearErrors())}
            size="xs"
          >
            {type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
      {opened && (
        <div style={LoginNotificationWrapperStyle}>
          <Notification
            styles={{ root: LoginNotificationStyle }}
            onClose={() => setOpened(false)}
            title="Successfully signed up"
          >
            Please check your email to verify your account and login.
          </Notification>
        </div>
      )}
    </Paper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req, res);
  if (!user) return { props: {} };
  return { redirect: { destination: "/", permanent: false } };
};
