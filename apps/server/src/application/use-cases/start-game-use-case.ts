import { IFindGameRoomService } from "@modules/game-room/services/find-game-room-service.types";
import { IUpdateGameRoomService } from "@modules/game-room/services/update-game-room-service.types";

export interface IStartGameUseCasePayload {
  gameRoomId: string;
}

export class StartGameUseCase {
  constructor(
    private findGameRoomService: IFindGameRoomService,
    private updateGameRoomService: IUpdateGameRoomService,
  ) {}

  public async execute(payload: IStartGameUseCasePayload) {
    const { gameRoomId } = payload;

    const gameRoom = await this.findGameRoomService.execute({
      id: gameRoomId,
    });

    gameRoom.startGame();

    const updatedGameRoom = await this.updateGameRoomService.execute({
      gameRoom,
    });

    return updatedGameRoom;
  }
}
