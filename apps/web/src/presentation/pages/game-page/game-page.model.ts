import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { SERVER_EVENTS, type Coordinates } from "@websocket-chess/shared";
import { toast } from "@lib/toast";

import type { IJoinGameRoomService } from "@data/services/join-game-room-service.types";
import type { IStartGameService } from "@data/services/start-game-service.types";
import type { IMovePieceService } from "@data/services/move-piece-service.types";
import type { ICapturePieceService } from "@data/services/capture-piece-service.types";
import type {
  GetPlayersResponse,
  IGetPlayersService,
} from "@data/services/get-players-service.types";

import type { ISocketClient } from "@infra/socket/types";

import type { ICurrentPlayerStore } from "@presentation/stores/current-player.store";
import type { IGameRoomStore } from "@presentation/stores/game-room-store";
import type { IGameStore } from "@presentation/stores/game-store";
import { GAME_PAGE_KEYS } from "./lobby-page.keys";

interface IUseGamePageModelParams {
  gameStore: IGameStore;
  gameRoomStore: IGameRoomStore;
  currentPlayerStore: ICurrentPlayerStore;
  socketClient: ISocketClient;
  joinGameRoomService: IJoinGameRoomService;
  startGameService: IStartGameService;
  movePieceService: IMovePieceService;
  capturePieceService: ICapturePieceService;
  getPlayersService: IGetPlayersService;
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
  capturePieceService,
  getPlayersService,
  movePieceService,
}: IUseGamePageModelParams) => {
  useEffect(() => {
    socketClient.on("message", (message) => {
      console.log(message);
      if (message.type === SERVER_EVENTS.GAME_ROOM_STATE) {
        gameRoomStore.setGameRoom(message.payload);
      }

      if (message.type === SERVER_EVENTS.GAME_STATE) {
        gameStore.setGame(message.payload);
      }

      if (message.type === SERVER_EVENTS.PLAYER_STATE) {
        currentPlayerStore.setPlayer(message.payload);
      }

      if (message.type === SERVER_EVENTS.ERROR) {
        toast.error(message.payload.message);
      }
    });
  }, []);

  const { data: joinedPlayers, isLoading: isLoadingPlayers } =
    useQuery<GetPlayersResponse>({
      queryKey: GAME_PAGE_KEYS.GET_PLAYERS,
      queryFn: () => getPlayersService.execute({ gameRoomId }),
    });

  const handleMovePiece = (from: Coordinates, to: Coordinates) => {
    movePieceService.execute({
      gameRoomId,
      playerId: currentPlayerStore.player?.id,
      from,
      to,
    });
  };

  const handleCapturePiece = (from: Coordinates, to: Coordinates) => {
    capturePieceService.execute({
      gameRoomId,
      playerId: currentPlayerStore.player?.id,
      from,
      to,
    });
  };

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
    movePiece: handleMovePiece,
    capturePiece: handleCapturePiece,
    joinedPlayers,
    isLoadingPlayers,
  };
};

export type IUseGamePageModel = ReturnType<typeof useGamePageModel>;
