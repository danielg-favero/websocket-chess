import { Coordinates, TPieceStatus, TPieceType } from "@websocket-chess/shared";

import { Color } from "./color.object";
import { Position } from "./position.object";
import { Board } from "./board.object";

export abstract class Piece {
  color: Color;
  type: TPieceType;
  status: TPieceStatus;

  constructor(color: Color, type: TPieceType, status?: TPieceStatus) {
    this.color = color;
    this.type = type;
    this.status = status || "ACTIVE";
  }

  public setStatus(status: TPieceStatus): void {
    this.status = status;
  }

  public abstract canMove(from: Position, to: Position, board: Board): boolean;

  public canCapture(from: Position, to: Position, board: Board): boolean {
    return this.canMove(from, to, board) && this.isEnemy(board.getPieceAt(to));
  }

  public validateBaseMovement(
    from: Position,
    to: Position,
    board: Board,
  ): boolean {
    const pathIsClear = this.isPathClear(from, to, board);
    const pathIsInsideBoard = to.isInsideBoard();

    return pathIsClear && pathIsInsideBoard;
  }

  public isEnemy(other: Piece | null): boolean {
    if (!other) return false;
    return !this.color.equals(other.color);
  }

  public getMovementDirection(from: Position, to: Position): Coordinates {
    const dx = from.x - to.x;
    const dy = from.y - to.y;

    return {
      x: dx === 0 ? 0 : dx > 0 ? -1 : 1,
      y: dy === 0 ? 0 : dy > 0 ? -1 : 1,
    };
  }

  private isPathClear(from: Position, to: Position, board: Board): boolean {
    const direction = this.getMovementDirection(from, to);

    let x = from.x + direction.x;
    let y = from.y + direction.y;

    while (x !== to.x || y !== to.y) {
      const piece = board.getPieceAt(new Position(x, y));

      if (piece) {
        return false;
      }

      x += direction.x;
      y += direction.y;
    }

    return true;
  }

  public toJSON() {
    return {
      color: this.color.toJSON(),
      type: this.type,
      status: this.status,
    };
  }
}
