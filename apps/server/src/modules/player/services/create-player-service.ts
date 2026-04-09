import { Color } from "@modules/game/domain/objects/color.object";

import { IPlayerRepository } from "../repositories/types";
import { Player } from "../domain/entities/player.entity";
import { ICreatePlayerService } from "./create-player-service.types";
import { ICreatePlayerDTO } from "../dtos/create-player.dto";

export class CreatePlayerService implements ICreatePlayerService {
  constructor(private playerRepository: IPlayerRepository) {}

  public async execute({ id, nickname, color }: ICreatePlayerDTO) {
    const player = new Player(id, nickname, new Color(color));

    const createdPlayer = await this.playerRepository.create(player);

    return createdPlayer;
  }
}
