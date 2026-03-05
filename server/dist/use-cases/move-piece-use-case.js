"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovePieceUseCase = void 0;
const game_room_orchestrator_1 = require("@orchestrators/game-room-orchestrator");
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const position_1 = require("@game/position");
class MovePieceUseCase {
    constructor(socket, orchestrator = game_room_orchestrator_1.gameRoomOrchestrator) {
        this.socket = socket;
        this.orchestrator = orchestrator;
    }
    execute({ from, gameId, to }) {
        const playerId = this.socket.clientId;
        const gameRoom = this.orchestrator.get(gameId);
        if (!gameRoom) {
            websocket_chess_package_1.logger.error(`MovePieceUseCase: GameRoom not found`);
            return this.socket.sendToClient(playerId, {
                type: websocket_chess_package_1.MESSAGES_TYPES.ERROR,
                payload: {
                    message: websocket_chess_package_1.ERROR_MESSAGES.GAME_NOT_FOUND,
                },
            });
        }
        try {
            this.orchestrator.move(gameId, playerId, new position_1.Position(from.x, from.y), new position_1.Position(to.x, to.y));
            return this.socket.emitToRoom(gameId, {
                type: websocket_chess_package_1.MESSAGES_TYPES.GAME_STATE,
                payload: gameRoom.getState(),
            });
        }
        catch (error) {
            websocket_chess_package_1.logger.error(`MovePieceUseCase: Could not move piece from ${from.x},${from.y} to ${to.x},${to.y} in game room ${gameId}: ${error.message}`);
            return this.socket.sendToClient(playerId, {
                type: websocket_chess_package_1.MESSAGES_TYPES.ERROR,
                payload: {
                    message: error.message,
                },
            });
        }
    }
}
exports.MovePieceUseCase = MovePieceUseCase;
