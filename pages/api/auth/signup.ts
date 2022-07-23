import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/initSupabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import withMethod from "utils/with-method";

// Example of how to verify and get user data server-side.
const SignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(404).json({ message: "Not Found" });
  const { user } = await supabase.auth.api.getUserByCookie(req, res);
  if (user) return res.status(200).json({ message: "Already logged in" });
  const { email, password, username } = req.body;
  if (!email || !password || !username) return res.status(400).json({ message: "Missing required value" });
  const { data: session, error } = await supabase.auth.api.signUpWithEmail(email, password, { data: { username } });
  if (error || !session) return res.status(400).json({ error: error?.message || "Invalid email or password" });
  return res.status(200).json({ message: "Success" });
};

export default withMethod("POST", SignUp);
