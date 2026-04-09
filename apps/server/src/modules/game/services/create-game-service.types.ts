import { Game } from "../domain/entities/game.entity";
import { ICreateGameDTO } from "../dtos/create-game.dto";

export interface ICreateGameService {
  execute(dto: ICreateGameDTO): Promise<Game>;
}
