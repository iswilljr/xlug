import { z } from "zod";

const urlMessage = "Destination should be a valid url";
const xlugMinMessage = "Xlug must contain at least 1 character";

export const deleteXlugSchema = z.object({
  id: z.string().uuid(),
});

export const editXlugSchema = z.object({
  id: z.string().uuid().optional(),
  xlug: z.string().min(1, { message: xlugMinMessage }).optional(),
  destination: z.string().url({ message: urlMessage }).optional(),
  description: z.string().optional(),
});

export const newXlugSchema = z.object({
  xlug: z.string().min(1, { message: xlugMinMessage }),
  destination: z.string().url({ message: urlMessage }),
  description: z.string().optional(),
});
