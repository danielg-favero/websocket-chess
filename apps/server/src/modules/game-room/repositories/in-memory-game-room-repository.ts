import { BaseInMemoryRepository } from "@shared/fakes/base-in-memory-repository";

import { GameRoom } from "../domain/entities/game-room.entity";

export class InMemoryGameRoomRepository extends BaseInMemoryRepository<GameRoom> {}
