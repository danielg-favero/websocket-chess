import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import type { ICreateGameRoomService } from "@data/services/create-game-service.types";
import type {
  IJoinGameService,
  JoinGamePayload,
} from "@data/services/join-game-service.types";

import { useAppForm } from "@hooks/use-field-context";

import type { ICurrentPlayerStore } from "@presentation/stores/current-player.store";

import { LOBBY_PAGE_KEYS } from "./lobby-page.keys";
import {
  joinGameSchema,
  newGameSchema,
  type JoinGameSchema,
} from "./lobby-page.schemas";

interface IUseLobbyPageModelParams {
  createGameService: ICreateGameRoomService;
  joinGameService: IJoinGameService;
  currentPlayerStore: ICurrentPlayerStore;
}

export const useLobbyPageModel = ({
  createGameService,
  joinGameService,
  currentPlayerStore,
}: IUseLobbyPageModelParams) => {
  const navigate = useNavigate();

  const { mutateAsync: createGame, isPending: isCreatingGame } = useMutation({
    mutationKey: LOBBY_PAGE_KEYS.CREATE_GAME,
    mutationFn: () => createGameService.execute(),
  });

  const { mutateAsync: joinGame, isPending: isJoiningGame } = useMutation({
    mutationKey: LOBBY_PAGE_KEYS.JOIN_GAME,
    onSuccess: (response) => {
      navigate(`/game/${response.id}`);
    },
    mutationFn: (payload: JoinGamePayload) => joinGameService.execute(payload),
  });

  const handleJoinGame = async (payload: JoinGameSchema) => {
    const parsedValues = joinGameSchema.safeParse(payload);

    if (!parsedValues.success || !currentPlayerStore.player?.id) {
      return;
    }

    await joinGame({
      gameRoomId: parsedValues.data.gameRoomId,
      playerNickname: parsedValues.data.nickname,
      playerId: currentPlayerStore.player.id,
    });
  };

  const newGameForm = useAppForm({
    defaultValues: {
      nickname: "",
    },
    validators: {
      onSubmit: newGameSchema,
    },
    onSubmit: async ({ value }) => {
      const { id } = await createGame();
      await handleJoinGame({ gameRoomId: id, nickname: value.nickname });
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
    onSubmit: async ({ value }) => {
      await handleJoinGame(value);
    },
  });

  return {
    isConnected: !!currentPlayerStore.player?.id,
    isCreatingGame,
    isJoiningGame,
    newGameForm,
    joinGameForm,
  };
};

export type IUseLobbyPageModel = ReturnType<typeof useLobbyPageModel>;
