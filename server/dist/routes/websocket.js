"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeMessage = routeMessage;
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const join_game_use_case_1 = require("@use-cases/join-game-use-case");
const move_piece_use_case_1 = require("@use-cases/move-piece-use-case");
const capture_piece_use_case_1 = require("@use-cases/capture-piece-use-case");
const socket_client_1 = require("@lib/socket-client");
function isValidMessage(message) {
    return "type" in message && "payload" in message;
}
function routeMessage(socket, rawMessage) {
    const socketClient = new socket_client_1.SocketClient(socket);
    const message = JSON.parse(rawMessage);
    if (!isValidMessage(message)) {
        return socketClient.send({
            type: websocket_chess_package_1.MESSAGES_TYPES.ERROR,
            payload: websocket_chess_package_1.ERROR_MESSAGES.INVALID_PAYLOAD_DATA,
        });
    }
    switch (message.type) {
        case websocket_chess_package_1.MESSAGES_TYPES.JOIN_GAME: {
            websocket_chess_package_1.logger.log("WS Joining game");
            const joinGameUseCase = new join_game_use_case_1.JoinGameUseCase(socketClient);
            return joinGameUseCase.execute(message.payload);
        }
        case websocket_chess_package_1.MESSAGES_TYPES.MOVE:
            websocket_chess_package_1.logger.log("WS Moving piece");
            const movePieceUseCase = new move_piece_use_case_1.MovePieceUseCase(socketClient);
            return movePieceUseCase.execute(message.payload);
        case websocket_chess_package_1.MESSAGES_TYPES.CAPTURE:
            websocket_chess_package_1.logger.log("WS Capturing piece");
            const capturePieceUseCase = new capture_piece_use_case_1.CapturePieceUseCase(socketClient);
            return capturePieceUseCase.execute(message.payload);
        default:
            websocket_chess_package_1.logger.log("WS Unknown message");
            return socketClient.send({
                type: websocket_chess_package_1.MESSAGES_TYPES.ERROR,
                payload: websocket_chess_package_1.ERROR_MESSAGES.UNKNOWN_MESSAGE,
            });
    }
}
