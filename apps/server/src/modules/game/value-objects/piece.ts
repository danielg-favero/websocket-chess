import { TColorValue, TPieceType, TPieceStatus } from "@websocket-chess/shared";

export interface IPiece {
  readonly color: TColorValue;
  readonly type: TPieceType;
  readonly status: TPieceStatus;
}
