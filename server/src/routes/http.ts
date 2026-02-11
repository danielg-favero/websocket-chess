import { CreateGameHandler } from "@handlers/create-game";
import { Router } from "express";
import logger from "@lib/logger";

const router = Router();

router.post("/game", (req, res) => {
  logger.log("HTTP POST /game");
  const createGameHandler = new CreateGameHandler();
  const game = createGameHandler.handle();

  res.status(201).json(game);
});

export default router;
