import { IValidatePlayerAlreadyInRoomDTO } from "../dtos/valida-player-already-in-room.dto";

export interface IValidatePlayerAlreadyInRoomService {
  execute(dto: IValidatePlayerAlreadyInRoomDTO): Promise<void>;
}
