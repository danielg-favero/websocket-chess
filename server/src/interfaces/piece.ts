import {
  Coordinates,
  TPieceType,
} from "@danielg.favero/websocket-chess-package";

import { IBoard } from "./board";
import { IColor } from "./color";
import { IPosition } from "./position";

export interface IPiece {
  color: IColor;
  type: TPieceType;
  canMove(from: IPosition, to: IPosition, board: IBoard): boolean;
  validateBaseMovement(from: IPosition, to: IPosition, board: IBoard): boolean;
  isEnemy(other: IPiece): boolean;
  getMovementDirection(from: IPosition, to: IPosition): Coordinates;
  isPathClear(from: IPosition, to: IPosition, board: IBoard): boolean;
}
