import { gameOrchestrator } from "@orchestrators/game-orchestrator";

export class CreateGameHandler {
  constructor(private orchestrator = gameOrchestrator) {}

  public handle() {
    const game = this.orchestrator.create();

    return game.getState();
  }
}
