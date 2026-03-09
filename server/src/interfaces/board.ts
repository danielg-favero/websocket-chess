import { IPiece } from "./piece";
import { IPosition } from "./position";

export interface IBoard {
  grid: Array<Array<IPiece | null>>;

  place(piece: IPiece, position: IPosition): void;
  getPieceAt(position: IPosition): IPiece | null;
  move(from: IPosition, to: IPosition): void;
}
