import type { Game } from "@domain/models/game-model";

import { create } from "zustand";

interface IGameStoreState {
  game: Game | null;
}

interface IGameStoreActions {
  setGame: (game: Game) => void;
}

export interface IGameStore extends IGameStoreState, IGameStoreActions {}

export const useGame = create<IGameStore>((set) => ({
  game: null,
  setGame: (game: Game) =>
    set((state) => ({
      game: {
        ...state.game,
        ...game,
      } as Game,
    })),
}));
