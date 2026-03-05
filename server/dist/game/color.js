"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
class Color {
    constructor(value) {
        this.value = value;
    }
    isWhite() {
        return this.value === Color.WHITE.value;
    }
    isBlack() {
        return this.value === Color.BLACK.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.Color = Color;
Color.WHITE = new Color("WHITE");
Color.BLACK = new Color("BLACK");
