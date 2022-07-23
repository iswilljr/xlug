import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/initSupabase";
import withMethod from "utils/with-method";

const GetUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await supabase.from("urls").select("*").eq("id", req.query.id);
  return res.status(200).json({ data: data && data.length ? data.at(0) : null });
};

export default withMethod(["POST", "GET"], GetUrl);
