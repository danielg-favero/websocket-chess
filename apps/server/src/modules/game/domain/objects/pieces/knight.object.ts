import { calculateDistance } from "@modules/game/domain/helpers/calculate-distance";

import { Piece } from "../piece.object";
import { Position } from "../position.object";
import { Color } from "../color.object";
import { Board } from "../board.object";

export class Knight extends Piece {
  constructor(color: Color) {
    super(color, "KNIGHT");
  }

  public canMove(from: Position, to: Position, board: Board): boolean {
    if (!this.validateBaseMovement(from, to, board)) return false;

    const { dx, dy } = calculateDistance(from, to);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}
