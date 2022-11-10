import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { createXlug, getXlug } from "utils/xlug";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => res.status(400).json({ message: err.message }),
});

handler
  .get(async (req, res) => {
    if (!req.query.xlug) throw Error("Missing 'xlug' from Url Search Params");

    const xlug = await getXlug((req.query.xlug as string) ?? "");

    if (!xlug || !xlug.xlug) return res.status(404).json(null);

    res.json({ xlug });
  })
  .post(async (req, res) => {
    const { description, destination, xlug } = req.body as Record<string, unknown>;

    if (
      typeof destination !== "string" ||
      typeof xlug !== "string" ||
      (description && typeof description !== "string")
    ) {
      throw TypeError("Invalid data");
    }

    if (!destination || !xlug) {
      throw Error(`Missing required data '${destination ? "xlug" : "destination"}'`);
    }

    if (!/^https?:\/\/.+$/.test(destination)) {
      throw Error(`Invalid destination expected a url, got "${destination}"`);
    }

    if (!/^[a-zA-Z0-9_-]+$/i.test(xlug)) {
      throw Error("Invalid xlug expected a xlug without blank spaces or special characters");
    }

    const xlugData = await createXlug({
      description: description as string,
      destination,
      xlug,
    });

    if (!xlugData || !xlugData.xlug) return res.status(404).json(null);

    res.json({ xlug: xlugData });
  });

export default handler;
