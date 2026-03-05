"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const piece_1 = require("./piece");
const calculate_distance_1 = require("helpers/calculate-distance");
class Bishop extends piece_1.Piece {
    constructor(color) {
        super(color, "BISHOP");
    }
    canMove(from, to, board) {
        if (!this.validateBaseMovement(from, to, board))
            return false;
        const { dx, dy } = (0, calculate_distance_1.calculateDistance)(from, to);
        return dx === dy && dx >= 1;
    }
}
exports.Bishop = Bishop;
