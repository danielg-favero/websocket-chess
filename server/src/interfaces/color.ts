import { TColorValue } from "@danielg.favero/websocket-chess-package";

export interface IColor {
  value: TColorValue;
  isWhite(): boolean;
  isBlack(): boolean;
}
