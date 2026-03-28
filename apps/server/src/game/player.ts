import { IPlayerState } from "@websocket-chess/shared";
import { IPlayer } from "@interfaces/player";

import { Color } from "./color";

export class Player implements IPlayer {
  color!: Color;
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  isWhite(): boolean {
    return this.color.isWhite();
  }

  isBlack(): boolean {
    return this.color.isBlack();
  }

  setColor(color: Color): void {
    this.color = color;
  }

  getState(): IPlayerState {
    return {
      id: this.id,
      color: this.color.value,
    };
  }
}
