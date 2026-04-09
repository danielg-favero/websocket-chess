import { Distance } from "@websocket-chess/shared";
import { Position } from "../objects/position.object";

export function calculateDistance(from: Position, to: Position): Distance {
  const dx = Math.abs(from.x - to.x);
  const dy = Math.abs(from.y - to.y);

  return { dx, dy };
}
