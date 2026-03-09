import { Coordinates } from "@danielg.favero/websocket-chess-package";

export interface IPosition extends Coordinates {
  isInsideBoard(): boolean;
}
