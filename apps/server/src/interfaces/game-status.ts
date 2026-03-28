import { TGameStatus } from "@websocket-chess/shared";
import { IGame } from "./game";

export interface IGameStatus {
  status: TGameStatus;

  getStatus(): TGameStatus;
  setState(status: TGameStatus): void;
  updateStatus(game: IGame): void;
}
