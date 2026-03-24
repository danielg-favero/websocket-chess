import {
  Coordinates,
  TPieceType,
} from "@danielg.favero/websocket-chess-package";
import { Position } from "@game/position";

import { calculateDistance } from "@helpers/calculate-distance";

import { IBoard } from "@interfaces/board";
import { IColor } from "@interfaces/color";
import { IPiece } from "@interfaces/piece";
import { IPosition } from "@interfaces/position";

export abstract class Piece implements IPiece {
  color: IColor;
  type: TPieceType;

  constructor(color: IColor, type: TPieceType) {
    this.color = color;
    this.type = type;
  }

  public abstract canMove(
    from: IPosition,
    to: IPosition,
    board: IBoard,
  ): boolean;

  validateBaseMovement(from: IPosition, to: IPosition, board: IBoard): boolean {
    const pathIsClear = this.isPathClear(from, to, board);
    const pathIsInsideBoard = to.isInsideBoard();

    return pathIsClear && pathIsInsideBoard;
  }

  isEnemy(other: IPiece | null): boolean {
    if (!other) return false;
    return !this.color.equals(other.color);
  }

  getMovementDirection(from: IPosition, to: IPosition): Coordinates {
    const dx = from.x - to.x;
    const dy = from.y - to.y;

    return {
      x: dx === 0 ? 0 : dx > 0 ? -1 : 1,
      y: dy === 0 ? 0 : dy > 0 ? -1 : 1,
    };
  }

  isPathClear(from: IPosition, to: IPosition, board: IBoard): boolean {
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
}
