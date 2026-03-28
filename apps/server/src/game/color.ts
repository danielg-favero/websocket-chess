import { TColorValue } from "@websocket-chess/shared";
import { IColor } from "@interfaces/color";

export class Color implements IColor {
  value: TColorValue;

  static WHITE = new Color("WHITE");
  static BLACK = new Color("BLACK");

  constructor(value: "WHITE" | "BLACK") {
    this.value = value;
  }

  isWhite(): boolean {
    return this.value === Color.WHITE.value;
  }

  isBlack(): boolean {
    return this.value === Color.BLACK.value;
  }

  equals(other: IColor): boolean {
    return this.value === other.value;
  }
}
