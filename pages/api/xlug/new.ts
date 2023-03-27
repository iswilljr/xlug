import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { newXlugSchema } from "@/utils/schemas";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "@/types/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { xlug, destination, description } = newXlugSchema.parse(req.body);

  const supabase = createServerSupabaseClient<Database>({ req, res });
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  const { session } = sessionData;

  if (sessionError) return res.status(404).json(sessionError.message);

  const { data, error } = await supabase
    .from("xlugs")
    .insert({
      xlug,
      description,
      destination,
      user_id: session ? session.user.id : null,
    })
    .select("*")
    .single();

  if (error) return res.status(404).json(error.message);

  return res.json(data);
}
