import type {
  TClientEvents,
  TServerEvents,
  GenericEventTransaction,
} from "@websocket-chess/shared";

export type SocketEventHandler<T extends TServerEvents> = (
  data: GenericEventTransaction<T>,
) => void;

export interface ISocketClient {
  clientId: string | null;

  connect(): void;
  disconnect(): void;
  isConnected(): boolean;

  send<T extends TClientEvents>(message: GenericEventTransaction<T>): void;

  on<T extends TServerEvents>(event: T, handler: SocketEventHandler<T>): void;
  off<T extends TServerEvents>(event: T, handler: SocketEventHandler<T>): void;

  onConnect(handler: VoidFunction): void;
  onDisconnect(handler: VoidFunction): void;

  offConnect(handler: VoidFunction): void;
  offDisconnect(handler: VoidFunction): void;
}
