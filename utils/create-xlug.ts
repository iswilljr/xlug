import type { XlugProps } from "components/xlug";

export async function createXlug(xlug: Partial<XlugProps>) {
  const res = await fetch("/api/xlug", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(xlug),
  });

  const data = await res.json();

  if (!res.ok) throw Error(data.message);

  const localXlugs = JSON.parse(localStorage.getItem("xlugs") ?? "[]");
  const newXlugs = ([] as any[]).concat(data.xlug, Array.isArray(localXlugs) ? localXlugs : []);

  localStorage.setItem("xlugs", JSON.stringify(newXlugs));
}
