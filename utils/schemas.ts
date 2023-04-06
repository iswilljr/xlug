import { z } from "zod";

const xlugRegex = /^[a-zA-Z0-9_.-]+$/;

const urlMessage = "Destination should be a valid url";
const xlugMessage = "The xlug must contain only letters, numbers, dots, dashes and underscores";
const xlugMinMessage = "Xlug must contain at least 1 character";

export const deleteXlugSchema = z.object({
  id: z.string().uuid(),
});

export const editXlugSchema = z.object({
  id: z.string().uuid().optional(),
  xlug: z.string().regex(xlugRegex, { message: xlugMessage }).min(1, { message: xlugMinMessage }).optional(),
  destination: z.string().url({ message: urlMessage }).optional(),
  description: z.string().optional(),
});

export const newXlugSchema = z.object({
  xlug: z.string().regex(xlugRegex, { message: xlugMessage }).min(1, { message: xlugMinMessage }),
  destination: z.string().url({ message: urlMessage }),
  description: z.string().optional(),
});
