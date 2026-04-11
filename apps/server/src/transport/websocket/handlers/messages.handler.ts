import {
  ERROR_MESSAGES,
  CLIENT_EVENTS,
  GenericEventTransaction,
  logger,
} from "@websocket-chess/shared";

import {
  capturePieceUseCase,
  joinSocketRoomUseCase,
  movePieceUseCase,
  startGameUseCase,
} from "../../../container";
import { SocketClient } from "../client";
import { handleSocketError } from "./error.handler";
import { InvalidSocketMessageError } from "@shared/errors/invalid-socket-message";

function isValidMessage(message: any): message is GenericEventTransaction<any> {
  return "type" in message && "payload" in message;
}

export async function handleSocketMessage(
  socket: SocketClient,
  rawMessage: string,
) {
  const message = JSON.parse(rawMessage);

  try {
    if (!isValidMessage(message)) {
      throw new InvalidSocketMessageError(ERROR_MESSAGES.INVALID_PAYLOAD_DATA);
    }

    if (message.type === CLIENT_EVENTS.JOIN_ROOM) {
      logger.log("WS JOIN ROOM");
      return await joinSocketRoomUseCase.execute({
        ...(message.payload as any),
        socketClient: socket,
      });
    }

    if (message.type === CLIENT_EVENTS.START_GAME) {
      logger.log("WS START GAME");
      return await startGameUseCase.execute({
        ...(message.payload as any),
        socketClient: socket,
      });
    }

    if (message.type === CLIENT_EVENTS.MOVE) {
      logger.log("WS MOVE PIECE");
      return await movePieceUseCase.execute({
        ...(message.payload as any),
        socketClient: socket,
      });
    }

    if (message.type === CLIENT_EVENTS.CAPTURE) {
      logger.log("WS CAPTURE PIECE");
      return await capturePieceUseCase.execute({
        ...(message.payload as any),
        socketClient: socket,
      });
    }
  } catch (error) {
    handleSocketError(socket, error);
  }
}
