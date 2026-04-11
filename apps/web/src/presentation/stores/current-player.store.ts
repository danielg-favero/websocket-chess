import type { Player } from "@domain/models/player.model";
import { create } from "zustand";

interface ICurrentPlayerStoreState {
  player: Player | null;
}

interface ICurrentPlayerStoreActions {
  setId: (id: string | null) => void;
  setNickname: (nickname: string) => void;
  setColor: (color: string) => void;
  setPlayer: (player: Player) => void;
}

export interface ICurrentPlayerStore
  extends ICurrentPlayerStoreState, ICurrentPlayerStoreActions {}

export const useCurrentPlayer = create<ICurrentPlayerStore>((set) => ({
  player: null,
  setId: (id: string | null) =>
    set((state) => ({
      player: {
        ...state.player,
        id,
      } as Player,
    })),
  setNickname: (nickname: string) =>
    set((state) => ({
      player: {
        ...state.player,
        nickname,
      } as Player,
    })),
  setColor: (color: string) =>
    set((state) => ({
      player: {
        ...state.player,
        color,
      } as Player,
    })),

  setPlayer: (player: Player) => set({ player }),
}));
