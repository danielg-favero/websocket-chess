import { Distance } from "@websocket-chess/shared";
import { IPosition } from "@interfaces/position";

export function calculateDistance(from: IPosition, to: IPosition): Distance {
  const dx = Math.abs(from.x - to.x);
  const dy = Math.abs(from.y - to.y);

  return { dx, dy };
}
