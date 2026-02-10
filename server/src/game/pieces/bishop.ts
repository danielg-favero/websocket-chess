import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";
import { IColor } from "@interfaces/color";

import { Piece } from "./piece";

export class Bishop extends Piece {
  constructor(color: IColor) {
    super(color, "BISHOP");
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    return false;
  }
}
