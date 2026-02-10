import { IBoard } from "./board";
import { IColor } from "./color";
import { IGameState } from "./game-state";
import { IPlayer } from "./player";
import { IPosition } from "./position";

export interface IGame {
  readonly id: string;

  board: IBoard;
  turn: IColor;
  players: {
    white: IPlayer | null;
    black: IPlayer | null;
  };

  addPlayer(playerId: string): void;
  initializeBoard(): void;
  move(from: IPosition, to: IPosition): void;
  isCheckmate(): boolean;
  isFull(): boolean;

  getState(): IGameState;
}
