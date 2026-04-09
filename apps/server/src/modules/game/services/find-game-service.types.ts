import { Game } from "../domain/entities/game.entity";
import { IFindGameDTO } from "../dtos/find-game.dto";

export interface IFindGameService {
  execute(dto: IFindGameDTO): Promise<Game>;
}
