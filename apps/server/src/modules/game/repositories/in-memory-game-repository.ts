import { BaseInMemoryRepository } from "@shared/fakes/base-in-memory-repository";

import { Game } from "../domain/entities/game.entity";

export class InMemoryGameRepository extends BaseInMemoryRepository<Game> {}
