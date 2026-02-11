export type Result<S, E extends { reason: string }> = [null, S] | [E, null];

export function ok<S>(data: S): Result<S, never> {
  return [null, data];
}

export function error<E extends { reason: string }>(
  error: E,
): Result<never, E> {
  return [error, null];
}
