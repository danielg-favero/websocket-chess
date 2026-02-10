import { useEffect, useState } from "react";

import { socket } from "@api/socket";
import type { MessageDTO } from "@config/messages";

export function useWebsocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState<MessageDTO | null>(null);

  function connect() {
    socket.connect();
  }

  function onConnect() {
    setIsConnected(true);
  }

  function disconnect() {
    socket.disconnect();
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  function sendMessage(data: MessageDTO) {
    socket.emit("message", JSON.stringify(data));
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", (data) => {
      setMessage(JSON.parse(data));
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message");
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
