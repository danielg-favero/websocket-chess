import { GameRoom } from "../domain/entities/game-room.entity";
import { ICreateGameRoomDTO } from "../dtos/create-game-room.dto";

export interface ICreateGameRoomService {
  execute(dto: ICreateGameRoomDTO): Promise<GameRoom>;
}
