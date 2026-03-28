import type { IGameRoomState } from "@websocket-chess/shared";

import { http } from "@api/http";
import { error, ok } from "@helpers/result";

export async function createGameRoom() {
  const response = await http.post<IGameRoomState>("/game");

  if (!response.data) {
    return error({ reason: "No game room state returned" });
  }

  return ok(response.data);
}
