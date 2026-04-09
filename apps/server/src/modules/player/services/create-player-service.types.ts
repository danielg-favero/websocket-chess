import { Player } from "../domain/entities/player.entity";
import { ICreatePlayerDTO } from "../dtos/create-player.dto";

export interface ICreatePlayerService {
  execute(dto: ICreatePlayerDTO): Promise<Player>;
}
