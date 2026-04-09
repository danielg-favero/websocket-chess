import { CreateGameService } from "./create-game-service";

import { Color } from "../domain/objects/color.object";
import { InMemoryGameRepository } from "../repositories/in-memory-game-repository";

describe("CreateGameService", () => {
  it("Should create a new game", async () => {
    const gameRepository = new InMemoryGameRepository();
    const createGameService = new CreateGameService(gameRepository);

    const game = await createGameService.execute({ id: "1" });

    expect(game.id).toEqual("1");
    expect(game.turn).toEqual(new Color("WHITE"));
    expect(game.capturedPieces).toEqual({ WHITE: [], BLACK: [] });
  });
});
