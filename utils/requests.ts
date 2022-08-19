export interface Url {
  id: string;
  created_at: string;
  destination: string;
  email?: string;
  user_id?: string;
}

interface Options {
  method?: string;
  isContentTypeJson?: boolean;
  body?: any;
  headers?: any;
}

function makeRequest(url: string, { method = "POST", body, headers = {}, isContentTypeJson }: Options = {}) {
  const options = { method, headers, body: isContentTypeJson ? JSON.stringify(body) : body };
  if (isContentTypeJson) options.headers["Content-Type"] = "application/json";
  return fetch(url, options);
}

export function login(email: string, password: string) {
  return makeRequest("/api/auth/login", { body: { email, password }, isContentTypeJson: true });
}

export function logout() {
  return makeRequest("/api/auth/logout")
    .then((res) => res.json())
    .catch(() => {});
}

export function signup(email: string, password: string, username: string) {
  return makeRequest("/api/auth/signup", { body: { email, password, username }, isContentTypeJson: true });
}

export function shorten(destination: string): Promise<{ data: Url | null }> {
  return makeRequest("/api/url/shorten", { body: { destination }, isContentTypeJson: true }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(res.statusText);
  });
}
