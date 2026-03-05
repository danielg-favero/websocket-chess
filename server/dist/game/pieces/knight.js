"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const piece_1 = require("./piece");
const calculate_distance_1 = require("@helpers/calculate-distance");
class Knight extends piece_1.Piece {
    constructor(color) {
        super(color, "KNIGHT");
    }
    canMove(from, to) {
        if (!to.isInsideBoard())
            return false;
        const { dx, dy } = (0, calculate_distance_1.calculateDistance)(from, to);
        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }
}
exports.Knight = Knight;
