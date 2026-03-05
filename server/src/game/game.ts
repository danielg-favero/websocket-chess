import {
  ERROR_MESSAGES,
  IGame,
  IBoard,
  IPosition,
  IColor,
  IGameState,
} from "@danielg.favero/websocket-chess-package";

import { Board } from "./board";
import { Color } from "./color";
import { Position } from "./position";

import { Pawn } from "./pieces/pawn";
import { Rook } from "./pieces/rook";
import { Bishop } from "./pieces/bishop";
import { Knight } from "./pieces/knight";
import { King } from "./pieces/king";
import { Queen } from "./pieces/queen";

export class Game implements IGame {
  board: IBoard;
  turn: IColor;

  constructor() {
    this.board = new Board();
    this.turn = new Color("WHITE");
    this.initializeBoard();
  }

  initializeBoard(): void {
    // PAWNS
    this.board.place(new Pawn(new Color("BLACK")), new Position(0, 1));
    this.board.place(new Pawn(new Color("BLACK")), new Position(1, 1));
    this.board.place(new Pawn(new Color("BLACK")), new Position(2, 1));
    this.board.place(new Pawn(new Color("BLACK")), new Position(3, 1));
    this.board.place(new Pawn(new Color("BLACK")), new Position(4, 1));
    this.board.place(new Pawn(new Color("BLACK")), new Position(5, 1));
    this.board.place(new Pawn(new Color("BLACK")), new Position(6, 1));
    this.board.place(new Pawn(new Color("BLACK")), new Position(7, 1));

    this.board.place(new Pawn(new Color("WHITE")), new Position(0, 6));
    this.board.place(new Pawn(new Color("WHITE")), new Position(1, 6));
    this.board.place(new Pawn(new Color("WHITE")), new Position(2, 6));
    this.board.place(new Pawn(new Color("WHITE")), new Position(3, 6));
    this.board.place(new Pawn(new Color("WHITE")), new Position(4, 6));
    this.board.place(new Pawn(new Color("WHITE")), new Position(5, 6));
    this.board.place(new Pawn(new Color("WHITE")), new Position(6, 6));
    this.board.place(new Pawn(new Color("WHITE")), new Position(7, 6));

    // ROOKS
    this.board.place(new Rook(new Color("BLACK")), new Position(7, 0));
    this.board.place(new Rook(new Color("BLACK")), new Position(0, 0));

    this.board.place(new Rook(new Color("WHITE")), new Position(7, 7));
    this.board.place(new Rook(new Color("WHITE")), new Position(0, 7));

    // BISHOPS
    this.board.place(new Bishop(new Color("BLACK")), new Position(6, 0));
    this.board.place(new Bishop(new Color("BLACK")), new Position(1, 0));

    this.board.place(new Bishop(new Color("WHITE")), new Position(6, 7));
    this.board.place(new Bishop(new Color("WHITE")), new Position(1, 7));

    // KNIGHTS
    this.board.place(new Knight(new Color("BLACK")), new Position(5, 0));
    this.board.place(new Knight(new Color("BLACK")), new Position(2, 0));

    this.board.place(new Knight(new Color("WHITE")), new Position(5, 7));
    this.board.place(new Knight(new Color("WHITE")), new Position(2, 7));

    // KINGS
    this.board.place(new King(new Color("BLACK")), new Position(3, 0));
    this.board.place(new King(new Color("WHITE")), new Position(3, 7));

    // QUEEN
    this.board.place(new Queen(new Color("BLACK")), new Position(4, 0));
    this.board.place(new Queen(new Color("WHITE")), new Position(4, 7));
  }

  move(from: IPosition, to: IPosition): void {
    if (!(from instanceof Position) || !(to instanceof Position)) {
      throw new Error(ERROR_MESSAGES.INVALID_POSITION);
    }

    if (!from.isInsideBoard() || !to.isInsideBoard()) {
      throw new Error(ERROR_MESSAGES.POSITION_OUT_OF_BOARD);
    }

    const piece = this.board.getPieceAt(from);

    if (!piece) {
      throw new Error(ERROR_MESSAGES.NO_PIECE_AT_SOURCE);
    }

    if (this.turn.isWhite() && !piece.color.isWhite()) {
      throw new Error(ERROR_MESSAGES.INVALID_TURN);
    }

    if (this.turn.isBlack() && !piece.color.isBlack()) {
      throw new Error(ERROR_MESSAGES.INVALID_TURN);
    }

    const targetPiece = this.board.getPieceAt(to);
    if (targetPiece && !piece.isEnemy(targetPiece)) {
      throw new Error(ERROR_MESSAGES.CANNOT_CAPTURE_OWN_PIECE);
    }

    if (!piece.canMove(from, to, this.board)) {
      throw new Error(ERROR_MESSAGES.INVALID_MOVE);
    }

    this.board.move(from, to);
    this.turn = this.turn.isWhite() ? Color.BLACK : Color.WHITE;
  }

  getState(): IGameState {
    return {
      board: this.board.grid.map((row) =>
        row.map((cell) => {
          if (!cell) return null;
          return {
            type: cell.type,
            color: cell.color.value,
          };
        }),
      ),
      turn: this.turn.value,
    };
  }
}
