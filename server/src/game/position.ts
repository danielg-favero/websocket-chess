import { BOARD_SIZE, IPosition } from "@danielg.favero/websocket-chess-package";

export class Position implements IPosition {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isInsideBoard() {
    return (
      this.x >= 0 && this.x < BOARD_SIZE && this.y >= 0 && this.y < BOARD_SIZE
    );
  }
}
