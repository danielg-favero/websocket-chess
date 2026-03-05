import { IGame } from "./game";
import { IGameRoomState } from "./game-room-state";
import { TGameStatus } from "./game-statuts";
import { IPlayer } from "./player";

export interface IGameRoom {
  id: string;
  game: IGame;
  players: {
    white: IPlayer | null;
    black: IPlayer | null;
  };
  status: TGameStatus;

  isFull(): boolean;
  addPlayer(player: IPlayer): void;
  removePlayer(playerId: string): void;
  getPlayer(playerId: string): IPlayer | null;
  getGame(): IGame;

  getState(): IGameRoomState;
}
