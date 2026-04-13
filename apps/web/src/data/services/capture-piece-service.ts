import { CLIENT_EVENTS, createMessage } from "@websocket-chess/shared";

import type { ISocketClient } from "@infra/socket/types";

import type {
  ICapturePieceService,
  CapturePiecePayload,
} from "./capture-piece-service.types";

export class CapturePieceService implements ICapturePieceService {
  constructor(private socketClient: ISocketClient) {}

  async execute(payload: CapturePiecePayload): Promise<void> {
    this.socketClient.send(createMessage(CLIENT_EVENTS.CAPTURE, payload));
  }
}
