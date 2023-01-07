"use client";

import { usePathname } from "next/navigation";
import { NextSeo, NextSeoProps } from "next-seo";
import NEXT_SEO_DEFAULT from "next-seo.config";

interface HeadProps extends NextSeoProps {}

export function HeadTag(props: HeadProps) {
  const pathname = usePathname();

  return (
    <NextSeo
      {...NEXT_SEO_DEFAULT}
      {...props}
      canonical={`${NEXT_SEO_DEFAULT.canonical as string}${pathname ?? "/"}`}
      useAppDir={true}
    />
  );
}
