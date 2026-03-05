"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queen = void 0;
const calculate_distance_1 = require("@helpers/calculate-distance");
const piece_1 = require("./piece");
class Queen extends piece_1.Piece {
    constructor(color) {
        super(color, "QUEEN");
    }
    canMove(from, to, board) {
        if (!this.validateBaseMovement(from, to, board))
            return false;
        const { dx, dy } = (0, calculate_distance_1.calculateDistance)(from, to);
        return dx === dy || dx === 0 || dy === 0;
    }
}
exports.Queen = Queen;
