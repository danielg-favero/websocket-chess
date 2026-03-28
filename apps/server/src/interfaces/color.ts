import { TColorValue } from "@websocket-chess/shared";

export interface IColor {
  value: TColorValue;
  isWhite(): boolean;
  isBlack(): boolean;
  equals(color: IColor): boolean;
}
