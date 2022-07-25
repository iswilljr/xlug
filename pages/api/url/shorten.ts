import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/initSupabase";
import withMethod from "utils/with-method";
import { id } from "config/id";

const NewUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const { destination } = req.body;
  if (!destination) return res.status(400).json({ message: "Missing destination" });
  let { data, error } = await supabase.from("urls").insert({
    id: id(),
    destination,
    email: user?.email || "",
    user_id: user?.id || "",
  });

  if (error) return res.status(500).json({ message: error.message });
  return res.status(200).json({ data: data && data.length ? data.at(0) : null });
};

export default withMethod("POST", NewUrl);
