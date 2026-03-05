import { Coordinates } from "../config/coordinates";

export interface IPosition extends Coordinates {
  isInsideBoard(): boolean;
}
