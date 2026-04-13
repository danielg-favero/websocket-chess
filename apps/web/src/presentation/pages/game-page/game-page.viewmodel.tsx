import { useParams } from "react-router-dom";

import { JoinGameRoomService } from "@data/services/join-game-room-service";
import { StartGameService } from "@data/services/start-game-service";
import { MovePieceService } from "@data/services/move-piece-service";
import { CapturePieceService } from "@data/services/capture-piece-service";

import { socketClient } from "@infra/socket/instance";

import { useGame } from "@presentation/stores/game-store";
import { useGameRoom } from "@presentation/stores/game-room-store";
import { useCurrentPlayer } from "@presentation/stores/current-player.store";

import { useGamePageModel } from "./game-page.model";
import GamePageView from "./game-page.view";

const joinGameRoomService = new JoinGameRoomService(socketClient);
const startGameService = new StartGameService(socketClient);
const movePieceService = new MovePieceService(socketClient);
const capturePieceService = new CapturePieceService(socketClient);

export default function GamePageViewModel() {
  const { gameRoomId } = useParams();

  const gameStore = useGame();
  const gameRoomStore = useGameRoom();
  const currentPlayerStore = useCurrentPlayer();

  const methods = useGamePageModel({
    gameRoomId: gameRoomId!,
    gameStore,
    gameRoomStore,
    currentPlayerStore,
    socketClient,
    joinGameRoomService,
    startGameService,
    movePieceService,
    capturePieceService,
  });

  return <GamePageView {...methods} />;
}
