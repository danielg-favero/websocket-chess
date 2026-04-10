import { IFindGameRoomService } from "@modules/game-room/services/find-game-room-service.types";
import { Player } from "@modules/player/domain/entities/player.entity";
import { IFindPlayerService } from "@modules/player/services/find-player-service.types";

export interface IFindPlayersByGameRoomIdUseCasePayload {
  gameRoomId: string;
}

export class FindPlayersByGameRoomIdUseCase {
  constructor(
    private findPlayerService: IFindPlayerService,
    private findGameRoomService: IFindGameRoomService,
  ) {}

  public async execute(payload: IFindPlayersByGameRoomIdUseCasePayload) {
    const { gameRoomId } = payload;

    const gameRoom = await this.findGameRoomService.execute({
      id: gameRoomId,
    });

    const players: { WHITE: Player | null; BLACK: Player | null } = {
      WHITE: null,
      BLACK: null,
    };

    if (gameRoom.whitePlayerId) {
      const whitePlayer = await this.findPlayerService.execute({
        id: gameRoom.whitePlayerId,
      });
      players.WHITE = whitePlayer;
    }

    if (gameRoom.blackPlayerId) {
      const blackPlayer = await this.findPlayerService.execute({
        id: gameRoom.blackPlayerId,
      });
      players.BLACK = blackPlayer;
    }

    return players;
  }
}
