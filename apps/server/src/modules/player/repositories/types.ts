import { IBaseInMemoryRepository } from "@shared/fakes/base-in-memory-repository.types";

import { Player } from "../domain/entities/player.entity";

export interface IPlayerRepository extends IBaseInMemoryRepository<Player> {}
