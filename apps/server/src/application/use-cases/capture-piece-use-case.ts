import {
  Coordinates,
  createMessage,
  SERVER_EVENTS,
} from "@websocket-chess/shared";

import { IFindGameRoomService } from "@modules/game-room/services/find-game-room-service.types";
import { IFindGameService } from "@modules/game/services/find-game-service.types";
import { IValidatePlayerNotInRoomService } from "@modules/game-room/services/validate-player-not-in-room.types";
import { Position } from "@modules/game/domain/objects/position.object";
import { IUpdateGameService } from "@modules/game/services/update-game-service.types";

import { ISocketClient } from "@transport/websocket/types";

export interface ICapturePieceUseCasePayload {
  gameRoomId: string;
  playerId: string;
  from: Coordinates;
  to: Coordinates;
  socketClient: ISocketClient;
}

export class CapturePieceUseCase {
  constructor(
    private findGameRoomService: IFindGameRoomService,
    private findGameService: IFindGameService,
    private updateGameService: IUpdateGameService,
    private validatePlayerNotInRoomService: IValidatePlayerNotInRoomService,
  ) {}

  public async execute(payload: ICapturePieceUseCasePayload) {
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

    game.capture(
      new Position(payload.from.x, payload.from.y),
      new Position(payload.to.x, payload.to.y),
    );

    const updatedGame = await this.updateGameService.execute({ game });

    socketClient.emitToRoom(
      gameRoom.id,
      createMessage(SERVER_EVENTS.GAME_STATE, updatedGame.toJSON()),
    );
    socketClient.emitToRoom(
      gameRoom.id,
      createMessage(SERVER_EVENTS.GAME_ROOM_STATE, gameRoom.toJSON()),
    );

    return updatedGame;
  }
}
