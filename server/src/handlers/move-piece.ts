import { gameRoomOrchestrator } from "@orchestrators/game-room-orchestrator";
import {
  ERROR_MESSAGES,
  MESSAGES_TYPES,
  Coordinates,
  logger,
} from "@danielg.favero/websocket-chess-package";
import { Position } from "@game/position";
import { ISocketClient } from "@interfaces/socket-client";

export interface MovePiecePayload {
  gameId: string;
  from: Coordinates;
  to: Coordinates;
}

export class MovePieceHandler {
  constructor(
    private socket: ISocketClient,
    private orchestrator = gameRoomOrchestrator,
  ) {}

  public handle(payload: MovePiecePayload) {
    const { gameId, from, to } = payload;
    const playerId = this.socket.clientId;

    const gameRoom = this.orchestrator.isJoined(gameId, playerId);

    if (!gameRoom) {
      logger.error(
        `MovePieceHandler: Could not check if player ${playerId} is joined in game room ${gameId}`,
      );

      return this.socket.send({
        type: MESSAGES_TYPES.ERROR,
        payload: {
          message: ERROR_MESSAGES.GAME_NOT_FOUND,
        },
      });
    }

    logger.log(
      `MovePieceHandler: Player ${playerId} is joined in game room ${gameId}`,
    );

    try {
      this.orchestrator.move(
        gameId,
        new Position(from.x, from.y),
        new Position(to.x, to.y),
      );
    } catch (error: any) {
      logger.error(
        `MovePieceHandler: Could not move piece from ${from.x},${from.y} to ${to.x},${to.y} in game room ${gameId}`,
      );

      this.socket.send({
        type: MESSAGES_TYPES.ERROR,
        payload: {
          message: error.message,
        },
      });
    }

    return this.socket.emitToRoom(gameId, {
      type: MESSAGES_TYPES.GAME_STATE,
      payload: gameRoom.getState(),
    });
  }
}
