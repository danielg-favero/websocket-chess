import { CLIENT_EVENTS, createMessage } from "@websocket-chess/shared";

import type { ISocketClient } from "@infra/socket/types";

import type {
  IMovePieceService,
  MovePiecePayload,
} from "./move-piece-service.types";

export class MovePieceService implements IMovePieceService {
  constructor(private socketClient: ISocketClient) {}

  async execute(payload: MovePiecePayload): Promise<void> {
    this.socketClient.send(createMessage(CLIENT_EVENTS.MOVE, payload));
  }
}
