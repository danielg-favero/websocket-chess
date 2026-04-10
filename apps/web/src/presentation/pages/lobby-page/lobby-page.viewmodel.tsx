import { CreateGameRoomService } from "@data/services/create-game-service";

import { HTTPClient } from "@infra/http/client";
import { SocketClient } from "@infra/socket/client";

import { useLobbyPageModel } from "./lobby-page.model";
import LobbyPageView from "./lobby-page.view";
import { useCurrentPlayer } from "@presentation/stores/current-player.store";

const httpClient = new HTTPClient();
const createGameService = new CreateGameRoomService(httpClient);

const socketClient = new SocketClient();

export default function LobbyPageViewModel() {
  const currentPlayerStore = useCurrentPlayer();
  const methods = useLobbyPageModel({
    createGameService,
    socketClient,
    currentPlayerStore,
  });

  return <LobbyPageView {...methods} />;
}
