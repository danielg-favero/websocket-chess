import { Game } from "../domain/entities/game.entity";
import { IUpdateGameDTO } from "../dtos/update-game.dto";

export interface IUpdateGameService {
  execute(dto: IUpdateGameDTO): Promise<Game>;
}
