import { logger } from "@websocket-chess/shared";
import { Router } from "express";

import {
  createGameUseCase,
  joinGameUseCase,
  startGameUseCase,
  findGameUseCase,
} from "container";

const router = Router();

router.get("/game/:gameRoomId", async (req, res) => {
  logger.log("HTTP GET /game/:gameRoomId");

  const { gameRoomId } = req.params;

  const gameRoom = await findGameUseCase.execute({
    gameRoomId: String(gameRoomId),
  });

  res.status(201).json(gameRoom);
});

router.post("/game", async (_req, res) => {
  logger.log("HTTP POST /game");
  const gameRoom = await createGameUseCase.execute();

  res.status(201).json(gameRoom);
});

router.patch("/game/:gameRoomId/join", async (req, res) => {
  logger.log("HTTP PATCH /game/:gameRoomId/join");

  const { gameRoomId } = req.params;
  const { nickname, id } = req.body;

  const gameRoom = await joinGameUseCase.execute({
    gameRoomId: String(gameRoomId),
    playerNickname: String(nickname),
    playerId: String(id),
  });

  res.status(201).json(gameRoom);
});

router.patch("/game/:gameRoomId/start", async (req, res) => {
  logger.log("HTTP PATCH /game/:gameRoomId/start");

  const { gameRoomId } = req.params;

  const gameRoom = await startGameUseCase.execute({
    gameRoomId: String(gameRoomId),
  });

  res.status(201).json(gameRoom);
});

export default router;
