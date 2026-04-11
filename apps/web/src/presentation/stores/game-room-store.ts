import type { GameRoom } from "@domain/models/game-room.model";

import { create } from "zustand";

interface IGameRoomStoreState {
  gameRoom: GameRoom | null;
}

interface IGameRoomStoreActions {
  setGameRoom: (gameRoom: GameRoom) => void;
}

export interface IGameRoomStore
  extends IGameRoomStoreState, IGameRoomStoreActions {}

export const useGameRoom = create<IGameRoomStore>((set) => ({
  gameRoom: null,
  setGameRoom: (gameRoom: GameRoom) =>
    set((state) => ({
      gameRoom: {
        ...state.gameRoom,
        ...gameRoom,
      } as GameRoom,
    })),
}));
