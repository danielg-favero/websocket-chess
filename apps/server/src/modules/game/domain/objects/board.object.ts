import { BOARD_SIZE } from "@websocket-chess/shared";

import { Piece } from "./piece.object";
import { Position } from "./position.object";

export class Board {
  grid: Array<Array<Piece | null>>;

  constructor() {
    this.grid = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(null),
    );
  }

  placePieceAt(piece: Piece, position: Position): void {
    this.grid[position.y][position.x] = piece;
  }

  getPieceAt(position: Position): Piece | null {
    return this.grid[position.y][position.x];
  }

  movePieceTo(from: Position, to: Position): void {
    const piece = this.getPieceAt(from);
    this.grid[to.y][to.x] = piece;
    this.grid[from.y][from.x] = null;
  }

  capturePieceAt(from: Position, to: Position): void {
    this.movePieceTo(from, to);
  }

  public toJSON() {
    return {
      grid: this.grid.map((row) => row.map((piece) => piece?.toJSON() || null)),
    };
  }
}
