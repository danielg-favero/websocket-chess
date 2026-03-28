import { IColor } from "@interfaces/color";
import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";

import { Piece } from "./piece";

import { calculateDistance } from "helpers/calculate-distance";

export class Bishop extends Piece {
  constructor(color: IColor) {
    super(color, "BISHOP");
  }

  public canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    if (!this.validateBaseMovement(from, to, board)) return false;

    const { dx, dy } = calculateDistance(from, to);

    return dx === dy && dx >= 1;
  }
}
