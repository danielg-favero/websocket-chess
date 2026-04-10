import { z } from "zod";

export const newGameSchema = z.object({
  nickname: z.string().min(1, "Informe seu nickname"),
});

export const joinGameSchema = z.object({
  nickname: z.string().min(1, "Informe seu nickname"),
  gameRoomId: z.string().min(1, "Informe o código da partida"),
});
