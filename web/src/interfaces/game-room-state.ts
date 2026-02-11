import type { IGameState } from "./game-state";
import type { IPlayerState } from "./player-state";

export interface IGameRoomState {
  id: string;
  gameState: IGameState;
  players: {
    white: IPlayerState | null;
    black: IPlayerState | null;
  };
}
