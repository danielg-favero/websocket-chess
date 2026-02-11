import type { IGameState } from "@interfaces/game-state";

import { http } from "@api/http";
import { error, ok } from "@helpers/result";

export async function createGame() {
  const response = await http.post<IGameState>("/game");

  if (!response.data) {
    return error({ reason: "No game state returned" });
  }

  return ok(response.data);
}
