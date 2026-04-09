import { IBaseInMemoryRepository } from "@shared/fakes/base-in-memory-repository.types";

import { GameRoom } from "../domain/entities/game-room.entity";

export interface IGameRoomRepository extends IBaseInMemoryRepository<GameRoom> {}
