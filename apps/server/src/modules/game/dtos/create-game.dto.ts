import { z } from "zod";

export const createGameSchema = z.object({
  id: z.uuid(),
});

export type ICreateGameDTO = z.infer<typeof createGameSchema>;
