import Board from "@components/app/board";
import { Button } from "@components/ui/button";

import type { IUseGamePageModel } from "./game-page.model";
import GameRoomStatusBlockScreen from "./components/game-room-status-block-screen";

export default function GamePageView({
  game,
  gameRoom,
  player,
  startGame,
  capturePiece,
  movePiece,
  isLoadingPlayers,
  joinedPlayers,
}: IUseGamePageModel) {
  if (!game) return null;
  if (!gameRoom) return null;
  if (!player) return null;

  const canStartGame = !!gameRoom.whitePlayerId && !!gameRoom.blackPlayerId;

  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen w-screen items-center justify-center p-4">
        <GameRoomStatusBlockScreen status={gameRoom.status} />
        {gameRoom.status === "WAITING_GAME_START" && (
          <Button
            size="lg"
            onClick={() => startGame()}
            disabled={!canStartGame}
            className="fixed z-40 bottom-5 left-1/2 -translate-x-1/2 shadow-lg"
          >
            Start Game
          </Button>
        )}
        <div className="flex flex-col gap-4 items-center justify-center">
          {!isLoadingPlayers && joinedPlayers && (
            <p className="text-sm font-bold">
              Black Pieces:{" "}
              {joinedPlayers.BLACK ? joinedPlayers.BLACK.nickname : "-"}
            </p>
          )}
          <Board
            board={game.board}
            game={game}
            player={player}
            onMove={movePiece}
            onCapture={capturePiece}
          />
          {!isLoadingPlayers && joinedPlayers && (
            <p className="text-sm font-bold">
              White Pieces:{" "}
              {joinedPlayers.WHITE ? joinedPlayers.WHITE.nickname : "-"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
