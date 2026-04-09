import { IBaseInMemoryRepository } from "@shared/fakes/base-in-memory-repository.types";

import { Game } from "../domain/entities/game.entity";

export interface IGameRepository extends IBaseInMemoryRepository<Game> {}
