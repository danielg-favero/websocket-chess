import { CreateGameRoomService } from "./create-game-room-service";

import { InMemoryGameRoomRepository } from "../repositories/in-memory-game-room-repository";

describe("CreateGameRoomService", () => {
  it("Should create a new game room", async () => {
    const gameRoomRepository = new InMemoryGameRoomRepository();

    const createGameRoomService = new CreateGameRoomService(gameRoomRepository);

    const gameRoom = await createGameRoomService.execute({
      id: "1",
      gameId: "1",
    });

    expect(gameRoom.id).toEqual("1");
    expect(gameRoom.gameId).toEqual("1");
    expect(gameRoom.status).toEqual("NOT_STARTED");
    expect(gameRoom.whitePlayerId).toEqual(null);
    expect(gameRoom.blackPlayerId).toEqual(null);
  });
});
