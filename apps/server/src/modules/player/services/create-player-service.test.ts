import { InMemoryPlayerRepository } from "../repositories/in-memory-player-repository";

import { CreatePlayerService } from "./create-player-service";

describe("CreatePlayerService", () => {
  it("Should create a new game", async () => {
    const playerRepository = new InMemoryPlayerRepository();
    const createPlayerService = new CreatePlayerService(playerRepository);

    const player = await createPlayerService.execute({
      id: "1",
      nickname: "test",
      color: "WHITE",
    });

    expect(player.id).toEqual("1");
    expect(player.nickname).toEqual("test");
    expect(player.color).toBeNull();
  });
});
