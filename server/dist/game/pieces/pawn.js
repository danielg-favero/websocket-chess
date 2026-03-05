"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const piece_1 = require("./piece");
class Pawn extends piece_1.Piece {
    constructor(color) {
        super(color, "PAWN");
        this.isFirstMove = true;
    }
    canCapture(from, to, board) {
        const direction = this.getMovementDirection(from, to);
        if (direction.x !== 1 && direction.x !== -1)
            return false;
        if (this.color.isWhite() && direction.y !== -1)
            return false;
        if (this.color.isBlack() && direction.y !== 1)
            return false;
        if (!this.isEnemy(board.getPieceAt(to)))
            return false;
        return true;
    }
    canMove(from, to, board) {
        if (!this.validateBaseMovement(from, to, board))
            return false;
        const direction = this.getMovementDirection(from, to);
        if (direction.x !== 0)
            return false;
        if (this.color.isWhite() && direction.y !== -1)
            return false;
        if (this.color.isBlack() && direction.y !== 1)
            return false;
        if (from.y === to.y - direction.y) {
            this.isFirstMove = false;
            return true;
        }
        if (this.isFirstMove && from.y === to.y - direction.y * 2) {
            this.isFirstMove = false;
            return true;
        }
        return false;
    }
}
exports.Pawn = Pawn;
