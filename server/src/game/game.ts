import { ERROR_MESSAGES } from "@config/messages";

import { IGame } from "@interfaces/game";
import { IBoard } from "@interfaces/board";
import { IPosition } from "@interfaces/position";
import { IColor } from "@interfaces/color";
import { IGameState } from "@interfaces/game-state";

import { Board } from "./board";
import { Color } from "./color";
import { Position } from "./position";

import { Pawn } from "./pieces/pawn";
import { Rook } from "./pieces/rook";
import { Bishop } from "./pieces/bishop";
import { Knight } from "./pieces/knight";
import { King } from "./pieces/king";
import { Queen } from "./pieces/queen";
import { IPlayer } from "@interfaces/player";
import { Player } from "./player";
import { GameStatus } from "./game-status";

export class Game implements IGame {
  readonly id: string;

  board: IBoard;
  turn: IColor;
  players: { white: IPlayer | null; black: IPlayer | null };
  status: GameStatus;

  constructor(id: string) {
    this.id = id;

    this.board = new Board();
    this.status = new GameStatus();
    this.turn = Color.WHITE;
    this.players = { white: null, black: null };

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

  addPlayer(playerId: string): void {
    if (!this.players.white) {
      this.players.white = new Player(playerId, new Color("WHITE"));
      this.status.setStatus("WAITING");
    }

    if (!this.players.black) {
      this.players.black = new Player(playerId, new Color("BLACK"));
      this.status.setStatus("PLAYING");
    }
  }

  move(from: IPosition, to: IPosition): void {
    if (!(from instanceof Position) || !(to instanceof Position)) {
      console.error(ERROR_MESSAGES.INVALID_POSITION);
      return;
    }

    if (!from.isInsideBoard() || !to.isInsideBoard()) {
      console.error(ERROR_MESSAGES.POSITION_OUT_OF_BOARD);
      return;
    }

    const piece = this.board.getPieceAt(from);

    if (!piece) {
      console.error(ERROR_MESSAGES.NO_PIECE_AT_SOURCE);
      return;
    }

    if (this.turn.isWhite() && !piece.color.isWhite()) {
      console.error(ERROR_MESSAGES.INVALID_TURN);
      return;
    }

    if (this.turn.isBlack() && !piece.color.isBlack()) {
      console.error(ERROR_MESSAGES.INVALID_TURN);
      return;
    }

    const targetPiece = this.board.getPieceAt(to);
    console.log({ piece, targetPiece });
    if (targetPiece && !piece.isEnemy(targetPiece)) {
      console.error(ERROR_MESSAGES.CANNOT_CAPTURE_OWN_PIECE);
      return;
    }

    if (!piece.canMove(from, to, this.board)) {
      console.error(ERROR_MESSAGES.INVALID_MOVE);
      return;
    }

    this.board.move(from, to);
    this.turn = this.turn.isWhite() ? Color.BLACK : Color.WHITE;
  }

  isCheckmate(): boolean {
    return this.status.getStatus() === "CHECKMATE";
  }

  isFull(): boolean {
    return !!this.players.white && !!this.players.black;
  }

  getState(): IGameState {
    return {
      id: this.id,
      board: this.board.grid.map((row) =>
        row.map((cell) => {
          if (!cell) return null;
          return {
            type: cell.type,
            color: cell.color.value,
          };
        }),
      ),
      status: this.status.getStatus(),
      turn: this.turn.value,
      isFull: this.isFull(),
      isCheckmate: this.isCheckmate(),
    };
  }
}
