import { Card, CardContent } from "@components/ui/card";
import type { TGameRoomStatus } from "@websocket-chess/shared";

const GAME_ROOM_STATUS_MESSAGES: Partial<Record<TGameRoomStatus, string>> = {
  WAITING_OPPONENT: "Waiting for opponent...",
  WAITING_GAME_START: "Waiting game start...",
};

function GameRoomStatusBlockScreen({ status }: { status: TGameRoomStatus }) {
  const message = GAME_ROOM_STATUS_MESSAGES[status];

  if (!message) return null;

  return (
    <>
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center">
        <CardContent>
          <h1 className="text-lg">{message}</h1>
        </CardContent>
      </Card>
      <div className="pointer-events-none absolute top-0 left-0 z-30 h-screen w-screen bg-white opacity-50 blur-2xl"></div>
    </>
  );
}

export default GameRoomStatusBlockScreen;
