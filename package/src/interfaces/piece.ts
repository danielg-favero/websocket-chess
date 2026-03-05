import { IBoard } from "./board";
import { IColor } from "./color";
import { IPosition } from "./position";

export interface IPiece {
  color: IColor;
  type: TPieceType;
  canMove(from: IPosition, to: IPosition, board: IBoard): boolean;
  isEnemy(other: IPiece): boolean;
}

export type TPieceType =
  | "KING"
  | "QUEEN"
  | "ROOK"
  | "BISHOP"
  | "KNIGHT"
  | "PAWN";
