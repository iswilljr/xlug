import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { DefaultSeo } from "next-seo";
import { Toaster } from "sonner";
import { defaultSeo } from "@/next-seo.config";
import { theme } from "@/utils/theme";
import { NavigationProgress } from "@/components/NavigationProgress";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withNormalizeCSS theme={theme}>
      <ModalsProvider>
        <DefaultSeo {...defaultSeo} />
        <Component {...pageProps} />
        <NavigationProgress />
        <Toaster position="bottom-right" theme="dark" closeButton richColors />
      </ModalsProvider>
    </MantineProvider>
  );
}
