"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinGameUseCase = void 0;
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const game_room_orchestrator_1 = require("@orchestrators/game-room-orchestrator");
class JoinGameUseCase {
    constructor(socket, orchestrator = game_room_orchestrator_1.gameRoomOrchestrator) {
        this.socket = socket;
        this.orchestrator = orchestrator;
    }
    execute({ gameId }) {
        const playerId = this.socket.clientId;
        const gameRoom = this.orchestrator.join(gameId, playerId);
        if (!gameRoom) {
            websocket_chess_package_1.logger.error(`JoinGameUseCase: Could not join game room ${gameId} for player ${playerId}`);
            return this.socket.sendToClient(playerId, {
                type: websocket_chess_package_1.MESSAGES_TYPES.ERROR,
                payload: {
                    message: websocket_chess_package_1.ERROR_MESSAGES.COULD_NOT_JOIN_GAME,
                },
            });
        }
        this.socket.joinRoom(gameId);
        websocket_chess_package_1.logger.log(`JoinGameUseCase: Player ${playerId} joined game room ${gameId}`);
        return this.socket.emitToRoom(gameId, {
            type: websocket_chess_package_1.MESSAGES_TYPES.GAME_STATE,
            payload: gameRoom.getState(),
        });
    }
}
exports.JoinGameUseCase = JoinGameUseCase;
