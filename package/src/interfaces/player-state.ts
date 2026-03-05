import { IColor } from "./color";

export interface IPlayerState {
  id: string;
  color: IColor["value"];
}
