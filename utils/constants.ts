import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";

export function isValidUrl(url: string, host: string) {
  if (url.startsWith(host)) return "Can't shorten a shortened URL";
  if (!isURL(url, { require_protocol: true, require_host: true })) return "Invalid URL";
  return null;
}

export function isValidUsername(username: string, type: "login" | "register") {
  return type === "login" || (username.length >= 4 && username.length <= 20 && /^[a-z0-9_.]+$/i.test(username));
}

export const isValidEmail = (email: string) => (isEmail(email) ? null : "Invalid email");

export function getDate(date: string) {
  return new Date(date).toLocaleString("en-EN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
  });
}
