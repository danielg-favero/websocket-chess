import { CreateGameRoomService } from "./create-game-room-service";
import { FindGameRoomService } from "./find-game-room-service";

import { InMemoryGameRoomRepository } from "../repositories/in-memory-game-room-repository";

describe("FindGameRoomService", () => {
  it("Should find a game room", async () => {
    const gameRoomRepository = new InMemoryGameRoomRepository();

    const createGameRoomService = new CreateGameRoomService(gameRoomRepository);

    const findGameRoomService = new FindGameRoomService(gameRoomRepository);

    const gameRoom = await createGameRoomService.execute({
      id: "1",
      gameId: "1",
    });

    const foundGameRoom = await findGameRoomService.execute({
      id: "1",
    });

    expect(foundGameRoom.id).toEqual(gameRoom.id);
    expect(foundGameRoom.gameId).toEqual(gameRoom.gameId);
    expect(foundGameRoom.status).toEqual(gameRoom.status);
    expect(foundGameRoom.whitePlayerId).toEqual(gameRoom.whitePlayerId);
    expect(foundGameRoom.blackPlayerId).toEqual(gameRoom.blackPlayerId);
    expect(foundGameRoom.isFull).toEqual(gameRoom.isFull);
  });

  it("Should throw an error if the game room is not found", async () => {
    const gameRoomRepository = new InMemoryGameRoomRepository();
    const findGameRoomService = new FindGameRoomService(gameRoomRepository);

    await expect(
      findGameRoomService.execute({
        id: "1",
      }),
    ).rejects.toThrow("[FindGameRoomService]: Could not find GameRoom 1");
  });
});
