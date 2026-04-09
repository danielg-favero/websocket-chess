import { NotFoundError } from "@shared/errors/not-found-error";

import { IFindGameService } from "./find-game-service.types";

import { IGameRepository } from "../repositories/types";
import { IFindGameDTO } from "../dtos/find-game.dto";

export class FindGameService implements IFindGameService {
  constructor(private gameRepository: IGameRepository) {}

  public async execute({ id }: IFindGameDTO) {
    const game = await this.gameRepository.find(id);

    if (!game) {
      throw new NotFoundError(`Game ${id}`);
    }

    return game;
  }
}
