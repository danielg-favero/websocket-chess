import {
  IPosition,
  IBoard,
  IColor,
} from "@danielg.favero/websocket-chess-package";

import { Piece } from "./piece";

export class Bishop extends Piece {
  constructor(color: IColor) {
    super(color, "BISHOP");
  }

  canMove(from: IPosition, to: IPosition, board: IBoard): boolean {
    return false;
  }
}
