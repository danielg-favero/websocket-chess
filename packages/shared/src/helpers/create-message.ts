import {
  GenericEventTransaction,
  TClientEvents,
  TServerEvents,
} from "../messages/events";

export function createMessage<T extends TClientEvents | TServerEvents>(
  type: T,
  payload: any,
): GenericEventTransaction<T> {
  return { type, payload };
}
