import { TColorValue } from "./color";
import { TPieceType } from "./piece-type";

export interface IGameState {
  board: Array<Array<{ type: TPieceType; color: TColorValue } | null>>;
  turn: TColorValue;
}
