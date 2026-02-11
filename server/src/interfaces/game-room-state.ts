import { IGameState } from "./game-state";
import { TGameStatus } from "./game-statuts";
import { IPlayerState } from "./player-state";

export interface IGameRoomState {
  id: string;
  gameState: IGameState;
  players: {
    white: IPlayerState | null;
    black: IPlayerState | null;
  };
  status: TGameStatus;
}
