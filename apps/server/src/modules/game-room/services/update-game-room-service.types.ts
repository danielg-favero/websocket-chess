import { GameRoom } from "../domain/entities/game-room.entity";
import { IUpdateGameRoomDTO } from "../dtos/update-game-room.dto";

export interface IUpdateGameRoomService {
  execute(dto: IUpdateGameRoomDTO): Promise<GameRoom>;
}
