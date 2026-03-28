import {
  IGameState as IGameStatePackage,
  TGameStatus,
} from "@websocket-chess/shared";

import { IGame } from "@interfaces/game";

export class GameState {
  constructor(private game: IGame) {}

  getState(): IGameStatePackage {
    const status = this.game.status.getStatus();

    const board = this.game.board.grid.map((row) =>
      row.map((cell) => {
        if (!cell) return null;

        if (status === "NOT_STARTED" && cell.color.value === "BLACK") {
          return null;
        }

        return {
          type: cell.type,
          color: cell.color.value,
        };
      }),
    );

    return {
      board,
      status: this.game.status.getStatus(),
      capturedPieces: {
        white: this.game.capturedPieces.white.map((piece) => piece.type),
        black: this.game.capturedPieces.black.map((piece) => piece.type),
      },
      turn: this.game.turn.value,
    };
  }
}
