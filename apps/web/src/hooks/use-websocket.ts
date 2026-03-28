import {
  logger,
  type GenericMessageTransaction,
} from "@websocket-chess/shared";

import { useEffect, useState } from "react";

import { socket } from "@api/socket";

export function useWebsocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState<GenericMessageTransaction | null>(
    null,
  );

  function connect() {
    socket.connect();
  }

  function onConnect() {
    // logger.log("WS Connected");
    setIsConnected(true);
  }

  function disconnect() {
    socket.disconnect();
  }

  function onDisconnect() {
    // logger.log("WS Disconnected");
    setIsConnected(false);
  }

  function onMessage(data: string) {
    logger.log(`WS Message: ${data}`);
    setMessage(JSON.parse(data));
  }

  function sendMessage(data: GenericMessageTransaction) {
    socket.emit("message", JSON.stringify(data));
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, []);

  return {
    isConnected,
    message,
    connect,
    disconnect,
    sendMessage,
  };
}
