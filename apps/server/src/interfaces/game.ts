import { IGameState } from "@websocket-chess/shared";

import { IBoard } from "./board";
import { IColor } from "./color";
import { IPosition } from "./position";
import { IPiece } from "./piece";
import { IGameStatus } from "./game-status";

export interface IGame {
  board: IBoard;
  turn: IColor;

  capturedPieces: {
    white: IPiece[];
    black: IPiece[];
  };
  status: IGameStatus;

  validateMovement(
    from: IPosition,
    to: IPosition,
  ): { currentPiece: IPiece; targetPiece: IPiece | null };
  move(from: IPosition, to: IPosition): void;
  capture(from: IPosition, to: IPosition): void;
  isCheckmate(): boolean;
}
