import { logger } from "@danielg.favero/websocket-chess-package";
import { Router } from "express";

import { CreateGameUseCase } from "@use-cases/create-game-use-case";

const router = Router();
const createGameUseCase = new CreateGameUseCase();

router.post("/game", (_req, res) => {
  logger.log("HTTP POST /game");
  const game = createGameUseCase.execute();

  res.status(201).json(game);
});

export default router;
