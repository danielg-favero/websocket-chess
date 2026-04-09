import { z } from "zod";

export const findGameRoomSchema = z.object({
  id: z.uuid(),
});

export type IFindGameRoomDTO = z.infer<typeof findGameRoomSchema>;
