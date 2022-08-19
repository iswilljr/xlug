// import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/initSupabase";
import withMethod from "utils/with-method";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: user } = await supabase.auth.api.getUserByCookie(req, res);
  if (user) return res.status(200).json({ message: "Already logged in" });
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: `Missing required value ${!email ? "email" : "password"}` });
  }
  const { data: session, error } = await supabase.auth.api.signInWithEmail(email, password);
  if (error ?? !session) return res.status(400).json({ error: error?.message ?? "Invalid email or password" });
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  req.body = { event: "SIGNED_IN", session } as { event: AuthChangeEvent; session: Session };
  return supabase.auth.api.setAuthCookie(req, res);
};

export default withMethod("POST", Login);
