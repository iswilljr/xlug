interface Options {
  method?: string;
  isContentTypeJson?: boolean;
  body?: any;
  headers?: any;
}

const makeRequest = (url: string, { method = "POST", body, headers = {}, isContentTypeJson }: Options = {}) => {
  const options = { method, headers, body: isContentTypeJson ? JSON.stringify(body) : body };
  if (isContentTypeJson) options.headers["Content-Type"] = "application/json";
  return fetch(url, options);
};

export const login = (email: string, password: string) =>
  makeRequest("/api/auth/login", { body: { email, password }, isContentTypeJson: true });

export const logout = () =>
  makeRequest("/api/auth/logout")
    .then((res) => res.json())
    .catch(() => {});

export const signup = (email: string, password: string, username: string) =>
  makeRequest("/api/auth/signup", { body: { email, password, username }, isContentTypeJson: true });

export interface Url {
  id: string;
  created_at: string;
  destination: string;
  email?: string;
  user_id?: string;
}

export const getUrlInfoFromId = (id: string, host?: string): Promise<{ data: Url | null }> => {
  console.log(id, host, `//${host}/api/url/${id}`);
  return makeRequest(`${process.env.NODE_ENV === "production" ? "https" : "http"}://${host}/api/url/${id}`)
    .then((res) => {
      if (res.ok) return res.json();
      return { data: null };
    })
    .catch((e) => (console.log(e), { data: null }));
};

export const shorten = (destination: string): Promise<{ data: Url | null }> =>
  makeRequest("/api/url/shorten", { body: { destination }, isContentTypeJson: true }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(res.statusText);
  });
