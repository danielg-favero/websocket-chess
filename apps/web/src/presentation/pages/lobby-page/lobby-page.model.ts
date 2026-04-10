import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAppForm } from "@hooks/use-field-context";
import type { ICreateGameRoomService } from "@data/services/create-game-service.types";
import type { ISocketClient } from "@infra/socket/types";

import type { ICurrentPlayerStore } from "@presentation/stores/current-player.store";

import { LOBBY_PAGE_KEYS } from "./lobby-page.keys";
import { joinGameSchema, newGameSchema } from "./lobby-page.schemas";

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
  const { mutateAsync: createGame, isPending: isCreatingGame } = useMutation({
    mutationKey: LOBBY_PAGE_KEYS.CREATE_GAME,
    mutationFn: () => createGameService.execute(),
  });

  const newGameForm = useAppForm({
    defaultValues: {
      nickname: "",
    },
    validators: {
      onSubmit: newGameSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await createGame();
    },
  });

  const joinGameForm = useAppForm({
    defaultValues: {
      nickname: "",
      gameRoomId: "",
    },
    validators: {
      onSubmit: joinGameSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
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
    newGameForm,
    joinGameForm,
  };
};

export type IUseLobbyPageModel = ReturnType<typeof useLobbyPageModel>;
