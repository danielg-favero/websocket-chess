import { IFindGameRoomService } from "@modules/game-room/services/find-game-room-service.types";

export interface IFindGameUseCasePayload {
  gameRoomId: string;
}

export class FindGameUseCase {
  constructor(private findGameRoomService: IFindGameRoomService) {}

  public async execute(payload: IFindGameUseCasePayload) {
    const { gameRoomId } = payload;

    const gameRoom = await this.findGameRoomService.execute({
      id: gameRoomId,
    });

    return gameRoom;
  }
}
