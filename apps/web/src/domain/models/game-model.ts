import type {
  TColorValue,
  TGameStatus,
  TPieceStatus,
  TPieceType,
} from "@websocket-chess/shared";

export interface Piece {
  color: { value: TColorValue };
  type: TPieceType;
  status: TPieceStatus;
}

export interface Board {
  grid: Array<Array<Piece | null>>;
}

export interface Game {
  id: string;
  board: Board;
  turn: { value: TColorValue };
  capturedPieces: Record<TColorValue, Piece[]>;
  status: TGameStatus;
}
