"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRoomOrchestrator = void 0;
const uuid_1 = require("uuid");
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const game_1 = require("@game/game");
const game_room_1 = require("@game/game-room");
const player_1 = require("@game/player");
class GameRoomOrchestrator {
    constructor() {
        this.gameRooms = new Map();
    }
    create() {
        const gameId = (0, uuid_1.v4)();
        const game = new game_1.Game();
        const gameRoom = new game_room_1.GameRoom(gameId, game);
        websocket_chess_package_1.logger.log(`ORCHESTRATOR: Game room created: ${gameId}`);
        return this.update(gameId, gameRoom);
    }
    join(roomId, playerId) {
        const room = this.get(roomId);
        if (!room)
            return null;
        if (room.isFull())
            return null;
        if (this.isJoined(roomId, playerId))
            return null;
        const newPlayer = new player_1.Player(playerId);
        room.addPlayer(newPlayer);
        websocket_chess_package_1.logger.log(`ORCHESTRATOR: Player ${playerId} joined game room ${roomId}`);
        return this.update(roomId, room);
    }
    isJoined(roomId, playerId) {
        const room = this.get(roomId);
        if (!room)
            return false;
        const player = room.getPlayer(playerId);
        if (player)
            return true;
        return false;
    }
    move(roomId, playerId, from, to) {
        const room = this.get(roomId);
        if (!room)
            return null;
        if (!this.isJoined(roomId, playerId))
            return null;
        const game = room.getGame();
        game.move(from, to);
        websocket_chess_package_1.logger.log(`ORCHESTRATOR: Piece moved from (${from.x},${from.y}) to (${to.x},${to.y}) in game room ${roomId}`);
        return this.update(roomId, room);
    }
    capture(roomId, playerId, from, to) {
        const room = this.get(roomId);
        if (!room)
            return null;
        if (!this.isJoined(roomId, playerId))
            return null;
        const game = room.getGame();
        game.capture(from, to);
        websocket_chess_package_1.logger.log(`ORCHESTRATOR: Piece captured from (${from.x},${from.y}) to (${to.x},${to.y}) in game room ${roomId}`);
        return this.update(roomId, room);
    }
    get(roomId) {
        return this.gameRooms.get(roomId);
    }
    update(roomId, gameRoom) {
        this.gameRooms.set(roomId, gameRoom);
        return gameRoom;
    }
}
exports.gameRoomOrchestrator = new GameRoomOrchestrator();
