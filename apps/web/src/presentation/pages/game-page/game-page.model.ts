import { useEffect } from "react";
import { SERVER_EVENTS } from "@websocket-chess/shared";

import type { IJoinGameRoomService } from "@data/services/join-game-room-service.types";
import type { IStartGameService } from "@data/services/start-game-service.types";

import type { ISocketClient } from "@infra/socket/types";

import type { ICurrentPlayerStore } from "@presentation/stores/current-player.store";
import type { IGameRoomStore } from "@presentation/stores/game-room-store";
import type { IGameStore } from "@presentation/stores/game-store";

interface IUseGamePageModelParams {
  gameStore: IGameStore;
  gameRoomStore: IGameRoomStore;
  currentPlayerStore: ICurrentPlayerStore;
  socketClient: ISocketClient;
  joinGameRoomService: IJoinGameRoomService;
  startGameService: IStartGameService;
  gameRoomId: string;
}

export const useGamePageModel = ({
  gameStore,
  gameRoomStore,
  currentPlayerStore,
  socketClient,
  gameRoomId,
  joinGameRoomService,
  startGameService,
}: IUseGamePageModelParams) => {
  useEffect(() => {
    socketClient.on("message", (message) => {
      if (message.type === SERVER_EVENTS.GAME_ROOM_STATE) {
        gameRoomStore.setGameRoom(message.payload);
      }

      if (message.type === SERVER_EVENTS.GAME_STATE) {
        gameStore.setGame(message.payload);
      }

      if (message.type === SERVER_EVENTS.PLAYER_STATE) {
        currentPlayerStore.setPlayer(message.payload);
      }
    });
  }, []);

  useEffect(() => {
    joinGameRoomService.execute({
      gameRoomId,
      playerId: currentPlayerStore.player?.id,
    });
  }, []);

  return {
    game: gameStore.game,
    gameRoom: gameRoomStore.gameRoom,
    player: currentPlayerStore.player,
    startGame: () => startGameService.execute({ gameRoomId }),
  };
};

export type IUseGamePageModel = ReturnType<typeof useGamePageModel>;
