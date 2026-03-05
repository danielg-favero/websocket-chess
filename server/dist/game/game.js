"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const color_1 = require("./color");
const position_1 = require("./position");
const check_mate_1 = require("./boards/check-mate");
class Game {
    constructor() {
        this.board = new check_mate_1.CheckMateBoard();
        this.turn = new color_1.Color("WHITE");
        this.capturedPieces = { white: [], black: [] };
    }
    validateMovement(from, to) {
        if (!(from instanceof position_1.Position) || !(to instanceof position_1.Position)) {
            throw new Error(websocket_chess_package_1.ERROR_MESSAGES.INVALID_POSITION);
        }
        if (!from.isInsideBoard() || !to.isInsideBoard()) {
            throw new Error(websocket_chess_package_1.ERROR_MESSAGES.POSITION_OUT_OF_BOARD);
        }
        const currentPiece = this.board.getPieceAt(from);
        if (!currentPiece) {
            throw new Error(websocket_chess_package_1.ERROR_MESSAGES.NO_PIECE_AT_SOURCE);
        }
        if (this.turn.isWhite() && !currentPiece.color.isWhite()) {
            throw new Error(websocket_chess_package_1.ERROR_MESSAGES.INVALID_TURN);
        }
        if (this.turn.isBlack() && !currentPiece.color.isBlack()) {
            throw new Error(websocket_chess_package_1.ERROR_MESSAGES.INVALID_TURN);
        }
        const targetPiece = this.board.getPieceAt(to);
        if (targetPiece && !currentPiece.isEnemy(targetPiece)) {
            throw new Error(websocket_chess_package_1.ERROR_MESSAGES.CANNOT_CAPTURE_OWN_PIECE);
        }
        return { currentPiece, targetPiece };
    }
    move(from, to) {
        const { currentPiece } = this.validateMovement(from, to);
        if (!currentPiece.canMove(from, to, this.board)) {
            throw new Error(websocket_chess_package_1.ERROR_MESSAGES.INVALID_MOVE);
        }
        this.board.move(from, to);
        this.switchTurn();
    }
    capture(from, to) {
        const { currentPiece, targetPiece } = this.validateMovement(from, to);
        if (!currentPiece.canCapture(from, to, this.board)) {
            throw new Error(websocket_chess_package_1.ERROR_MESSAGES.INVALID_CAPTURE);
        }
        if (targetPiece) {
            targetPiece.setStatus("CAPTURED");
            const oppositePlayerColor = this.turn.isWhite() ? "black" : "white";
            this.capturedPieces[oppositePlayerColor].push(targetPiece);
        }
        this.board.capture(from, to);
        this.switchTurn();
    }
    switchTurn() {
        this.turn = this.turn.isWhite() ? color_1.Color.BLACK : color_1.Color.WHITE;
    }
    getState() {
        return {
            board: this.board.grid.map((row) => row.map((cell) => {
                if (!cell)
                    return null;
                return {
                    type: cell.type,
                    color: cell.color.value,
                };
            })),
            capturedPieces: {
                white: this.capturedPieces.white.map((piece) => piece.type),
                black: this.capturedPieces.black.map((piece) => piece.type),
            },
            turn: this.turn.value,
        };
    }
}
exports.Game = Game;
