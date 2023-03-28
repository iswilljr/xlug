import type { NextApiHandler } from "next";

const errors: Record<string, string> = {
  "23505": "This xlugs is already taken, try another one",
  default: "Something went wrong, try again",
};

export function apiHandler(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    if (req.method?.toLowerCase() !== "post") {
      return res.status(405).end();
    }

    try {
      await handler(req, res);
    } catch (error: any) {
      const message = errors[error.cause] ?? typeof error.message === "string" ? error.message : errors.default;
      return res.status(400).json({ message });
    }
  };
}
