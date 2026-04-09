import { Board } from "../board.object";
import { Color } from "../color.object";
import { Position } from "../position.object";

import { Queen } from "../pieces/queen.object";
import { King } from "../pieces/king.object";

export class CheckMateBoard extends Board {
  constructor() {
    super();
    // White Queen
    this.placePieceAt(new Queen(new Color("WHITE")), new Position(3, 7));

    // Black King
    this.placePieceAt(new King(new Color("BLACK")), new Position(3, 0));
  }
}
