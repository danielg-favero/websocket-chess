import { IPosition } from "@interfaces/position";
import { IBoard } from "@interfaces/board";
import { IColor } from "@interfaces/color";

import { Piece } from "./piece";

export class Pawn extends Piece {
  constructor(color: IColor) {
    super(color, "PAWN");
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    const direction = this.color.isWhite() ? 1 : -1;
    const target = board.getPieceAt(to);

    if (from.x !== to.x && !target) return false;
    if (from.y === to.y + direction) return true;

    return false;
  }
}
