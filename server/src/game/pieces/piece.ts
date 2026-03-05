import {
  IBoard,
  IColor,
  IPiece,
  TPieceType,
  IPosition,
} from "@danielg.favero/websocket-chess-package";

export abstract class Piece implements IPiece {
  color: IColor;
  type: TPieceType;

  constructor(color: IColor, type: TPieceType) {
    this.color = color;
    this.type = type;
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    throw new Error("Method not implemented.");
  }

  isEnemy(other: IPiece): boolean {
    if (!other) return false;
    return (
      (this.color.isWhite() && other.color.isBlack()) ||
      (this.color.isBlack() && other.color.isWhite())
    );
  }
}
