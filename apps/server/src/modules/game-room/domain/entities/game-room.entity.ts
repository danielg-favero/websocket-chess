import { TGameStatus } from "@websocket-chess/shared";

import { GameRoomIsFullError } from "../errors/game-room-is-full";
import { WhitePlayerNotFoundError } from "../errors/white-player-not-found";
import { BlackPlayerNotFoundError } from "../errors/black-player-not-found";
import { Color } from "@modules/game/domain/objects/color.object";

export class GameRoom {
  readonly id: string;
  readonly gameId: string;

  whitePlayerId: string | null;
  blackPlayerId: string | null;

  isFull: boolean;
  status: TGameStatus;

  constructor(id: string, gameId: string) {
    this.id = id;
    this.gameId = gameId;

    this.whitePlayerId = null;
    this.blackPlayerId = null;

    this.status = "NOT_STARTED";
    this.isFull = false;
  }

  public addPlayer(playerId: string): void {
    if (this.isFull) {
      throw new GameRoomIsFullError();
    }

    if (!this.whitePlayerId) {
      this.setWhitePlayer(playerId);
    } else {
      this.setBlackPlayer(playerId);
    }
  }

  public getAvailableColor(): Color {
    if (!this.whitePlayerId) {
      return new Color("WHITE");
    }

    return new Color("BLACK");
  }

  private setWhitePlayer(playerId: string): void {
    if (this.whitePlayerId === playerId) return;

    this.whitePlayerId = playerId;
    this.updateIsFull();
  }

  private setBlackPlayer(playerId: string): void {
    if (this.blackPlayerId === playerId) return;

    this.blackPlayerId = playerId;
    this.updateIsFull();
  }

  public getWhitePlayer(): string | null {
    return this.whitePlayerId;
  }

  public getBlackPlayer(): string | null {
    return this.blackPlayerId;
  }

  private updateIsFull(): void {
    this.isFull = !!this.whitePlayerId && !!this.blackPlayerId;
  }

  public startGame(): void {
    if (!this.whitePlayerId) {
      throw new WhitePlayerNotFoundError();
    }

    if (!this.blackPlayerId) {
      throw new BlackPlayerNotFoundError();
    }

    this.status = "PLAYING";
  }

  public toJSON() {
    return {
      id: this.id,
      gameId: this.gameId,
      whitePlayerId: this.whitePlayerId,
      blackPlayerId: this.blackPlayerId,
      isFull: this.isFull,
      status: this.status,
    };
  }
}
