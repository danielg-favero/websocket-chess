import { Socket } from "socket.io";

import { ERROR_MESSAGES, MessageDTO, MESSAGES_TYPES } from "@config/messages";
import { CreateGameHandler } from "@handlers/create-game";
import { JoinGameHandler, JoinGamePayload } from "@handlers/join-game";
import { MovePieceHandler, MovePiecePayload } from "@handlers/move-piece";

function isValidMessage(message: any): message is MessageDTO {
  return "type" in message && "payload" in message;
}

export function routeMessage(socket: Socket, rawMessage: string) {
  const message = JSON.parse(rawMessage);
  console.log(message);

  if (!isValidMessage(message)) {
    return socket.send(
      JSON.stringify({
        type: MESSAGES_TYPES.ERROR,
        payload: ERROR_MESSAGES.INVALID_PAYLOAD_DATA,
      }),
    );
  }

  switch (message.type) {
    case MESSAGES_TYPES.CREATE_GAME: {
      const createGameHandler = new CreateGameHandler();
      return createGameHandler.handle();
    }
    case MESSAGES_TYPES.JOIN_GAME: {
      const joinGameHandler = new JoinGameHandler(socket);
      return joinGameHandler.handle(message.payload as JoinGamePayload);
    }
    case MESSAGES_TYPES.MOVE:
      const movePieceHandler = new MovePieceHandler(socket);
      return movePieceHandler.handle(message.payload as MovePiecePayload);
    default:
      return socket.send(
        JSON.stringify({
          type: MESSAGES_TYPES.ERROR,
          payload: ERROR_MESSAGES.UNKNOWN_MESSAGE,
        }),
      );
  }
}
