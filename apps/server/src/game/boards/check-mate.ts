import { Board } from "@game/board";
import { Color } from "@game/color";
import { Position } from "@game/position";

import { Queen } from "@game/pieces/queen";
import { King } from "@game/pieces/king";

export class CheckMateBoard extends Board {
  constructor() {
    super();
    // White Queen
    this.place(new Queen(new Color("WHITE")), new Position(3, 7));

    // Black King
    this.place(new King(new Color("BLACK")), new Position(3, 0));
  }
}
