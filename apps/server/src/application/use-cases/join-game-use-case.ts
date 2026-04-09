import crypto from "node:crypto";

import { IFindGameRoomService } from "@modules/game-room/services/find-game-room-service.types";
import { IUpdateGameRoomService } from "@modules/game-room/services/update-game-room-service.types";
import { ICreatePlayerService } from "@modules/player/services/create-player-service.types";
import { IValidatePlayerAlreadyInRoomService } from "@modules/game-room/services/validate-player-already-in-room.types";

export interface IJoinGameUseCasePayload {
  gameRoomId: string;
  playerNickname: string;
  playerId: string;
}

export class JoinGameUseCase {
  constructor(
    private findGameRoomService: IFindGameRoomService,
    private updateGameRoomService: IUpdateGameRoomService,
    private createPlayerService: ICreatePlayerService,
    private validatePlayerAlreadyInRoomService: IValidatePlayerAlreadyInRoomService,
  ) {}

  public async execute(payload: IJoinGameUseCasePayload) {
    const { gameRoomId, playerNickname, playerId } = payload;

    await this.validatePlayerAlreadyInRoomService.execute({
      gameRoomId,
      playerId,
    });

    const gameRoom = await this.findGameRoomService.execute({
      id: gameRoomId,
    });

    const player = await this.createPlayerService.execute({
      id: playerId,
      nickname: playerNickname,
      color: gameRoom.getAvailableColor().value,
    });

    gameRoom.addPlayer(player.id);

    const updatedGameRoom = await this.updateGameRoomService.execute({
      gameRoom,
    });

    return updatedGameRoom;
  }
}
