import { IColor } from "@interfaces/color";
import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";

import { calculateDistance } from "@helpers/calculate-distance";

import { Piece } from "./piece";

export class Rook extends Piece {
  constructor(color: IColor) {
    super(color, "ROOK");
  }

  public canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    if (!this.validateBaseMovement(from, to, board)) return false;

    const { dx, dy } = calculateDistance(from, to);

    return (dx === 0 && dy >= 1) || (dx >= 1 && dy === 0);
  }
}
