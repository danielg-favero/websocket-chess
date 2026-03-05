"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGameHandler = void 0;
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const game_room_orchestrator_1 = require("@orchestrators/game-room-orchestrator");
class CreateGameHandler {
    constructor(orchestrator = game_room_orchestrator_1.gameRoomOrchestrator) {
        this.orchestrator = orchestrator;
    }
    handle() {
        const gameRoom = this.orchestrator.create();
        websocket_chess_package_1.logger.log(`CreateGameHandler: Game room created`);
        return gameRoom.getState();
    }
}
exports.CreateGameHandler = CreateGameHandler;
