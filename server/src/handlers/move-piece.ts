import { Socket } from "socket.io";

import { gameOrchestrator } from "@orchestrators/game-orchestrator";
import { ERROR_MESSAGES, MESSAGES_TYPES } from "@config/messages";
import { Position } from "@game/position";

export interface MovePiecePayload {
  gameId: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export class MovePieceHandler {
  constructor(
    private socket: Socket,
    private orchestrator = gameOrchestrator
  ) {}

  public handle(payload: MovePiecePayload) {
    const { gameId, from, to } = payload;

    const game = this.orchestrator.get(gameId);

    if (!game) {
      return this.socket.send(
        JSON.stringify({
          type: MESSAGES_TYPES.ERROR,
          payload: {
            message: ERROR_MESSAGES.GAME_NOT_FOUND,
          },
        })
      );
    }

    try {
      game.move(new Position(from.x, from.y), new Position(to.x, to.y));

      return this.socket.send(
        JSON.stringify({
          type: MESSAGES_TYPES.GAME_STATE,
          payload: game.getState(),
        })
      );
    } catch (error) {
      return this.socket.send(
        JSON.stringify({
          type: MESSAGES_TYPES.ERROR,
          payload: {
            message: error,
          },
        })
      );
    }
  }
}
