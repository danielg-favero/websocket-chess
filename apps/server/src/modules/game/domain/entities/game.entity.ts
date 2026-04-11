import { TColorValue, TGameStatus } from "@websocket-chess/shared";

import { InvalidPositionError } from "../errors/invalid-position";
import { OutOfBoundsError } from "../errors/out-of-bounds";
import { NoPieceFoundError } from "../errors/no-piece-found";
import { InvalidTurnError } from "../errors/invalid-turn";
import { CannotCaptureOwnPieceError } from "../errors/cannot-capture-own-piece";
import { InvalidMoveError } from "../errors/invalid-move";
import { InvalidCaptureError } from "../errors/invalid-capture";

import { Board } from "../objects/board.object";
import { Color } from "../objects/color.object";
import { Piece } from "../objects/piece.object";
import { Position } from "../objects/position.object";
import { DefaultBoard } from "../objects/boards/default.object";

export class Game {
  readonly id: string;

  board: Board;
  turn: Color;
  capturedPieces: Record<TColorValue, Piece[]>;
  status: TGameStatus;

  constructor(id: string) {
    this.id = id;
    this.board = new DefaultBoard();
    this.turn = new Color("WHITE");
    this.capturedPieces = { WHITE: [], BLACK: [] };
    this.status = "NOT_STARTED";
  }

  validateMovement(
    from: Position,
    to: Position,
  ): { currentPiece: Piece; targetPiece: Piece | null } {
    if (!(from instanceof Position) || !(to instanceof Position)) {
      throw new InvalidPositionError();
    }

    if (!from.isInsideBoard() || !to.isInsideBoard()) {
      throw new OutOfBoundsError();
    }

    const currentPiece = this.board.getPieceAt(from);

    if (!currentPiece) {
      throw new NoPieceFoundError();
    }

    if (this.turn.isWhite() && !currentPiece.color.isWhite()) {
      throw new InvalidTurnError();
    }

    if (this.turn.isBlack() && !currentPiece.color.isBlack()) {
      throw new InvalidTurnError();
    }

    const targetPiece = this.board.getPieceAt(to);
    if (targetPiece && !currentPiece.isEnemy(targetPiece)) {
      throw new CannotCaptureOwnPieceError();
    }

    return { currentPiece, targetPiece };
  }

  public move(from: Position, to: Position): void {
    const { currentPiece } = this.validateMovement(from, to);

    if (!currentPiece.canMove(from, to, this.board)) {
      throw new InvalidMoveError();
    }

    this.board.movePieceTo(from, to);
    this.switchTurn();
  }

  public capture(from: Position, to: Position): void {
    const { currentPiece, targetPiece } = this.validateMovement(from, to);

    if (!currentPiece.canCapture(from, to, this.board)) {
      throw new InvalidCaptureError();
    }

    if (targetPiece) {
      targetPiece.setStatus("CAPTURED");
      const oppositePlayerColor = this.turn.isWhite() ? "BLACK" : "WHITE";
      this.capturedPieces[oppositePlayerColor].push(targetPiece);
    }

    this.board.capturePieceAt(from, to);
    this.switchTurn();
  }

  public isCheckmate(): boolean {
    const whitePieceTypes = this.capturedPieces["WHITE"].map(
      (piece) => piece.type,
    );
    const blackPieceTypes = this.capturedPieces["BLACK"].map(
      (piece) => piece.type,
    );

    return whitePieceTypes.includes("KING") || blackPieceTypes.includes("KING");
  }

  private switchTurn(): void {
    this.turn = this.turn.isWhite() ? new Color("BLACK") : new Color("WHITE");
  }

  public toJSON() {
    return {
      id: this.id,
      board: this.board.toJSON(),
      turn: this.turn.toJSON(),
      capturedPieces: this.capturedPieces,
      status: this.status,
    };
  }
}
