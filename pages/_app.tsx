import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { DefaultSeo } from "next-seo";
import { Toaster } from "sonner";
import { defaultSeo } from "@/next-seo.config";
import { theme } from "@/utils/theme";
import { NavigationProgress } from "@/components/NavigationProgress";
import { Layout } from "@/components/Layout/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { layoutProps } = Component as any;

  return (
    <MantineProvider withNormalizeCSS withCSSVariables theme={theme}>
      <ModalsProvider>
        <Layout {...layoutProps}>
          <DefaultSeo {...defaultSeo} />
          <Component {...pageProps} />
          <NavigationProgress />
          <Toaster position="bottom-right" theme="dark" closeButton richColors />
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  );
}
