import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

import { IGame } from "@interfaces/game";
import { Game } from "@game/game";

class GameOrchestrator {
  private games: Map<string, IGame> = new Map();

  create(): IGame {
    const gameId = uuid();
    const game = new Game(gameId);

    this.games.set(gameId, game);

    return game;
  }

  join(gameId: string, playerId: string): IGame | null {
    const game = this.get(gameId);

    if (!game) return null;
    if (game.isFull()) return null;

    game.addPlayer(playerId);
    return game;
  }

  get(gameId: string): IGame | undefined {
    return this.games.get(gameId);
  }

  remove(gameId: string): boolean {
    return this.games.delete(gameId);
  }
}

export const gameOrchestrator = new GameOrchestrator();
