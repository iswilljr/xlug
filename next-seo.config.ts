import type { NextSeoProps } from "next-seo";

const config: NextSeoProps = {
  title: "URL Shortener",
  titleTemplate: "%s - xlug",
  description: "A URL shortener built with Nextjs",
  defaultTitle: "xlug",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/logo.png",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon-60x60.png",
      sizes: "60x60",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon-76x76.png",
      sizes: "76x76",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon-120x120.png",
      sizes: "120x120",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon-152x152.png",
      sizes: "152x152",
    },
  ],
  openGraph: {
    site_name: "xlug",
    url: "https://xlug.vercel.app",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/banner.jpg",
        width: 1920,
        height: 1080,
        type: "image/jpg",
      },
    ],
  },
  twitter: {
    handle: "@iswilljr",
    site: "@iswilljr",
    cardType: "summary_large_image",
  },
};

export default config;