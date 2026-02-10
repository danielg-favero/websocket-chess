import type { TColor } from "./color";
import type { TPieceType } from "./piece";

export interface IGameState {
  readonly id: string;

  board: Array<Array<{ type: TPieceType; color: TColor } | null>>;
  turn: TColor;
  isFull: boolean;
  isCheckmate: boolean;
}
