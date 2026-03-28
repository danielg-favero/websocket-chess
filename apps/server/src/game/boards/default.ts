import { Board } from "@game/board";

import { Pawn } from "../pieces/pawn";
import { Position } from "../position";
import { Color } from "../color";
import { Rook } from "../pieces/rook";
import { Bishop } from "../pieces/bishop";
import { Knight } from "../pieces/knight";
import { King } from "../pieces/king";
import { Queen } from "../pieces/queen";

export class DefaultBoard extends Board {
  constructor() {
    super();
    // PAWNS
    this.place(new Pawn(new Color("BLACK")), new Position(0, 1));
    this.place(new Pawn(new Color("BLACK")), new Position(1, 1));
    this.place(new Pawn(new Color("BLACK")), new Position(2, 1));
    this.place(new Pawn(new Color("BLACK")), new Position(3, 1));
    this.place(new Pawn(new Color("BLACK")), new Position(4, 1));
    this.place(new Pawn(new Color("BLACK")), new Position(5, 1));
    this.place(new Pawn(new Color("BLACK")), new Position(6, 1));
    this.place(new Pawn(new Color("BLACK")), new Position(7, 1));

    this.place(new Pawn(new Color("WHITE")), new Position(0, 6));
    this.place(new Pawn(new Color("WHITE")), new Position(1, 6));
    this.place(new Pawn(new Color("WHITE")), new Position(2, 6));
    this.place(new Pawn(new Color("WHITE")), new Position(3, 6));
    this.place(new Pawn(new Color("WHITE")), new Position(4, 6));
    this.place(new Pawn(new Color("WHITE")), new Position(5, 6));
    this.place(new Pawn(new Color("WHITE")), new Position(6, 6));
    this.place(new Pawn(new Color("WHITE")), new Position(7, 6));

    // ROOKS
    this.place(new Rook(new Color("BLACK")), new Position(7, 0));
    this.place(new Rook(new Color("BLACK")), new Position(0, 0));

    this.place(new Rook(new Color("WHITE")), new Position(7, 7));
    this.place(new Rook(new Color("WHITE")), new Position(0, 7));

    // BISHOPS
    this.place(new Bishop(new Color("BLACK")), new Position(6, 0));
    this.place(new Bishop(new Color("BLACK")), new Position(1, 0));

    this.place(new Bishop(new Color("WHITE")), new Position(6, 7));
    this.place(new Bishop(new Color("WHITE")), new Position(1, 7));

    // KNIGHTS
    this.place(new Knight(new Color("BLACK")), new Position(5, 0));
    this.place(new Knight(new Color("BLACK")), new Position(2, 0));

    this.place(new Knight(new Color("WHITE")), new Position(5, 7));
    this.place(new Knight(new Color("WHITE")), new Position(2, 7));

    // KINGS
    this.place(new King(new Color("BLACK")), new Position(3, 0));
    this.place(new King(new Color("WHITE")), new Position(3, 7));

    // QUEEN
    this.place(new Queen(new Color("BLACK")), new Position(4, 0));
    this.place(new Queen(new Color("WHITE")), new Position(4, 7));
  }
}
