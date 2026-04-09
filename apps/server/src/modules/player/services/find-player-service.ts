import { NotFoundError } from "@shared/errors/not-found-error";

import { IFindPlayerService } from "./find-player-service.types";

import { IPlayerRepository } from "../repositories/types";
import { IFindPlayerDTO } from "../dtos/find-player.dto";

export class FindPlayerService implements IFindPlayerService {
  constructor(private playerRepository: IPlayerRepository) {}

  public async execute({ id }: IFindPlayerDTO) {
    const player = await this.playerRepository.find(id);

    if (!player) {
      throw new NotFoundError(`Player ${id}`);
    }

    return player;
  }
}
