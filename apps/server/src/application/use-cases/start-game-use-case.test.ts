import crypto from "node:crypto";

import { JoinGameUseCase } from "./join-game-use-case";
import { CreateGameUseCase } from "./create-game-use-case";
import { ERROR_MESSAGES } from "@websocket-chess/shared";

import { InMemoryGameRepository } from "@modules/game/repositories/in-memory-game-repository";
import { InMemoryGameRoomRepository } from "@modules/game-room/repositories/in-memory-game-room-repository";
import { InMemoryPlayerRepository } from "@modules/player/repositories/in-memory-player-repository";

import { CreateGameService } from "@modules/game/services/create-game-service";
import { CreateGameRoomService } from "@modules/game-room/services/create-game-room-service";
import { FindGameRoomService } from "@modules/game-room/services/find-game-room-service";
import { UpdateGameRoomService } from "@modules/game-room/services/update-game-room-service";
import { CreatePlayerService } from "@modules/player/services/create-player-service";

import { StartGameUseCase } from "./start-game-use-case";
import { ValidatePlayerAlreadyInRoomService } from "@modules/game-room/services/validate-player-already-in-room";

const gameRepository = new InMemoryGameRepository();
const gameRoomRepository = new InMemoryGameRoomRepository();
const playerRepository = new InMemoryPlayerRepository();

const findGameRoomService = new FindGameRoomService(gameRoomRepository);
const updateGameRoomService = new UpdateGameRoomService(gameRoomRepository);
const createPlayerService = new CreatePlayerService(playerRepository);

const createGameService = new CreateGameService(gameRepository);
const createGameRoomService = new CreateGameRoomService(gameRoomRepository);

const validatePlayerAlreadyInRoomService =
  new ValidatePlayerAlreadyInRoomService(gameRoomRepository);

const createGameUseCase = new CreateGameUseCase(
  createGameRoomService,
  createGameService,
);

const joinGameUseCase = new JoinGameUseCase(
  findGameRoomService,
  updateGameRoomService,
  createPlayerService,
  validatePlayerAlreadyInRoomService,
);

const startGameUseCase = new StartGameUseCase(
  findGameRoomService,
  updateGameRoomService,
);

describe("StartGameUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should start a game", async () => {
    jest.spyOn(crypto, "randomUUID").mockReturnValue("1" as any);
    await createGameUseCase.execute();

    jest.spyOn(crypto, "randomUUID").mockReturnValue("1" as any);
    await joinGameUseCase.execute({
      gameRoomId: "1",
      playerNickname: "test",
      playerId: "1",
    });

    jest.spyOn(crypto, "randomUUID").mockReturnValue("2" as any);

    await joinGameUseCase.execute({
      gameRoomId: "1",
      playerNickname: "test-2",
      playerId: "2",
    });

    const startedGame = await startGameUseCase.execute({
      gameRoomId: "1",
    });

    expect(startedGame.id).toEqual("1");
    expect(startedGame.gameId).toEqual("1");
    expect(startedGame.whitePlayerId).toEqual("1");
    expect(startedGame.blackPlayerId).toEqual("2");
    expect(startedGame.isFull).toBeTruthy();
    expect(startedGame.status).toEqual("PLAYING");
  });

  it("Should throw an error if the white player is not found", async () => {
    jest.spyOn(crypto, "randomUUID").mockReturnValue("1" as any);
    await createGameUseCase.execute();

    await expect(
      startGameUseCase.execute({
        gameRoomId: "1",
      }),
    ).rejects.toThrow(ERROR_MESSAGES.WHITE_PLAYER_NOT_FOUND);
  });

  it("Should throw an error if the black player is not found", async () => {
    await createGameUseCase.execute();

    jest.spyOn(crypto, "randomUUID").mockReturnValue("1" as any);

    // White Player Joined
    await joinGameUseCase.execute({
      gameRoomId: "1",
      playerNickname: "test",
      playerId: "1",
    });

    await expect(
      startGameUseCase.execute({
        gameRoomId: "1",
      }),
    ).rejects.toThrow(ERROR_MESSAGES.BLACK_PLAYER_NOT_FOUND);
  });
});
