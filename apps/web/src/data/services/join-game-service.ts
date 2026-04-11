import { HTTPMethod, type IHTTPClient } from "@infra/http/types";

import type {
  IJoinGameService,
  JoinGamePayload,
} from "./join-game-service.types";

import type { GameRoom } from "@domain/models/game-room.model";

export class JoinGameService implements IJoinGameService {
  constructor(private httpClient: IHTTPClient) {}

  async execute(payload: JoinGamePayload): Promise<GameRoom> {
    const { gameRoomId, playerNickname, playerId } = payload;

    const response = await this.httpClient.sendRequest<GameRoom>({
      endpoint: `/game/${gameRoomId}/join`,
      method: HTTPMethod.PATCH,
      body: {
        playerNickname,
        playerId,
      },
    });

    return response.data;
  }
}
