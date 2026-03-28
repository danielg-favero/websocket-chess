import { IGameRoomState } from "interfaces/game-room-state";
import { TMessageTypes, MESSAGES_TYPES } from "./types";
import { IPlayerState } from "interfaces/player-state";

export type GenericMessageTransaction = {
  type: TMessageTypes;
  payload: unknown;
};
