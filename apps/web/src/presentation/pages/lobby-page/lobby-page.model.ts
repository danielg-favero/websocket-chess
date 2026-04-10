import { useMutation } from "@tanstack/react-query";

import type { ICreateGameRoomService } from "@data/services/create-game-service.types";
import type { ISocketClient } from "@infra/socket/types";

import type { ICurrentPlayerStore } from "@presentation/stores/current-player.store";

import { LOBBY_PAGE_KEYS } from "./lobby-page.keys";
import { useEffect } from "react";

interface IUseLobbyPageModelParams {
  createGameService: ICreateGameRoomService;
  socketClient: ISocketClient;
  currentPlayerStore: ICurrentPlayerStore;
}

export const useLobbyPageModel = ({
  createGameService,
  socketClient,
  currentPlayerStore,
}: IUseLobbyPageModelParams) => {
  const { mutate: createGame, isPending: isCreatingGame } = useMutation({
    mutationKey: LOBBY_PAGE_KEYS.CREATE_GAME,
    mutationFn: () => createGameService.execute(),
  });

  useEffect(() => {
    socketClient.connect();

    socketClient.onConnect(() => {
      currentPlayerStore.setId(socketClient.clientId!);
    });

    socketClient.onDisconnect(() => {
      currentPlayerStore.setId(null);
    });

    return () => {
      socketClient.disconnect();
    };
  }, []);

  return {
    createGame,
    isCreatingGame,
  };
};

export type IUseLobbyPageModel = ReturnType<typeof useLobbyPageModel>;
