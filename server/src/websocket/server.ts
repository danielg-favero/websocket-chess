import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

export function serve(port: number) {
  const app = express();
  app.use(json());
  app.use(cors());

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  httpServer.listen(port, () => {
    console.log(`Chess server running on port ${port}`);
  });

  return { io, app };
}
