import { InMemoryGameRepository } from "@modules/game/repositories/in-memory-game-repository";
import { InMemoryGameRoomRepository } from "@modules/game-room/repositories/in-memory-game-room-repository";

import { CreateGameUseCase } from "./create-game-use-case";
import { CreateGameService } from "@modules/game/services/create-game-service";
import { CreateGameRoomService } from "@modules/game-room/services/create-game-room-service";

import crypto from "node:crypto";
jest.spyOn(crypto, "randomUUID").mockReturnValue("1" as any);

describe("CreateGameUseCase", () => {
  it("Should create a new game", async () => {
    const gameRoomRepository = new InMemoryGameRoomRepository();
    const gameRepository = new InMemoryGameRepository();

    const createGameRoomService = new CreateGameRoomService(gameRoomRepository);
    const createGameService = new CreateGameService(gameRepository);

    const createGameUseCase = new CreateGameUseCase(
      createGameRoomService,
      createGameService,
    );

    const game = await createGameUseCase.execute();

    expect(game.id).toEqual("1");
    expect(game.gameId).toEqual("1");
  });
});
