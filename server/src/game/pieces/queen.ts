import { calculateDistance } from "@helpers/calculate-distance";

import { IBoard } from "@interfaces/board";
import { IColor } from "@interfaces/color";
import { IPosition } from "@interfaces/position";

import { Piece } from "./piece";

export class Queen extends Piece {
  constructor(color: IColor) {
    super(color, "QUEEN");
  }

  public canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    if (!this.validateBaseMovement(from, to, board)) return false;

    const { dx, dy } = calculateDistance(from, to);

    return dx === dy || dx === 0 || dy === 0;
  }
}
