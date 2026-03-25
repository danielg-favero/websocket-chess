import {
  ERROR_MESSAGES,
  IGameState,
} from "@danielg.favero/websocket-chess-package";

import { IGame } from "@interfaces/game";
import { IColor } from "@interfaces/color";
import { IBoard } from "@interfaces/board";
import { IPosition } from "@interfaces/position";

import { Color } from "./color";
import { Position } from "./position";
import { GameStatus } from "./game-status";

import { DefaultBoard } from "./boards/default";

import { IPiece } from "@interfaces/piece";
import { IGameStatus } from "@interfaces/game-status";

export class Game implements IGame {
  board: IBoard;
  turn: IColor;
  capturedPieces: { white: IPiece[]; black: IPiece[] };
  status: IGameStatus;

  constructor() {
    this.board = new DefaultBoard();
    this.turn = new Color("WHITE");
    this.capturedPieces = { white: [], black: [] };
    this.status = new GameStatus();
  }

  validateMovement(
    from: IPosition,
    to: IPosition,
  ): { currentPiece: IPiece; targetPiece: IPiece | null } {
    if (!(from instanceof Position) || !(to instanceof Position)) {
      throw new Error(ERROR_MESSAGES.INVALID_POSITION);
    }

    if (!from.isInsideBoard() || !to.isInsideBoard()) {
      throw new Error(ERROR_MESSAGES.POSITION_OUT_OF_BOARD);
    }

    const currentPiece = this.board.getPieceAt(from);

    if (!currentPiece) {
      throw new Error(ERROR_MESSAGES.NO_PIECE_AT_SOURCE);
    }

    if (this.turn.isWhite() && !currentPiece.color.isWhite()) {
      throw new Error(ERROR_MESSAGES.INVALID_TURN);
    }

    if (this.turn.isBlack() && !currentPiece.color.isBlack()) {
      throw new Error(ERROR_MESSAGES.INVALID_TURN);
    }

    const targetPiece = this.board.getPieceAt(to);
    if (targetPiece && !currentPiece.isEnemy(targetPiece)) {
      throw new Error(ERROR_MESSAGES.CANNOT_CAPTURE_OWN_PIECE);
    }

    return { currentPiece, targetPiece };
  }

  private endTurn(): void {
    this.status.updateStatus(this);
    this.switchTurn();
  }

  move(from: IPosition, to: IPosition): void {
    const { currentPiece } = this.validateMovement(from, to);

    if (!currentPiece.canMove(from, to, this.board)) {
      throw new Error(ERROR_MESSAGES.INVALID_MOVE);
    }

    this.board.move(from, to);
    this.endTurn();
  }

  capture(from: IPosition, to: IPosition): void {
    const { currentPiece, targetPiece } = this.validateMovement(from, to);

    if (!currentPiece.canCapture(from, to, this.board)) {
      throw new Error(ERROR_MESSAGES.INVALID_CAPTURE);
    }

    if (targetPiece) {
      targetPiece.setStatus("CAPTURED");
      const oppositePlayerColor = this.turn.isWhite() ? "black" : "white";
      this.capturedPieces[oppositePlayerColor].push(targetPiece);
    }

    this.board.capture(from, to);
    this.endTurn();
  }

  isCheckmate(): boolean {
    const whitePieceTypes = this.capturedPieces.white.map(
      (piece) => piece.type,
    );
    const blackPieceTypes = this.capturedPieces.black.map(
      (piece) => piece.type,
    );

    return whitePieceTypes.includes("KING") || blackPieceTypes.includes("KING");
  }

  private switchTurn(): void {
    this.turn = this.turn.isWhite() ? Color.BLACK : Color.WHITE;
  }
}
