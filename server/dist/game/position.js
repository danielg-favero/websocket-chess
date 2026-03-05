"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    isInsideBoard() {
        return (this.x >= 0 && this.x < websocket_chess_package_1.BOARD_SIZE && this.y >= 0 && this.y < websocket_chess_package_1.BOARD_SIZE);
    }
}
exports.Position = Position;
