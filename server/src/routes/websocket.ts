import { Socket } from "socket.io";

import {
  ERROR_MESSAGES,
  MessageDTO,
  MESSAGES_TYPES,
  logger,
} from "@danielg.favero/websocket-chess-package";
import { JoinGameHandler, JoinGamePayload } from "@handlers/join-game";
import { MovePieceHandler, MovePiecePayload } from "@handlers/move-piece";
import { SocketClient } from "@lib/socket-client";

function isValidMessage(message: any): message is MessageDTO {
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
      const joinGameHandler = new JoinGameHandler(socketClient);
      return joinGameHandler.handle(message.payload as JoinGamePayload);
    }
    case MESSAGES_TYPES.MOVE:
      logger.log("WS Moving piece");
      const movePieceHandler = new MovePieceHandler(socketClient);
      return movePieceHandler.handle(message.payload as MovePiecePayload);
    default:
      logger.log("WS Unknown message");
      return socketClient.send({
        type: MESSAGES_TYPES.ERROR,
        payload: ERROR_MESSAGES.UNKNOWN_MESSAGE,
      });
  }
}
