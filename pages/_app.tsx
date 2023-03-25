import dynamic from "next/dynamic";
import { MantineProvider } from "@mantine/core";
import { DefaultSeo } from "next-seo";
import { defaultSeo } from "@/next-seo.config";
import { theme } from "@/utils/theme";
import { Layout } from "@/components/Layout/Layout";
import type { AppProps } from "next/app";

const Toaster = dynamic(async () => (await import("sonner")).Toaster, { ssr: false });
const NavigationProgress = dynamic(async () => (await import("@/components/NavigationProgress")).NavigationProgress, {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const { layoutProps } = Component as any;

  return (
    <MantineProvider withNormalizeCSS withCSSVariables theme={theme}>
      <Layout {...layoutProps}>
        <DefaultSeo {...defaultSeo} />
        <Component {...pageProps} />
        <NavigationProgress />
        <Toaster position="bottom-right" theme="dark" closeButton richColors />
      </Layout>
    </MantineProvider>
  );
}
