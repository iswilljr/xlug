import type { NextApiHandler } from "next";

export default function withMethod(method: string | string[], handler: NextApiHandler): NextApiHandler {
  return function Handler(req, res) {
    if (
      !method
        .toString()
        .toLowerCase()
        .includes((req.method as string).toLowerCase())
    )
      return res.status(404).json({ message: "Not Found" });
    return handler(req, res);
  };
}
