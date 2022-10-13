import { Button, Container, Group, Input, Text, Title } from "@mantine/core";
import { HomeGroupStyle, HomeTextStyle } from "styles/css";
import { isValidUrl } from "utils/is-valid-url";
import { LinkIcon } from "@heroicons/react/24/outline";
import { shortenUrl, Url } from "utils/shorten-url";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { useStyles } from "styles/home";
import Shorten from "components/Shorten";

export default function Profile() {
  const { classes } = useStyles();
  const [urls, setUrls] = useLocalStorage<Url[]>({ key: "shorten", defaultValue: [] });
  const form = useForm({ initialValues: { url: "" }, validate: { url: isValidUrl } });

  return (
    <Container className={classes.control}>
      <Title style={{ textAlign: "center" }} order={1}>
        Free URL Shortener
      </Title>
      <Text style={{ textAlign: "center" }} size="sm">
        This is a free tool to shorten URLs.
      </Text>
      <form
        style={{ marginTop: 32, width: "100%" }}
        onSubmit={form.onSubmit(({ url }) => {
          return shortenUrl(url)
            .then(({ data }) => {
              setUrls((prev) => [data, ...prev]);
              form.reset();
            })
            .catch(() => form.setFieldError("url", "Something went wrong, please try again"));
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
          <Text color="red" mt="xs">
            {typeof form.errors.url === "string" ? form.errors.url : "Invalid url, please try again"}
          </Text>
        )}
      </form>
      <div className={classes.wrapper}>
        {urls.length !== 0 && (
          <>
            <Text weight={700} style={HomeTextStyle}>
              Your local Shorten URLS
            </Text>
            {urls.map((url) => (
              <Shorten key={url.id} {...url} />
            ))}
          </>
        )}
      </div>
    </Container>
  );
}
