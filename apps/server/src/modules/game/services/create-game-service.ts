import { logger } from "@websocket-chess/shared";

import { ICreateGameService } from "./create-game-service.types";

import { IGameRepository } from "../repositories/types";
import { Game } from "../domain/entities/game.entity";
import { ICreateGameDTO } from "../dtos/create-game.dto";

export class CreateGameService implements ICreateGameService {
  constructor(private gameRepository: IGameRepository) {}

  public async execute({ id }: ICreateGameDTO) {
    const game = new Game(id);

    await this.gameRepository.create(game);

    return game;
  }
}
