import type { GetServerSideProps } from "next";
import { LinkIcon } from "@heroicons/react/outline";
import { Button, Container, Group, Input, Text, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import Shorten from "components/Shorten/Shorten";
import { supabase } from "lib/initSupabase";
import { useStore } from "store/store";
import { HomeGroupStyle, HomeTextStyle } from "styles/styles";
import { isValidUrl } from "utils/constants";
import { shorten, Url } from "utils/requests";
import { useStyles } from "styles/home";

export default function Profile({ shortenUrls }: { shortenUrls: Url[] }) {
  const { classes } = useStyles();
  const isSignedIn = useStore((state) => state.isSignedIn);

  const [urls, setUrls] = useLocalStorage<Url[]>({
    key: "shorten",
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const form = useForm({
    initialValues: { url: "" },
    validate: { url: isValidUrl },
  });

  return (
    <Container className={classes.control}>
      <Title order={1}>Free URL Shortener</Title>
      <Text size="sm">This is a free tool to shorten URLs.</Text>

      <form
        style={{ marginTop: 32, width: "100%" }}
        onSubmit={form.onSubmit(async ({ url }) => {
          try {
            const { data } = await shorten(url);

            if (!data) throw new Error("No data");

            if (!isSignedIn) setUrls((prev) => [data, ...prev]);
            else shortenUrls.unshift(data);
            form.reset();
          } catch (__) {
            form.setFieldError("url", "Something went wrong, please try again");
          }
        })}
      >
        <Group style={HomeGroupStyle} spacing="xs">
          <Input
            className={classes.input}
            style={{ flex: 1 }}
            size="md"
            icon={<LinkIcon width={22} height={22} />}
            placeholder="Insert the url to shorten here"
            value={form.values.url}
            onChange={(e: any) => form.setFieldValue("url", e.target.value)}
          />
          <Button className={classes.input} size="md" type="submit">
            Shorten
          </Button>
        </Group>

        {form.errors.url && (
          <Text color="red" style={{ marginTop: 4 }}>
            {typeof form.errors.url === "string" ? form.errors.url : "Invalid url, please try again"}
          </Text>
        )}
      </form>

      <div className={classes.wrapper}>
        {isSignedIn && !!shortenUrls.length && (
          <>
            <Text weight={700} style={HomeTextStyle}>
              Your account&#39;s Shorten URLS
            </Text>
            {shortenUrls.map((url) => (
              <Shorten key={url.id} destination={url.destination} id={url.id} />
            ))}
          </>
        )}

        {!!urls.length && (
          <>
            <Text weight={700} style={HomeTextStyle}>
              Your local Shorten URLS
            </Text>
            {urls.map((url) => (
              <Shorten key={url.id} destination={url.destination} id={url.id} />
            ))}
          </>
        )}
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req, res);
  if (!user) return { props: { shortenUrls: [] } };
  const { data, error } = await supabase.from("urls").select("*").eq("user_id", user.id);
  if (error ?? !data ?? !data.length) return { props: { shortenUrls: [] } };
  return { props: { shortenUrls: data } };
};
