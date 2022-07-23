const urlRegExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const emailRegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export function isValidUrl(url: string, host?: string) {
  const localUrlRegExp = new RegExp(`^(http|https)\:\/\/${host}.+`);
  if (localUrlRegExp.test(url)) return false;
  return urlRegExp.test(url);
}

export function isValidUsername(username: string, type: "login" | "register") {
  return type === "login" || (username.length >= 4 && username.length <= 20 && /^[a-z0-9_.]+$/i.test(username));
}

export const isValidEmail = (email: string) => emailRegExp.test(email);

export function getDate(data: string) {
  return new Date(data).toLocaleString("en-EN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
  });
}
