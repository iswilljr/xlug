import type { DefaultSeoProps } from "next-seo";
const title = "Url Shortener | Shorten your links";
const description = "Shorten your links and share them with your friends";

const SEO: DefaultSeoProps = {
  title,
  description,
  canonical: "https://ursh.netlify.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ursh.netlify.app",
    title,
    description,
    images: [
      {
        url: "https://ursh.netlify.app/seo.jpeg",
        alt: title,
        width: 1200,
        height: 627,
      },
    ],
  },
  twitter: {
    handle: "@iswilljr",
    site: "@iswilljr",
    cardType: "summary_large_image",
  },
};

export default SEO;
