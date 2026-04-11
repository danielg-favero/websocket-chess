import { CLIENT_EVENTS, createMessage } from "@websocket-chess/shared";

import type { ISocketClient } from "@infra/socket/types";

import type {
  IStartGameService,
  StartGamePayload,
} from "./start-game-service.types";

export class StartGameService implements IStartGameService {
  constructor(private socketClient: ISocketClient) {}

  async execute(payload: StartGamePayload): Promise<void> {
    this.socketClient.send(createMessage(CLIENT_EVENTS.START_GAME, payload));
  }
}
