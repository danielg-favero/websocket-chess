import type { IGameState } from "@interfaces/game-state";

import { http } from "@api/http";

export async function createGame(): Promise<IGameState> {
  const response = await http.post<IGameState>("/game");

  return response.data;
}
