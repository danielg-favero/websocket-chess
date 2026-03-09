import { IBoard } from "@interfaces/board";
import { IColor } from "@interfaces/color";
import { IPosition } from "@interfaces/position";

import { Piece } from "./piece";

export class Queen extends Piece {
  constructor(color: IColor) {
    super(color, "QUEEN");
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    return false;
  }
}
