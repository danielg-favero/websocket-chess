import {
  logger,
  ERROR_MESSAGES,
  MESSAGES_TYPES,
  ISocketClient,
} from "@danielg.favero/websocket-chess-package";
import { gameRoomOrchestrator } from "@orchestrators/game-room-orchestrator";

export interface JoinGamePayload {
  gameId: string;
}

export class JoinGameHandler {
  constructor(
    private socket: ISocketClient,
    private orchestrator = gameRoomOrchestrator,
  ) {}

  public handle(payload: JoinGamePayload) {
    const { gameId } = payload;
    const playerId = this.socket.clientId;
    const gameRoom = this.orchestrator.join(gameId, playerId);

    if (!gameRoom) {
      logger.error(
        `JoinGameHandler: Could not join game room ${gameId} for player ${playerId}`,
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
      `JoinGameHandler: Player ${playerId} joined game room ${gameId}`,
    );

    return this.socket.emitToRoom(gameId, {
      type: MESSAGES_TYPES.GAME_STATE,
      payload: gameRoom.getState(),
    });
  }
}
