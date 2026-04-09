import { Piece } from "../piece.object";
import { Position } from "../position.object";
import { Color } from "../color.object";
import { Board } from "../board.object";

export class Pawn extends Piece {
  private isFirstMove: boolean = true;

  constructor(color: Color) {
    super(color, "PAWN");
  }

  public override canCapture(
    from: Position,
    to: Position,
    board: Board,
  ): boolean {
    const direction = this.getMovementDirection(from, to);

    if (direction.x !== 1 && direction.x !== -1) return false;
    if (this.color.isWhite() && direction.y !== -1) return false;
    if (this.color.isBlack() && direction.y !== 1) return false;

    if (!this.isEnemy(board.getPieceAt(to))) return false;

    return true;
  }

  public canMove(from: Position, to: Position, board: Board): boolean {
    if (!this.validateBaseMovement(from, to, board)) return false;

    const direction = this.getMovementDirection(from, to);

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
