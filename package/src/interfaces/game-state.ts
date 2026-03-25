import { TColorValue } from "./color";
import { TGameStatus } from "./game-statuts";
import { TPieceType } from "./piece-type";

export interface IGameState {
  board: Array<Array<{ type: TPieceType; color: TColorValue } | null>>;
  turn: TColorValue;
  capturedPieces: { white: TPieceType[]; black: TPieceType[] };
  status: TGameStatus;
}
