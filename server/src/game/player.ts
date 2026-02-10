import { IPlayer } from "@interfaces/player";
import { Color } from "./color";

export class Player implements IPlayer {
  color: Color;
  id: string;

  constructor(id: string, color: Color) {
    this.color = color;
    this.id = id;
  }
}
