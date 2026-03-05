"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_chess_package_1 = require("@danielg.favero/websocket-chess-package");
const express_1 = require("express");
const create_game_use_case_1 = require("@use-cases/create-game-use-case");
const router = (0, express_1.Router)();
const createGameUseCase = new create_game_use_case_1.CreateGameUseCase();
router.post("/game", (_req, res) => {
    websocket_chess_package_1.logger.log("HTTP POST /game");
    const game = createGameUseCase.execute();
    res.status(201).json(game);
});
exports.default = router;
