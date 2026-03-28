import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_HTTP_SERVER_URL, {
  autoConnect: false,
  path: "/sockets",
});
