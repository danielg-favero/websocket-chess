import { IValidatePlayerNotInRoomDTO } from "../dtos/valida-player-not-in-room.dto";

export interface IValidatePlayerNotInRoomService {
  execute(dto: IValidatePlayerNotInRoomDTO): Promise<void>;
}
