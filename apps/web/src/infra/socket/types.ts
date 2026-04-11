import type {
  TClientEvents,
  TServerEvents,
  GenericEventTransaction,
} from "@websocket-chess/shared";

export interface ISocketClient {
  clientId: string | null;

  connect(): void;
  disconnect(): void;
  isConnected(): boolean;

  send<T extends TClientEvents>(message: GenericEventTransaction<T>): void;

  on(
    event: string,
    handler: (data: GenericEventTransaction<TServerEvents>) => void,
  ): void;
  off(
    event: string,
    handler: (data: GenericEventTransaction<TServerEvents>) => void,
  ): void;

  onConnect(handler: VoidFunction): void;
  onConnectError(handler: (error: Error) => void): void;
  onDisconnect(handler: VoidFunction): void;

  offConnect(handler: VoidFunction): void;
  offConnectError(handler: (error: Error) => void): void;
  offDisconnect(handler: VoidFunction): void;
}
