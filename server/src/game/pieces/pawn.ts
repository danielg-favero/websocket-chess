import { IColor } from "@interfaces/color";
import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";

import { Piece } from "./piece";

export class Pawn extends Piece {
  private isFirstMove: boolean = true;

  constructor(color: IColor) {
    super(color, "PAWN");
  }

  public canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    if (!this.validateBaseMovement(from, to, board)) return false;

    const direction = this.getMovementDirection(from, to);

    console.log({ direction });

    if (direction.x !== 0) return false;

    if (this.color.isWhite() && direction.y !== -1) return false;
    if (this.color.isBlack() && direction.y !== 1) return false;

    if (from.y === to.y - direction.y) {
      this.isFirstMove = false;
      return true;
    }

    if (this.isFirstMove && from.y === to.y - direction.y * 2) {
      this.isFirstMove = false;
      return true;
    }

    return false;
  }
}
