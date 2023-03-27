import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "@/types/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient<Database>({ req, res });

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  const { session } = sessionData;

  if (sessionError ?? !session) return res.status(400).json(sessionError?.message ?? "Unauthorized");

  const { data, error } = await supabase.from("xlugs").select("*").eq("user_id", session.user.id);

  if (error) return res.status(404).json(error.message);

  return res.json(data);
}
