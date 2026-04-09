import { z } from "zod";

export const findPlayerSchema = z.object({
  id: z.uuid(),
});

export type IFindPlayerDTO = z.infer<typeof findPlayerSchema>;
