import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { deleteXlugSchema } from "@/utils/schemas";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "@/types/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = deleteXlugSchema.parse(req.body);

  const supabase = createServerSupabaseClient<Database>({ req, res });

  const { data, error } = await supabase.from("xlugs").delete().eq("id", id).select("*").single();

  if (error) return res.status(404).json(error.message);

  return res.json(data);
}
