import { PORT } from "@config/env";
import { handleConnection } from "@websocket/connection";
import { serve } from "@websocket/server";

import { CreateGameHandler } from "@handlers/create-game";

const { io, app } = serve(PORT);

io.on("connection", handleConnection);

app.post("/game", (req, res) => {
  const handler = new CreateGameHandler();
  const game = handler.handle();

  res.json(game);
});
