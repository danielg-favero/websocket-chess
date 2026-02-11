import { IGameRoom } from "@interfaces/game-room";
import { IGame } from "@interfaces/game";
import { IPlayer } from "@interfaces/player";
import { TGameStatus } from "@interfaces/game-statuts";
import { IGameRoomState } from "@interfaces/game-room-state";

import { Color } from "./color";

export class GameRoom implements IGameRoom {
  public game: IGame;
  public players: {
    white: IPlayer | null;
    black: IPlayer | null;
  };
  public status: TGameStatus;

  constructor(
    public id: string,
    game: IGame,
  ) {
    this.game = game;
    this.players = {
      white: null,
      black: null,
    };
    this.status = "NOT_STARTED";
  }

  isFull(): boolean {
    return !!this.players.white && !!this.players.black;
  }

  addPlayer(player: IPlayer): void {
    if (!this.players.white) {
      player.setColor(new Color("WHITE"));
      this.players.white = player;
      return;
    }

    player.setColor(new Color("BLACK"));
    this.players.black = player;
    this.status = "PLAYING";
  }

  removePlayer(playerId: string): void {
    if (this.players.white?.id === playerId) {
      this.players.white = null;
      this.status = "RESIGNED";
      return;
    }

    if (this.players.black?.id === playerId) {
      this.players.black = null;
      this.status = "RESIGNED";
      return;
    }
  }

  getPlayer(playerId: string): IPlayer | null {
    if (this.players.white?.id === playerId) return this.players.white;
    if (this.players.black?.id === playerId) return this.players.black;

    return null;
  }

  getGame(): IGame {
    return this.game;
  }

  getState(): IGameRoomState {
    return {
      id: this.id,
      gameState: this.game.getState(),
      players: {
        white: this.players.white?.getState() || null,
        black: this.players.black?.getState() || null,
      },
      status: this.status,
    };
  }
}
