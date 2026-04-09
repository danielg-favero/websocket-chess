import { NotFoundError } from "@shared/errors/not-found-error";

import { IUpdatePlayerService } from "./update-player-service.types";
import { IPlayerRepository } from "../repositories/types";
import { IUpdatePlayerDTO } from "../dtos/update-player.dto";

export class UpdatePlayerService implements IUpdatePlayerService {
  constructor(private playerRepository: IPlayerRepository) {}

  public async execute({ player }: IUpdatePlayerDTO) {
    const updatedPlayer = await this.playerRepository.update(player.id, player);

    if (!updatedPlayer) {
      throw new NotFoundError(`Player ${player.id}`);
    }

    return updatedPlayer;
  }
}
