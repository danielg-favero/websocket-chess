import { IGameState } from "@danielg.favero/websocket-chess-package";

import { IBoard } from "./board";
import { IColor } from "./color";
import { IPosition } from "./position";

export interface IGame {
  board: IBoard;

  turn: IColor;
  initializeBoard(): void;
  move(from: IPosition, to: IPosition): void;
  getState(): IGameState;
}
