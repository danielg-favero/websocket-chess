import { CreateGameRoomService } from "@data/services/create-game-service";
import { JoinGameService } from "@data/services/join-game-service";

import { HTTPClient } from "@infra/http/client";

import { useCurrentPlayer } from "@presentation/stores/current-player.store";

import { useLobbyPageModel } from "./lobby-page.model";
import LobbyPageView from "./lobby-page.view";

const httpClient = new HTTPClient();
const createGameService = new CreateGameRoomService(httpClient);
const joinGameService = new JoinGameService(httpClient);

export default function LobbyPageViewModel() {
  const currentPlayerStore = useCurrentPlayer();

  const methods = useLobbyPageModel({
    createGameService,
    joinGameService,
    currentPlayerStore,
  });

  return <LobbyPageView {...methods} />;
}
