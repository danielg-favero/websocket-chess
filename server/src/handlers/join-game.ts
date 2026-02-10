import { Socket } from "socket.io";

import { gameOrchestrator } from "@orchestrators/game-orchestrator";
import { ERROR_MESSAGES, MESSAGES_TYPES } from "@config/messages";

export interface JoinGamePayload {
  gameId: string;
}

export class JoinGameHandler {
  constructor(
    private socket: Socket,
    private orchestrator = gameOrchestrator
  ) {}

  public handle(payload: JoinGamePayload) {
    const { gameId } = payload;

    const playerId = this.socket.id;
    const game = this.orchestrator.join(gameId, playerId);

    if (!game) {
      return this.socket.send(
        JSON.stringify({
          type: MESSAGES_TYPES.ERROR,
          payload: {
            message: ERROR_MESSAGES.COULD_NOT_JOIN_GAME,
          },
        })
      );
    }

    return this.socket.send(
      JSON.stringify({
        type: MESSAGES_TYPES.GAME_STATE,
        payload: game.getState(),
      })
    );
  }
}
