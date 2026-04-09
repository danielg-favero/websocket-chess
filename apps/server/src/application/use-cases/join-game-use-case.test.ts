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

describe("JoinGameUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should add white player to a game", async () => {
    await createGameUseCase.execute();

    jest.spyOn(crypto, "randomUUID").mockReturnValue("1" as any);

    const whitePlayerJoinedGame = await joinGameUseCase.execute({
      gameRoomId: "1",
      playerNickname: "test",
      playerId: "1",
    });

    expect(whitePlayerJoinedGame.id).toEqual("1");
    expect(whitePlayerJoinedGame.gameId).toEqual("1");
    expect(whitePlayerJoinedGame.whitePlayerId).toEqual("1");
    expect(whitePlayerJoinedGame.blackPlayerId).toBeNull();
    expect(whitePlayerJoinedGame.isFull).toBeFalsy();
    expect(whitePlayerJoinedGame.status).toEqual("NOT_STARTED");
  });

  it("Should add black player to a game", async () => {
    await createGameUseCase.execute();

    jest.spyOn(crypto, "randomUUID").mockReturnValue("1" as any);

    // White Player Joined
    await joinGameUseCase.execute({
      gameRoomId: "1",
      playerNickname: "test",
      playerId: "1",
    });

    jest.spyOn(crypto, "randomUUID").mockReturnValue("2" as any);

    // Black Player Joined
    const blackPlayerJoinedGame = await joinGameUseCase.execute({
      gameRoomId: "1",
      playerNickname: "test-2",
      playerId: "2",
    });

    expect(blackPlayerJoinedGame.id).toEqual("1");
    expect(blackPlayerJoinedGame.gameId).toEqual("1");
    expect(blackPlayerJoinedGame.whitePlayerId).toEqual("1");
    expect(blackPlayerJoinedGame.blackPlayerId).toEqual("2");
    expect(blackPlayerJoinedGame.isFull).toBeTruthy();
    expect(blackPlayerJoinedGame.status).toEqual("NOT_STARTED");
  });

  it("Should throw an error if the game room is full", async () => {
    await createGameUseCase.execute();

    jest.spyOn(crypto, "randomUUID").mockReturnValue("1" as any);

    // White Player Joined
    await joinGameUseCase.execute({
      gameRoomId: "1",
      playerNickname: "test",
      playerId: "1",
    });

    jest.spyOn(crypto, "randomUUID").mockReturnValue("2" as any);

    // Black Player Joined
    await joinGameUseCase.execute({
      gameRoomId: "1",
      playerNickname: "test-2",
      playerId: "2",
    });

    jest.spyOn(crypto, "randomUUID").mockReturnValue("3" as any);

    await expect(
      joinGameUseCase.execute({
        gameRoomId: "1",
        playerNickname: "test-3",
        playerId: "3",
      }),
    ).rejects.toThrow(ERROR_MESSAGES.GAME_ROOM_FULL);
  });
});
