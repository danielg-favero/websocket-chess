import { useEffect } from "react";

import type { ISocketClient } from "@infra/socket/types";

import { toast } from "@lib/toast";

import type { ICurrentPlayerStore } from "@presentation/stores/current-player.store";

interface IUseSocketConnectionParams {
  socketClient: ISocketClient;
  currentPlayerStore: ICurrentPlayerStore;
}

export const useSocketConnection = ({
  socketClient,
  currentPlayerStore,
}: IUseSocketConnectionParams) => {
  useEffect(() => {
    socketClient.connect();

    socketClient.onConnect(() => {
      currentPlayerStore.setId(socketClient.clientId!);
    });

    socketClient.onConnectError((error) => {
      toast.error(error.message);
    });

    socketClient.onDisconnect(() => {
      currentPlayerStore.setId(null);
    });

    return () => {
      socketClient.disconnect();
    };
  }, []);
};
