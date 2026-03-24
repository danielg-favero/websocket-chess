import {
  logger,
  ERROR_MESSAGES,
  MESSAGES_TYPES,
} from "@danielg.favero/websocket-chess-package";
import { ISocketClient } from "@interfaces/socket-client";
import { gameRoomOrchestrator } from "@orchestrators/game-room-orchestrator";

export interface IJoinGameUseCase {
  gameId: string;
}

export class JoinGameUseCase {
  constructor(
    private socket: ISocketClient,
    private orchestrator = gameRoomOrchestrator,
  ) {}

  public execute({ gameId }: IJoinGameUseCase) {
    const playerId = this.socket.clientId;
    const gameRoom = this.orchestrator.join(gameId, playerId);

    if (!gameRoom) {
      logger.error(
        `JoinGameUseCase: Could not join game room ${gameId} for player ${playerId}`,
      );

      return this.socket.sendToClient(playerId, {
        type: MESSAGES_TYPES.ERROR,
        payload: {
          message: ERROR_MESSAGES.COULD_NOT_JOIN_GAME,
        },
      });
    }

    this.socket.joinRoom(gameId);

    logger.log(
      `JoinGameUseCase: Player ${playerId} joined game room ${gameId}`,
    );

    const player = gameRoom.getPlayer(playerId);

    return this.socket.emitToRoom(gameId, {
      type: MESSAGES_TYPES.JOIN_GAME,
      payload: {
        player: {
          id: player!.id,
          color: player!.color.value,
        },
        gameState: gameRoom.getState(),
      },
    });
  }
}
