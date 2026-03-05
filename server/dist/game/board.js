"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
class Board {
    constructor() {
        this.grid = Array.from({ length: websocket_chess_package_1.BOARD_SIZE }, () => Array(websocket_chess_package_1.BOARD_SIZE).fill(null));
    }
    place(piece, position) {
        this.grid[position.y][position.x] = piece;
    }
    getPieceAt(position) {
        return this.grid[position.y][position.x];
    }
    move(from, to) {
        const piece = this.getPieceAt(from);
        this.grid[to.y][to.x] = piece;
        this.grid[from.y][from.x] = null;
    }
    capture(from, to) {
        this.move(from, to);
    }
    initialize() {
        throw new Error("Method 'initialize' must be implemented.");
    }
}
exports.Board = Board;
