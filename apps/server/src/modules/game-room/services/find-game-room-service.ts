import { NotFoundError } from "@shared/errors/not-found-error";

import { IFindGameRoomService } from "./find-game-room-service.types";

import { IGameRoomRepository } from "../repositories/types";
import { IFindGameRoomDTO } from "../dtos/find-game-room.dto";

export class FindGameRoomService implements IFindGameRoomService {
  constructor(private gameRoomRepository: IGameRoomRepository) {}

  public async execute({ id }: IFindGameRoomDTO) {
    const gameRoom = await this.gameRoomRepository.find(id);

    if (!gameRoom) {
      throw new NotFoundError(`GameRoom ${id}`);
    }

    return gameRoom;
  }
}
