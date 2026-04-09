import { calculateDistance } from "@modules/game/domain/helpers/calculate-distance";

import { Piece } from "../piece.object";
import { Position } from "../position.object";
import { Color } from "../color.object";
import { Board } from "../board.object";

export class Rook extends Piece {
  constructor(color: Color) {
    super(color, "ROOK");
  }

  public canMove(from: Position, to: Position, board: Board): boolean {
    if (!this.validateBaseMovement(from, to, board)) return false;

    const { dx, dy } = calculateDistance(from, to);

    return (dx === 0 && dy >= 1) || (dx >= 1 && dy === 0);
  }
}
