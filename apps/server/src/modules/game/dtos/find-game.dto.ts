import { z } from "zod";

export const findGameSchema = z.object({
  id: z.uuid(),
});

export type IFindGameDTO = z.infer<typeof findGameSchema>;
