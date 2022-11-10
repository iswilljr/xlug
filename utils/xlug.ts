import { supabase } from "./supabase";

interface Xlug {
  created_at: string;
  description?: string;
  destination: string;
  id: number;
  xlug: string;
}

export async function getXlug(xlug: string): Promise<Xlug | null> {
  const { data: xlugData, error } = await supabase.from("xlugs").select("*").eq("xlug", xlug);

  if (error) throw Error(error.message);

  return xlugData?.[0] ?? null;
}

export async function createXlug(data: Partial<Xlug>): Promise<Xlug | null> {
  const { data: xlugData, error } = await supabase.from("xlugs").insert(data).select();

  if (error) throw Error(error.message);

  return xlugData?.[0] ?? null;
}
