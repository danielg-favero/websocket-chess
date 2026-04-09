import { z } from "zod";

import { TColorValue } from "@websocket-chess/shared";

export const createPlayerSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string(),
  color: z.enum(["WHITE", "BLACK"]),
});

export type ICreatePlayerDTO = z.infer<typeof createPlayerSchema>;
