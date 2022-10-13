import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { getCookie } from "cookies-next";
import Layout from "components/Layout";
import SEO from "utils/seo";
import type { AppProps as NextAppProps } from "next/app";
import type { ColorScheme } from "@mantine/core";
import type { GetServerSidePropsContext } from "next";

interface AppProps extends NextAppProps {
  preferredColorScheme: ColorScheme;
}

export default function App({ Component, pageProps, preferredColorScheme }: AppProps) {
  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <DefaultSeo {...SEO} />
      <Layout preferredColorScheme={preferredColorScheme}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  preferredColorScheme: getCookie("preferred-color-theme", ctx) ?? "light",
});
