import { Coordinates } from "@websocket-chess/shared";

export interface IPosition extends Coordinates {
  isInsideBoard(): boolean;
}
