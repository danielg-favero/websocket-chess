import Button from "@components/button";

import type { IUseLobbyPageModel } from "./lobby-page.model";

export default function LobbyPageView(methods: IUseLobbyPageModel) {
  const { createGame, isCreatingGame } = methods;

  return (
    <Button
      onClick={() => createGame()}
      variant="secondary"
      isLoading={isCreatingGame}
    >
      Create new game
    </Button>
  );
}
