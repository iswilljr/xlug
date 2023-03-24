import { DefaultSeo } from "next-seo";
import { defaultSeo } from "@/next-seo.config";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <Component {...pageProps} />
    </>
  );
}
