import { IColor } from "./color";
import { TPieceType } from "./piece";

export interface IGameState {
  board: Array<Array<{ type: TPieceType; color: IColor["value"] } | null>>;
  turn: IColor["value"];
}
