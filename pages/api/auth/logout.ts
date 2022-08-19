import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/initSupabase";
import withMethod from "utils/with-method";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, token, error: userError } = await supabase.auth.api.getUserByCookie(req, res);
  if (userError) return res.status(401).json({ message: userError.message });
  if (!user || !token) return res.status(401).json({ message: "Not logged in" });
  const { error } = await supabase.auth.api.signOut(token);
  if (error) return res.status(401).json({ message: error.message });
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  req.body = { session: {}, event: "SIGNED_OUT" } as { event: AuthChangeEvent; session: Session };
  return supabase.auth.api.setAuthCookie(req, res);
};

export default withMethod("POST", Logout);
