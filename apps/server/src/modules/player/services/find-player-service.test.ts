import { CreatePlayerService } from "./create-player-service";

import { InMemoryPlayerRepository } from "../repositories/in-memory-player-repository";
import { FindPlayerService } from "./find-player-service";

describe("FindPlayerService", () => {
  it("Should find a player", async () => {
    const playerRepository = new InMemoryPlayerRepository();
    const createPlayerService = new CreatePlayerService(playerRepository);

    const findPlayerService = new FindPlayerService(playerRepository);

    const player = await createPlayerService.execute({
      id: "1",
      nickname: "test",
      color: "WHITE",
    });
    const foundPlayer = await findPlayerService.execute({
      id: player.id,
    });

    expect(foundPlayer.id).toEqual(player.id);
    expect(foundPlayer.nickname).toEqual(player.nickname);
    expect(foundPlayer.color).toEqual(player.color);
  });

  it("Should throw an error if the game room is not found", async () => {
    const playerRepository = new InMemoryPlayerRepository();
    const findPlayerService = new FindPlayerService(playerRepository);

    await expect(findPlayerService.execute({ id: "1" })).rejects.toThrow(
      "[FindPlayerService]: Could not find Player 1",
    );
  });
});
