import {
  BOARD_SIZE,
  IBoard,
  IPiece,
  IPosition,
} from "@danielg.favero/websocket-chess-package";

export class Board implements IBoard {
  grid: Array<Array<IPiece | null>>;

  constructor() {
    this.grid = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(null),
    );
  }

  place(piece: IPiece, position: IPosition): void {
    this.grid[position.y][position.x] = piece;
  }

  getPieceAt(position: IPosition): IPiece | null {
    return this.grid[position.y][position.x];
  }

  move(from: IPosition, to: IPosition): void {
    const piece = this.getPieceAt(from);
    this.grid[to.y][to.x] = piece;
    this.grid[from.y][from.x] = null;
  }
}
