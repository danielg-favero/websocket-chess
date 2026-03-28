import { calculateDistance } from "@helpers/calculate-distance";

import { IColor } from "@interfaces/color";
import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";

import { Piece } from "./piece";

export class King extends Piece {
  constructor(color: IColor) {
    super(color, "KING");
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    if (!this.validateBaseMovement(from, to, board)) return false;

    const { dx, dy } = calculateDistance(from, to);

    return dx <= 1 && dy <= 1;
  }
}
