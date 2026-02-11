import { Color } from "@game/color";

import { IPlayerState } from "./player-state";

export interface IPlayer {
  readonly id: string;
  readonly color: Color;

  isWhite(): boolean;
  isBlack(): boolean;

  setColor(color: Color): void;

  getState(): IPlayerState;
}
