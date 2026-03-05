"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = void 0;
const position_1 = require("@game/position");
class Piece {
    constructor(color, type) {
        this.color = color;
        this.type = type;
        this.status = "ACTIVE";
    }
    setStatus(status) {
        this.status = status;
    }
    canCapture(from, to, board) {
        return this.canMove(from, to, board) && this.isEnemy(board.getPieceAt(to));
    }
    validateBaseMovement(from, to, board) {
        const pathIsClear = this.isPathClear(from, to, board);
        const pathIsInsideBoard = to.isInsideBoard();
        return pathIsClear && pathIsInsideBoard;
    }
    isEnemy(other) {
        if (!other)
            return false;
        return !this.color.equals(other.color);
    }
    getMovementDirection(from, to) {
        const dx = from.x - to.x;
        const dy = from.y - to.y;
        return {
            x: dx === 0 ? 0 : dx > 0 ? -1 : 1,
            y: dy === 0 ? 0 : dy > 0 ? -1 : 1,
        };
    }
    isPathClear(from, to, board) {
        const direction = this.getMovementDirection(from, to);
        let x = from.x + direction.x;
        let y = from.y + direction.y;
        while (x !== to.x || y !== to.y) {
            const piece = board.getPieceAt(new position_1.Position(x, y));
            if (piece) {
                return false;
            }
            x += direction.x;
            y += direction.y;
        }
        return true;
    }
}
exports.Piece = Piece;
