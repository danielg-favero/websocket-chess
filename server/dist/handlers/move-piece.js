"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovePieceHandler = void 0;
const game_room_orchestrator_1 = require("@orchestrators/game-room-orchestrator");
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const position_1 = require("@game/position");
class MovePieceHandler {
    constructor(socket, orchestrator = game_room_orchestrator_1.gameRoomOrchestrator) {
        this.socket = socket;
        this.orchestrator = orchestrator;
    }
    handle(payload) {
        const { gameId, from, to } = payload;
        const playerId = this.socket.clientId;
        const gameRoom = this.orchestrator.isJoined(gameId, playerId);
        if (!gameRoom) {
            websocket_chess_package_1.logger.error(`MovePieceHandler: Could not check if player ${playerId} is joined in game room ${gameId}`);
            return this.socket.send({
                type: websocket_chess_package_1.MESSAGES_TYPES.ERROR,
                payload: {
                    message: websocket_chess_package_1.ERROR_MESSAGES.GAME_NOT_FOUND,
                },
            });
        }
        websocket_chess_package_1.logger.log(`MovePieceHandler: Player ${playerId} is joined in game room ${gameId}`);
        try {
            this.orchestrator.move(gameId, new position_1.Position(from.x, from.y), new position_1.Position(to.x, to.y));
        }
        catch (error) {
            websocket_chess_package_1.logger.error(`MovePieceHandler: Could not move piece from ${from.x},${from.y} to ${to.x},${to.y} in game room ${gameId}`);
            this.socket.send({
                type: websocket_chess_package_1.MESSAGES_TYPES.ERROR,
                payload: {
                    message: error.message,
                },
            });
        }
        return this.socket.emitToRoom(gameId, {
            type: websocket_chess_package_1.MESSAGES_TYPES.GAME_STATE,
            payload: gameRoom.getState(),
        });
    }
}
exports.MovePieceHandler = MovePieceHandler;
