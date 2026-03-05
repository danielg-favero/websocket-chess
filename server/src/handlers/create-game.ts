import { logger } from "@danielg.favero/websocket-chess-package";
import { gameRoomOrchestrator } from "@orchestrators/game-room-orchestrator";

export class CreateGameHandler {
  constructor(private orchestrator = gameRoomOrchestrator) {}

  public handle() {
    const gameRoom = this.orchestrator.create();

    logger.log(`CreateGameHandler: Game room created`);

    return gameRoom.getState();
  }
}
