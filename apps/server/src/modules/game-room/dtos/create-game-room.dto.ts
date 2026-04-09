import { z } from "zod";

export const createGameRoomSchema = z.object({
  id: z.uuid(),
  gameId: z.uuid(),
});

export type ICreateGameRoomDTO = z.infer<typeof createGameRoomSchema>;
