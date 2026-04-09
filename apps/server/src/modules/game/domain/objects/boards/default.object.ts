import { Board } from "../board.object";

import { Pawn } from "../pieces/pawn.object";
import { Position } from "../position.object";
import { Color } from "../color.object";
import { Rook } from "../pieces/rook.object";
import { Bishop } from "../pieces/bishop.object";
import { Knight } from "../pieces/knight.object";
import { King } from "../pieces/king.object";
import { Queen } from "../pieces/queen.object";

export class DefaultBoard extends Board {
  constructor() {
    super();
    // PAWNS
    this.placePieceAt(new Pawn(new Color("BLACK")), new Position(0, 1));
    this.placePieceAt(new Pawn(new Color("BLACK")), new Position(1, 1));
    this.placePieceAt(new Pawn(new Color("BLACK")), new Position(2, 1));
    this.placePieceAt(new Pawn(new Color("BLACK")), new Position(3, 1));
    this.placePieceAt(new Pawn(new Color("BLACK")), new Position(4, 1));
    this.placePieceAt(new Pawn(new Color("BLACK")), new Position(5, 1));
    this.placePieceAt(new Pawn(new Color("BLACK")), new Position(6, 1));
    this.placePieceAt(new Pawn(new Color("BLACK")), new Position(7, 1));

    this.placePieceAt(new Pawn(new Color("WHITE")), new Position(0, 6));
    this.placePieceAt(new Pawn(new Color("WHITE")), new Position(1, 6));
    this.placePieceAt(new Pawn(new Color("WHITE")), new Position(2, 6));
    this.placePieceAt(new Pawn(new Color("WHITE")), new Position(3, 6));
    this.placePieceAt(new Pawn(new Color("WHITE")), new Position(4, 6));
    this.placePieceAt(new Pawn(new Color("WHITE")), new Position(5, 6));
    this.placePieceAt(new Pawn(new Color("WHITE")), new Position(6, 6));
    this.placePieceAt(new Pawn(new Color("WHITE")), new Position(7, 6));

    // ROOKS
    this.placePieceAt(new Rook(new Color("BLACK")), new Position(7, 0));
    this.placePieceAt(new Rook(new Color("BLACK")), new Position(0, 0));

    this.placePieceAt(new Rook(new Color("WHITE")), new Position(7, 7));
    this.placePieceAt(new Rook(new Color("WHITE")), new Position(0, 7));

    // BISHOPS
    this.placePieceAt(new Bishop(new Color("BLACK")), new Position(6, 0));
    this.placePieceAt(new Bishop(new Color("BLACK")), new Position(1, 0));

    this.placePieceAt(new Bishop(new Color("WHITE")), new Position(6, 7));
    this.placePieceAt(new Bishop(new Color("WHITE")), new Position(1, 7));

    // KNIGHTS
    this.placePieceAt(new Knight(new Color("BLACK")), new Position(5, 0));
    this.placePieceAt(new Knight(new Color("BLACK")), new Position(2, 0));

    this.placePieceAt(new Knight(new Color("WHITE")), new Position(5, 7));
    this.placePieceAt(new Knight(new Color("WHITE")), new Position(2, 7));

    // KINGS
    this.placePieceAt(new King(new Color("BLACK")), new Position(3, 0));
    this.placePieceAt(new King(new Color("WHITE")), new Position(3, 7));

    // QUEEN
    this.placePieceAt(new Queen(new Color("BLACK")), new Position(4, 0));
    this.placePieceAt(new Queen(new Color("WHITE")), new Position(4, 7));
  }
}
