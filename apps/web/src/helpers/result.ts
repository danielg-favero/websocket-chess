export type Result<S, E = { reason: string }> = [null, S] | [E, null];

export function ok<S>(data: S): Result<S, never> {
  return [null, data];
}

export function error<E = { reason: string }>(error: E): Result<never, E> {
  return [error, null];
}
