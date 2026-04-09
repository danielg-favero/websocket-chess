import { Player } from "../domain/entities/player.entity";
import { IFindPlayerDTO } from "../dtos/find-player.dto";

export interface IFindPlayerService {
  execute(dto: IFindPlayerDTO): Promise<Player>;
}
