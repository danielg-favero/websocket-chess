import { IColor } from "./color";
import { TGameStatus } from "./game-statuts";
import { TPieceType } from "./piece";

export interface IGameState {
  readonly id: string;

  board: Array<Array<{ type: TPieceType; color: IColor["value"] } | null>>;
  turn: IColor["value"];
  isFull: boolean;
  isCheckmate: boolean;
  status: TGameStatus;
}
