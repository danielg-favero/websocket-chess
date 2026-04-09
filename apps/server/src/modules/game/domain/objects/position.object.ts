import { BOARD_SIZE } from "@websocket-chess/shared";

export class Position {
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
