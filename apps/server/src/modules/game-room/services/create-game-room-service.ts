import { ICreateGameRoomService } from "./create-game-room-service.types";

import { IGameRoomRepository } from "../repositories/types";
import { GameRoom } from "../domain/entities/game-room.entity";
import { ICreateGameRoomDTO } from "../dtos/create-game-room.dto";

export class CreateGameRoomService implements ICreateGameRoomService {
  constructor(private gameRoomRepository: IGameRoomRepository) {}

  public async execute({ id, gameId }: ICreateGameRoomDTO) {
    const gameRoom = new GameRoom(id, gameId);

    const createdGameRoom = await this.gameRoomRepository.create(gameRoom);

    return createdGameRoom;
  }
}
