import { CLIENT_EVENTS, createMessage } from "@websocket-chess/shared";

import type { ISocketClient } from "@infra/socket/types";

import type {
  IJoinGameRoomService,
  JoinGameRoomPayload,
} from "./join-game-room-service.types";

export class JoinGameRoomService implements IJoinGameRoomService {
  constructor(private socketClient: ISocketClient) {}

  async execute(payload: JoinGameRoomPayload): Promise<void> {
    this.socketClient.send(createMessage(CLIENT_EVENTS.JOIN_ROOM, payload));
  }
}
