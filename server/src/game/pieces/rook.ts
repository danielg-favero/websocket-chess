import {
  IPosition,
  IBoard,
  IColor,
} from "@danielg.favero/websocket-chess-package";

import { Piece } from "./piece";

export class Rook extends Piece {
  constructor(color: IColor) {
    super(color, "ROOK");
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    return false;
  }
}
