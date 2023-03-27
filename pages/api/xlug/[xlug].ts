import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getUniqueXlugSchema } from "@/utils/schemas";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "@/types/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { xlug } = getUniqueXlugSchema.parse(req.query);

  const supabase = createServerSupabaseClient<Database>({ req, res });

  const { data, error } = await supabase.from("xlugs").select("*").eq("xlug", xlug).single();

  if (error) return res.status(404).json(error.message);

  return res.json(data);
}
