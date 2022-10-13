import { generateID } from "utils/generate-id";
import { isUrl } from "utils/is-valid-url";
import { supabase } from "utils/supabase";
import type { NextApiHandler } from "next";

const newUrl: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() !== "post") return res.status(405).send("method not allowed");

  try {
    const { destination } = req.body;
    if (!destination) return res.status(400).json({ message: "Missing destination" });

    if (!isUrl(destination)) return res.status(400).json({ message: "Invalid destination" });

    const { data, error } = await supabase
      .from("urls")
      .insert({
        id: generateID(),
        destination,
      })
      .select();

    const shortenUrl = data?.[0] ?? null;

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (error || !shortenUrl) return res.status(400).json({ message: error?.message });

    res.json({ data: shortenUrl });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default newUrl;
