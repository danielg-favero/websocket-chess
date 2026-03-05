"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(id) {
        this.id = id;
    }
    isWhite() {
        return this.color.isWhite();
    }
    isBlack() {
        return this.color.isBlack();
    }
    setColor(color) {
        this.color = color;
    }
    getState() {
        return {
            id: this.id,
            color: this.color.value,
        };
    }
}
exports.Player = Player;
