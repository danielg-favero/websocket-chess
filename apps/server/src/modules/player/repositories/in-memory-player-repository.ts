import { BaseInMemoryRepository } from "@shared/fakes/base-in-memory-repository";

import { Player } from "../domain/entities/player.entity";

export class InMemoryPlayerRepository extends BaseInMemoryRepository<Player> {}
