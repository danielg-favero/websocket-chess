import { NotFoundError } from "@shared/errors/not-found-error";

import { IGameRepository } from "../repositories/types";
import { IUpdateGameDTO } from "../dtos/update-game.dto";
import { IUpdateGameService } from "./update-game-service.types";

export class UpdateGameService implements IUpdateGameService {
  constructor(private gameRepository: IGameRepository) {}

  public async execute({ game }: IUpdateGameDTO) {
    const updatedGame = await this.gameRepository.update(game.id, game);

    if (!updatedGame) {
      throw new NotFoundError(`Game ${game.id}`);
    }

    return updatedGame;
  }
}
