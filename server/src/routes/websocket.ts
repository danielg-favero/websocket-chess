import { Socket } from "socket.io";

import {
  ERROR_MESSAGES,
  GenericMessageTransaction,
  MESSAGES_TYPES,
  logger,
} from "@danielg.favero/websocket-chess-package";
import {
  JoinGameUseCase,
  IJoinGameUseCase,
} from "@use-cases/join-game-use-case";
import {
  MovePieceUseCase,
  IMovePieceUseCase,
} from "@use-cases/move-piece-use-case";
import { SocketClient } from "@lib/socket-client";

function isValidMessage(message: any): message is GenericMessageTransaction {
  return "type" in message && "payload" in message;
}

export function routeMessage(socket: Socket, rawMessage: string) {
  const socketClient = new SocketClient(socket);
  const message = JSON.parse(rawMessage);

  if (!isValidMessage(message)) {
    return socketClient.send({
      type: MESSAGES_TYPES.ERROR,
      payload: ERROR_MESSAGES.INVALID_PAYLOAD_DATA,
    });
  }

  switch (message.type) {
    case MESSAGES_TYPES.JOIN_GAME: {
      logger.log("WS Joining game");
      const joinGameUseCase = new JoinGameUseCase(socketClient);
      return joinGameUseCase.execute(message.payload as IJoinGameUseCase);
    }
    case MESSAGES_TYPES.MOVE:
      logger.log("WS Moving piece");
      const movePieceUseCase = new MovePieceUseCase(socketClient);
      return movePieceUseCase.execute(message.payload as IMovePieceUseCase);
    default:
      logger.log("WS Unknown message");
      return socketClient.send({
        type: MESSAGES_TYPES.ERROR,
        payload: ERROR_MESSAGES.UNKNOWN_MESSAGE,
      });
  }
}
