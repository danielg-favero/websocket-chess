import { GameRoom } from "../domain/entities/game-room.entity";
import { IFindGameRoomDTO } from "../dtos/find-game-room.dto";

export interface IFindGameRoomService {
  execute(dto: IFindGameRoomDTO): Promise<GameRoom>;
}
