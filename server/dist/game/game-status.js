"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStatus = void 0;
class GameStatus {
    constructor() {
        this.status = "NOT_STARTED";
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
}
exports.GameStatus = GameStatus;
