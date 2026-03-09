import { IPlayerState } from "@danielg.favero/websocket-chess-package";

import { IColor } from "./color";

export interface IPlayer {
  readonly id: string;
  readonly color: IColor;

  isWhite(): boolean;
  isBlack(): boolean;

  setColor(color: IColor): void;

  getState(): IPlayerState;
}
