import type { GetServerSidePropsContext } from "next";
import type { AppProps as NextAppProps } from "next/app";
import type { ColorScheme } from "@mantine/core";
import Head from "next/head";
import { useEffect } from "react";
import { DefaultSeo } from "next-seo";
import SEO from "config/seo";
import { getCookie } from "cookies-next";
import { useStore } from "store/store";
import Layout from "components/Layout/Layout";

interface AppProps extends NextAppProps {
  preferredColorScheme: ColorScheme;
  isSignedIn: boolean;
}

export default function App({ Component, pageProps, preferredColorScheme, isSignedIn }: AppProps) {
  const setSignIn = useStore((state) => state.setSignIn);

  useEffect(() => setSignIn(isSignedIn), [isSignedIn, setSignIn]);

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
  isSignedIn: !!(getCookie("sb-access-token", ctx) && getCookie("sb-refresh-token", ctx)),
});
