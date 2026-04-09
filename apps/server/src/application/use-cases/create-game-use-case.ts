import crypto from "node:crypto";

import { ICreateGameRoomService } from "@modules/game-room/services/create-game-room-service.types";
import { ICreateGameService } from "@modules/game/services/create-game-service.types";

export class CreateGameUseCase {
  constructor(
    private createGameRoomService: ICreateGameRoomService,
    private createGameService: ICreateGameService,
  ) {}

  public async execute() {
    const game = await this.createGameService.execute({
      id: crypto.randomUUID(),
    });
    const gameRoom = await this.createGameRoomService.execute({
      id: crypto.randomUUID(),
      gameId: game.id,
    });

    return gameRoom;
  }
}
