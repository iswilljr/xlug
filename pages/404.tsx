import Head from "next/head";
import { Anchor, Text, Title } from "@mantine/core";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Url Shortener | Page Not FOund</title>
      </Head>
      <Title order={1}>Something&#39;s wrong here.</Title>
      <Text>
        If you think this is a error report it{" "}
        <Anchor href="https://github.com/iswilljr/url-shortener/issues" target="_blank" rel="noreferrer">
          here
        </Anchor>
        . Otherwise, go back to{" "}
        <Link href="/">
          <Anchor>Home</Anchor>
        </Link>
      </Text>
    </>
  );
};

export default NotFound;
