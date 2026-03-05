"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = calculateDistance;
function calculateDistance(from, to) {
    const dx = Math.abs(from.x - to.x);
    const dy = Math.abs(from.y - to.y);
    return { dx, dy };
}
