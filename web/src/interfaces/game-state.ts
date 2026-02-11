import type { TPieceType } from "./piece";
import type { TColor } from "./color";

export interface IGameState {
  board: Array<Array<{ type: TPieceType; color: TColor } | null>>;
  turn: TColor;
}
