import { IFindGameRoomService } from "@modules/game-room/services/find-game-room-service.types";
import { IUpdateGameRoomService } from "@modules/game-room/services/update-game-room-service.types";

import { ISocketClient } from "@transport/websocket/types";
import { createMessage, SERVER_EVENTS } from "@websocket-chess/shared";

export interface IStartGameUseCasePayload {
  gameRoomId: string;
  socketClient: ISocketClient;
}

export class StartGameUseCase {
  constructor(
    private findGameRoomService: IFindGameRoomService,
    private updateGameRoomService: IUpdateGameRoomService,
  ) {}

  public async execute(payload: IStartGameUseCasePayload) {
    const { gameRoomId, socketClient } = payload;

    const gameRoom = await this.findGameRoomService.execute({
      id: gameRoomId,
    });

    gameRoom.startGame();

    const updatedGameRoom = await this.updateGameRoomService.execute({
      gameRoom,
    });

    socketClient.emitToRoom(
      gameRoom.id,
      createMessage(SERVER_EVENTS.GAME_ROOM_STATE, gameRoom.toJSON()),
    );

    return updatedGameRoom;
  }
}
