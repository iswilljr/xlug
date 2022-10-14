import validatorIsURL from "validator/lib/isURL";

export function isValidUrl(url: string): string | null {
  if (url.startsWith(typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_URL ?? "")) {
    return "Can't shorten a shortened URL";
  }
  if (!isUrl(url)) return "Invalid URL";
  return null;
}

export function isUrl(url: string) {
  return validatorIsURL(url, { require_protocol: true, require_host: true });
}
