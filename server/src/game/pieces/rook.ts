import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";
import { IColor } from "@interfaces/color";

import { Piece } from "./piece";

export class Rook extends Piece {
  constructor(color: IColor) {
    super(color, "ROOK");
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    return false;
  }
}
