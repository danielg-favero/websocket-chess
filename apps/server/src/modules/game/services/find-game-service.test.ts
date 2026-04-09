import { FindGameService } from "./find-game-service";
import { CreateGameService } from "./create-game-service";

import { InMemoryGameRepository } from "../repositories/in-memory-game-repository";

describe("FindGameService", () => {
  it("Should find a game", async () => {
    const gameRepository = new InMemoryGameRepository();

    const createGameService = new CreateGameService(gameRepository);

    const findGameService = new FindGameService(gameRepository);

    const game = await createGameService.execute({ id: "1" });

    const foundGame = await findGameService.execute({ id: game.id });

    expect(foundGame.id).toEqual(game.id);
    expect(foundGame.turn).toEqual(game.turn);
    expect(foundGame.capturedPieces).toEqual(game.capturedPieces);
  });

  it("Should throw an error if the game is not found", async () => {
    const gameRepository = new InMemoryGameRepository();
    const findGameService = new FindGameService(gameRepository);

    await expect(findGameService.execute({ id: "1" })).rejects.toThrow(
      "[FindGameService]: Could not find Game 1",
    );
  });
});
