import { NotFoundError } from "@shared/errors/not-found-error";

import { IValidatePlayerAlreadyInRoomService } from "./validate-player-already-in-room.types";

import { IGameRoomRepository } from "../repositories/types";
import { IValidatePlayerAlreadyInRoomDTO } from "../dtos/valida-player-already-in-room.dto";
import { PlayerAlreadyInGameRoomError } from "../domain/errors/player-already-in-game-room";

export class ValidatePlayerAlreadyInRoomService implements IValidatePlayerAlreadyInRoomService {
  constructor(private gameRoomRepository: IGameRoomRepository) {}

  public async execute({
    gameRoomId,
    playerId,
  }: IValidatePlayerAlreadyInRoomDTO) {
    const gameRoom = await this.gameRoomRepository.find(gameRoomId);

    if (!gameRoom) {
      throw new NotFoundError(`GameRoom ${gameRoomId}`);
    }

    const isPlayerAlreadyInRoom =
      gameRoom.getWhitePlayer() === playerId ||
      gameRoom.getBlackPlayer() === playerId;

    if (isPlayerAlreadyInRoom) {
      throw new PlayerAlreadyInGameRoomError(playerId);
    }
  }
}
