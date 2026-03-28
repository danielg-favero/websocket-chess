import { IGameRoomState, TGameStatus } from "@websocket-chess/shared";

import { IPlayer } from "./player";
import { IGame } from "./game";

export interface IGameRoom {
  id: string;
  game: IGame;
  players: {
    white: IPlayer | null;
    black: IPlayer | null;
  };

  isFull(): boolean;
  addPlayer(player: IPlayer): void;
  removePlayer(playerId: string): void;
  getPlayer(playerId: string): IPlayer | null;
  getGame(): IGame;

  getState(): IGameRoomState;
}
