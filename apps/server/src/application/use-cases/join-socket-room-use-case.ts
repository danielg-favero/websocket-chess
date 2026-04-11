import { createMessage, SERVER_EVENTS } from "@websocket-chess/shared";

import { IFindGameRoomService } from "@modules/game-room/services/find-game-room-service.types";
import { IFindGameService } from "@modules/game/services/find-game-service.types";
import { IFindPlayerService } from "@modules/player/services/find-player-service.types";
import { IValidatePlayerNotInRoomService } from "@modules/game-room/services/validate-player-not-in-room.types";

import { ISocketClient } from "@transport/websocket/types";

export interface IJoinSocketRoomUseCasePayload {
  gameRoomId: string;
  playerId: string;
  socketClient: ISocketClient;
}

export class JoinSocketRoomUseCase {
  constructor(
    private findGameRoomService: IFindGameRoomService,
    private findGameService: IFindGameService,
    private findPlayerService: IFindPlayerService,
    private validatePlayerNotInRoomService: IValidatePlayerNotInRoomService,
  ) {}

  public async execute(payload: IJoinSocketRoomUseCasePayload) {
    const { gameRoomId, playerId, socketClient } = payload;

    await this.validatePlayerNotInRoomService.execute({
      gameRoomId,
      playerId,
    });

    const gameRoom = await this.findGameRoomService.execute({
      id: gameRoomId,
    });

    const game = await this.findGameService.execute({
      id: gameRoom.gameId,
    });

    const player = await this.findPlayerService.execute({
      id: playerId,
    });

    socketClient.joinRoom(gameRoom.id);
    socketClient.emitToRoom(
      gameRoom.id,
      createMessage(SERVER_EVENTS.GAME_STATE, game.toJSON()),
    );
    socketClient.emitToRoom(
      gameRoom.id,
      createMessage(SERVER_EVENTS.GAME_ROOM_STATE, gameRoom.toJSON()),
    );
    socketClient.sendToClient(
      createMessage(SERVER_EVENTS.PLAYER_STATE, player.toJSON()),
    );

    return game;
  }
}
