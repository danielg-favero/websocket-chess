import { CreateGameRoomService } from "./create-game-room-service";
import { UpdateGameRoomService } from "./update-game-room-service";

import { InMemoryGameRoomRepository } from "../repositories/in-memory-game-room-repository";
import { GameRoom } from "../domain/entities/game-room.entity";

describe("UpdateGameRoomService", () => {
  it("Should find a player", async () => {
    const gameRoomRepository = new InMemoryGameRoomRepository();

    const createGameRoomService = new CreateGameRoomService(gameRoomRepository);
    const updateGameRoomService = new UpdateGameRoomService(gameRoomRepository);

    const gameRoom = await createGameRoomService.execute({
      id: "1",
      gameId: "2",
    });

    gameRoom.addPlayer("2");
    gameRoom.addPlayer("3");

    const updatedGameRoom = await updateGameRoomService.execute({
      gameRoom,
    });

    expect(updatedGameRoom.id).toEqual("1");
    expect(updatedGameRoom.gameId).toEqual("2");
    expect(updatedGameRoom.whitePlayerId).toEqual("2");
    expect(updatedGameRoom.blackPlayerId).toEqual("3");
  });

  it("Should throw an error if the game room is not found", async () => {
    const gameRoomRepository = new InMemoryGameRoomRepository();
    const updateGameRoomService = new UpdateGameRoomService(gameRoomRepository);

    const gameRoom = new GameRoom("1", "2");

    await expect(updateGameRoomService.execute({ gameRoom })).rejects.toThrow(
      "[UpdateGameRoomService]: Could not update GameRoom 1",
    );
  });
});
