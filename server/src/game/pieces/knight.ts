import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";
import { IColor } from "@interfaces/color";

import { Piece } from "./piece";

export class Knight extends Piece {
  constructor(color: IColor) {
    super(color, "KNIGHT");
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    return false;
  }
}
