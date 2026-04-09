import { TColorValue } from "@websocket-chess/shared";

export class Color {
  value: TColorValue;

  constructor(value: TColorValue) {
    this.value = value;
  }

  isWhite(): boolean {
    return this.value === "WHITE";
  }

  isBlack(): boolean {
    return this.value === "BLACK";
  }

  equals(other: Color): boolean {
    return this.value === other.value;
  }

  toJSON() {
    return {
      value: this.value,
    };
  }
}
