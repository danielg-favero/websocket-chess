import type { Player } from "@domain/models/player.model";

export type GetPlayersPayload = {
  gameRoomId: string;
};

export type GetPlayersResponse = {
  WHITE: Player | null;
  BLACK: Player | null;
};

export interface IGetPlayersService {
  execute: (payload: GetPlayersPayload) => Promise<GetPlayersResponse>;
}
