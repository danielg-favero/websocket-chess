import { v4 as uuid } from "uuid";
import { logger } from "@danielg.favero/websocket-chess-package";

import { IGameRoom } from "@interfaces/game-room";
import { IPosition } from "@interfaces/position";
import { IPlayer } from "@interfaces/player";

import { Game } from "@game/game";
import { GameRoom } from "@game/game-room";
import { Player } from "@game/player";

class GameRoomOrchestrator {
  private gameRooms: Map<string, IGameRoom> = new Map();

  create(): IGameRoom {
    const gameId = uuid();
    const game = new Game();
    const gameRoom = new GameRoom(gameId, game);

    logger.log(`ORCHESTRATOR: Game room created: ${gameId}`);
    return this.update(gameId, gameRoom);
  }

  join(
    roomId: string,
    playerId: string,
  ): { gameRoom: IGameRoom | null; player: IPlayer | null } {
    const room = this.get(roomId);

    if (!room) return { gameRoom: null, player: null };
    if (room.isFull()) return { gameRoom: null, player: null };
    if (this.isJoined(roomId, playerId))
      return { gameRoom: null, player: null };

    const newPlayer = new Player(playerId);
    room.addPlayer(newPlayer);

    logger.log(`ORCHESTRATOR: Player ${playerId} joined game room ${roomId}`);
    return { gameRoom: this.update(roomId, room), player: newPlayer };
  }

  isJoined(roomId: string, playerId: string): boolean {
    const room = this.get(roomId);

    if (!room) return false;

    const player = room.getPlayer(playerId);
    if (player) return true;

    return false;
  }

  move(
    roomId: string,
    playerId: string,
    from: IPosition,
    to: IPosition,
  ): IGameRoom | null {
    const room = this.get(roomId);

    if (!room) return null;
    if (!this.isJoined(roomId, playerId)) return null;

    const game = room.getGame();
    game.move(from, to);

    logger.log(
      `ORCHESTRATOR: Piece moved from (${from.x},${from.y}) to (${to.x},${to.y}) in game room ${roomId}`,
    );
    return this.update(roomId, room);
  }

  capture(
    roomId: string,
    playerId: string,
    from: IPosition,
    to: IPosition,
  ): IGameRoom | null {
    const room = this.get(roomId);

    if (!room) return null;
    if (!this.isJoined(roomId, playerId)) return null;

    const game = room.getGame();
    game.capture(from, to);

    logger.log(
      `ORCHESTRATOR: Piece captured from (${from.x},${from.y}) to (${to.x},${to.y}) in game room ${roomId}`,
    );
    return this.update(roomId, room);
  }

  get(roomId: string): IGameRoom | undefined {
    return this.gameRooms.get(roomId);
  }

  private update(roomId: string, gameRoom: IGameRoom) {
    this.gameRooms.set(roomId, gameRoom);
    return gameRoom;
  }
}

export const gameRoomOrchestrator = new GameRoomOrchestrator();
