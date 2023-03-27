import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { editXlugSchema } from "@/utils/schemas";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "@/types/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, xlug, destination, description } = editXlugSchema.parse(req.body);

  if (!id) return res.status(400).json({ message: "The id is required" });

  const supabase = createServerSupabaseClient<Database>({ req, res });

  const { data, error } = await supabase
    .from("xlugs")
    .update({
      xlug,
      description,
      destination,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return res.status(404).json(error.message);

  return res.json(data);
}
