import { IPiece } from "./piece";

export interface IBoard {
  grid: Array<Array<IPiece | null>>;
}
