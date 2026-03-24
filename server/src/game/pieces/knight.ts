import { IColor } from "@interfaces/color";
import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";

import { Piece } from "./piece";
import { calculateDistance } from "@helpers/calculate-distance";

export class Knight extends Piece {
  constructor(color: IColor) {
    super(color, "KNIGHT");
  }

  public canMove(from: IPosition, to: IPosition): boolean {
    if (!to.isInsideBoard()) return false;

    const { dx, dy } = calculateDistance(from, to);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}
