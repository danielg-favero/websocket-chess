import { HTTPMethod, type IHTTPClient } from "@infra/http/types";

import type { ICreateGameRoomService } from "./create-game-service.types";

import type { GameRoom } from "@domain/models/game-room.model";

export class CreateGameRoomService implements ICreateGameRoomService {
  constructor(private httpClient: IHTTPClient) {}

  async execute(): Promise<GameRoom> {
    const response = await this.httpClient.sendRequest<GameRoom>({
      endpoint: "/game",
      method: HTTPMethod.POST,
    });

    return response.data;
  }
}
