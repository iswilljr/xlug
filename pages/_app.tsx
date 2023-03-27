import dynamic from "next/dynamic";
import { useRef } from "react";
import { MantineProvider } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
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
  const supabaseClient = useRef(createBrowserSupabaseClient()).current;
  const { layoutProps } = Component as any;

  return (
    <MantineProvider withNormalizeCSS withCSSVariables theme={theme}>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.session}>
        <Layout {...layoutProps}>
          <DefaultSeo {...defaultSeo} />
          <Component {...pageProps} />
          <NavigationProgress />
          <Toaster position="bottom-right" theme="dark" closeButton richColors />
        </Layout>
      </SessionContextProvider>
    </MantineProvider>
  );
}
