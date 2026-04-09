import { Player } from "../domain/entities/player.entity";
import { IUpdatePlayerDTO } from "../dtos/update-player.dto";

export interface IUpdatePlayerService {
  execute(dto: IUpdatePlayerDTO): Promise<Player>;
}
