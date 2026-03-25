import { TGameStatus } from "@danielg.favero/websocket-chess-package";
import { IGame } from "@interfaces/game";

import { IGameStatus } from "@interfaces/game-status";

export class GameStatus implements IGameStatus {
  status: TGameStatus;

  constructor() {
    this.status = "NOT_STARTED";
  }

  getStatus(): TGameStatus {
    return this.status;
  }

  setState(status: TGameStatus): void {
    this.status = status;
  }

  updateStatus(game: IGame): void {
    if (game.isCheckmate()) {
      this.status = "CHECKMATE";
    }
  }
}
