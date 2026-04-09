import { NotFoundError } from "@shared/errors/not-found-error";

import { IUpdateGameRoomService } from "./update-game-room-service.types";
import { IGameRoomRepository } from "../repositories/types";
import { IUpdateGameRoomDTO } from "../dtos/update-game-room.dto";

export class UpdateGameRoomService implements IUpdateGameRoomService {
  constructor(private gameRoomRepository: IGameRoomRepository) {}

  public async execute({ gameRoom }: IUpdateGameRoomDTO) {
    const updatedGameRoom = await this.gameRoomRepository.update(
      gameRoom.id,
      gameRoom,
    );

    if (!updatedGameRoom) {
      throw new NotFoundError(`GameRoom ${gameRoom.id}`);
    }

    return updatedGameRoom;
  }
}
