"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
const color_1 = require("./color");
class GameRoom {
    constructor(id, game) {
        this.id = id;
        this.game = game;
        this.players = {
            white: null,
            black: null,
        };
        this.status = "NOT_STARTED";
    }
    isFull() {
        return !!this.players.white && !!this.players.black;
    }
    addPlayer(player) {
        if (!this.players.white) {
            player.setColor(new color_1.Color("WHITE"));
            this.players.white = player;
            return;
        }
        player.setColor(new color_1.Color("BLACK"));
        this.players.black = player;
        this.status = "PLAYING";
    }
    removePlayer(playerId) {
        if (this.players.white?.id === playerId) {
            this.players.white = null;
            this.status = "RESIGNED";
            return;
        }
        if (this.players.black?.id === playerId) {
            this.players.black = null;
            this.status = "RESIGNED";
            return;
        }
    }
    getPlayer(playerId) {
        if (this.players.white?.id === playerId)
            return this.players.white;
        if (this.players.black?.id === playerId)
            return this.players.black;
        return null;
    }
    getGame() {
        return this.game;
    }
    getState() {
        return {
            id: this.id,
            gameState: this.game.getState(),
            players: {
                white: this.players.white?.getState() || null,
                black: this.players.black?.getState() || null,
            },
            status: this.status,
        };
    }
}
exports.GameRoom = GameRoom;
