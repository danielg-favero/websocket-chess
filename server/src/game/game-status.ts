import { TGameStatus } from "@danielg.favero/websocket-chess-package";

export class GameStatus {
  private status: TGameStatus;

  constructor() {
    this.status = "NOT_STARTED";
  }

  setStatus(status: TGameStatus): void {
    this.status = status;
  }

  getStatus(): TGameStatus {
    return this.status;
  }
}
