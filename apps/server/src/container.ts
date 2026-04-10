import { CreateGameUseCase } from "@application/use-cases/create-game-use-case";
import { JoinGameUseCase } from "@application/use-cases/join-game-use-case";
import { StartGameUseCase } from "@application/use-cases/start-game-use-case";
import { FindGameUseCase } from "@application/use-cases/find-game-use-case";
import { JoinSocketRoomUseCase } from "@application/use-cases/join-socket-room-use-case";
import { MovePieceUseCase } from "@application/use-cases/move-piece-use-case";
import { CapturePieceUseCase } from "@application/use-cases/capture-piece-use-case";
import { FindPlayersByGameRoomIdUseCase } from "@application/use-cases/find-players-by-game-room-id-use-case";

import { InMemoryGameRoomRepository } from "@modules/game-room/repositories/in-memory-game-room-repository";
import { InMemoryGameRepository } from "@modules/game/repositories/in-memory-game-repository";
import { InMemoryPlayerRepository } from "@modules/player/repositories/in-memory-player-repository";
import { CreateGameRoomService } from "@modules/game-room/services/create-game-room-service";
import { CreateGameService } from "@modules/game/services/create-game-service";
import { FindGameRoomService } from "@modules/game-room/services/find-game-room-service";
import { UpdateGameRoomService } from "@modules/game-room/services/update-game-room-service";
import { CreatePlayerService } from "@modules/player/services/create-player-service";
import { FindGameService } from "@modules/game/services/find-game-service";
import { ValidatePlayerNotInRoomService } from "@modules/game-room/services/validate-player-not-in-room";
import { ValidatePlayerAlreadyInRoomService } from "@modules/game-room/services/validate-player-already-in-room";
import { FindPlayerService } from "@modules/player/services/find-player-service";
import { UpdateGameService } from "@modules/game/services/update-game-service";

export const gameRoomRepository = new InMemoryGameRoomRepository();
export const gameRepository = new InMemoryGameRepository();
export const playerRepository = new InMemoryPlayerRepository();

export const createGameRoomService = new CreateGameRoomService(
  gameRoomRepository,
);
export const createGameService = new CreateGameService(gameRepository);
export const findGameRoomService = new FindGameRoomService(gameRoomRepository);
export const updateGameRoomService = new UpdateGameRoomService(
  gameRoomRepository,
);
export const createPlayerService = new CreatePlayerService(playerRepository);
export const findPlayerService = new FindPlayerService(playerRepository);
export const findGameService = new FindGameService(gameRepository);
export const validatePlayerNotInRoomService =
  new ValidatePlayerNotInRoomService(gameRoomRepository);
export const validatePlayerAlreadyInRoomService =
  new ValidatePlayerAlreadyInRoomService(gameRoomRepository);
export const updateGameService = new UpdateGameService(gameRepository);

export const createGameUseCase = new CreateGameUseCase(
  createGameRoomService,
  createGameService,
);

export const joinGameUseCase = new JoinGameUseCase(
  findGameRoomService,
  updateGameRoomService,
  createPlayerService,
  validatePlayerAlreadyInRoomService,
);

export const startGameUseCase = new StartGameUseCase(
  findGameRoomService,
  updateGameRoomService,
);

export const findGameUseCase = new FindGameUseCase(findGameRoomService);

export const joinSocketRoomUseCase = new JoinSocketRoomUseCase(
  findGameRoomService,
  findGameService,
  findPlayerService,
  validatePlayerNotInRoomService,
);

export const movePieceUseCase = new MovePieceUseCase(
  findGameRoomService,
  findGameService,
  updateGameService,
  validatePlayerNotInRoomService,
);

export const capturePieceUseCase = new CapturePieceUseCase(
  findGameRoomService,
  findGameService,
  updateGameService,
  validatePlayerNotInRoomService,
);

export const findPlayersByGameRoomIdUseCase =
  new FindPlayersByGameRoomIdUseCase(findPlayerService, findGameRoomService);
