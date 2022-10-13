export interface Url {
  id: string;
  created_at: string;
  destination: string;
  email?: string;
  user_id?: string;
}

export async function shortenUrl(destination: string): Promise<{ data: Url }> {
  const res = await fetch("/api/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destination }),
  });
  return await res.json();
}
