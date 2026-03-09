import { v4 as uuid } from "uuid";
import { logger } from "@danielg.favero/websocket-chess-package";

import { IGameRoom } from "@interfaces/game-room";
import { IPosition } from "@interfaces/position";

import { Game } from "@game/game";
import { GameRoom } from "@game/game-room";
import { Player } from "@game/player";

class GameRoomOrchestrator {
  private gameRooms: Map<string, IGameRoom> = new Map();

  create(): IGameRoom {
    const gameId = uuid();
    const game = new Game();
    const gameRoom = new GameRoom(gameId, game);

    this.gameRooms.set(gameId, gameRoom);
    logger.log(`ORCHESTRATOR: Game room created: ${gameId}`);

    return gameRoom;
  }

  join(gameId: string, playerId: string): IGameRoom | null {
    const room = this.get(gameId);

    if (!room) return null;
    if (room.isFull()) return null;
    if (this.isJoined(gameId, playerId)) return room;

    const newPlayer = new Player(playerId);
    room.addPlayer(newPlayer);

    this.update(gameId, room);
    logger.log(`ORCHESTRATOR: Player ${playerId} joined game room ${gameId}`);

    return room;
  }

  isJoined(gameId: string, playerId: string): IGameRoom | null {
    const room = this.get(gameId);

    if (!room) return null;

    const player = room.getPlayer(playerId);

    if (!player) return null;

    logger.log(
      `ORCHESTRATOR: Player ${playerId} is already joined in game room ${gameId}`,
    );

    return player.id === playerId ? room : null;
  }

  move(gameId: string, from: IPosition, to: IPosition): IGameRoom | null {
    const room = this.get(gameId);

    if (!room) return null;

    const game = room.getGame();
    game.move(from, to);

    this.update(gameId, room);

    logger.log(
      `ORCHESTRATOR: Piece moved from ${from.x},${from.y} to ${to.x},${to.y} in game room ${gameId}`,
    );

    return room;
  }

  private get(gameId: string): IGameRoom | undefined {
    return this.gameRooms.get(gameId);
  }

  private update(gameId: string, gameRoom: IGameRoom): void {
    this.gameRooms.set(gameId, gameRoom);
  }
}

export const gameRoomOrchestrator = new GameRoomOrchestrator();
