import { logger } from "@danielg.favero/websocket-chess-package";
import { gameRoomOrchestrator } from "@orchestrators/game-room-orchestrator";

export class CreateGameUseCase {
  constructor(private orchestrator = gameRoomOrchestrator) {}

  public execute() {
    const gameRoom = this.orchestrator.create();

    logger.log(`CreateGameUseCase: Game room created`);

    return gameRoom.getState();
  }
}
