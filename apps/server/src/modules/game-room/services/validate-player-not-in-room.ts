import { NotFoundError } from "@shared/errors/not-found-error";

import { IValidatePlayerNotInRoomService } from "./validate-player-not-in-room.types";

import { IGameRoomRepository } from "../repositories/types";
import { IValidatePlayerNotInRoomDTO } from "../dtos/valida-player-not-in-room.dto";
import { PlayerNotInGameRoomError } from "../domain/errors/player-not-in-game-room";

export class ValidatePlayerNotInRoomService implements IValidatePlayerNotInRoomService {
  constructor(private gameRoomRepository: IGameRoomRepository) {}

  public async execute({ gameRoomId, playerId }: IValidatePlayerNotInRoomDTO) {
    const gameRoom = await this.gameRoomRepository.find(gameRoomId);

    if (!gameRoom) {
      throw new NotFoundError(`GameRoom ${gameRoomId}`);
    }

    const isPlayerNotInRoom =
      gameRoom.getWhitePlayer() !== playerId &&
      gameRoom.getBlackPlayer() !== playerId;

    if (isPlayerNotInRoom) {
      throw new PlayerNotInGameRoomError();
    }
  }
}
