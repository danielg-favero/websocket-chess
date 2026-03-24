import { gameRoomOrchestrator } from "@orchestrators/game-room-orchestrator";
import {
  ERROR_MESSAGES,
  MESSAGES_TYPES,
  Coordinates,
  logger,
} from "@danielg.favero/websocket-chess-package";
import { Position } from "@game/position";
import { ISocketClient } from "@interfaces/socket-client";

export interface IMovePieceUseCase {
  gameId: string;
  from: Coordinates;
  to: Coordinates;
}

export class MovePieceUseCase {
  constructor(
    private socket: ISocketClient,
    private orchestrator = gameRoomOrchestrator,
  ) {}

  public execute({ from, gameId, to }: IMovePieceUseCase) {
    const playerId = this.socket.clientId;
    const gameRoom = this.orchestrator.get(gameId);

    if (!gameRoom) {
      logger.error(`MovePieceUseCase: GameRoom not found`);

      return this.socket.sendToClient(playerId, {
        type: MESSAGES_TYPES.ERROR,
        payload: {
          message: ERROR_MESSAGES.GAME_NOT_FOUND,
        },
      });
    }

    try {
      this.orchestrator.move(
        gameId,
        playerId,
        new Position(from.x, from.y),
        new Position(to.x, to.y),
      );

      return this.socket.emitToRoom(gameId, {
        type: MESSAGES_TYPES.GAME_STATE,
        payload: gameRoom.getState(),
      });
    } catch (error: any) {
      logger.error(
        `MovePieceUseCase: Could not move piece from ${from.x},${from.y} to ${to.x},${to.y} in game room ${gameId}: ${error.message}`,
      );

      return this.socket.sendToClient(playerId, {
        type: MESSAGES_TYPES.ERROR,
        payload: {
          message: error.message,
        },
      });
    }
  }
}
