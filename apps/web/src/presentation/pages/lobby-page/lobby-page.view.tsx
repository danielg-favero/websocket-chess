import { Button } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { FieldGroup } from "@components/ui/field";

import type { IUseLobbyPageModel } from "./lobby-page.model";

export default function LobbyPageView(methods: IUseLobbyPageModel) {
  const {
    isCreatingGame,
    isJoiningGame,
    newGameForm,
    joinGameForm,
    isConnected,
  } = methods;

  return (
    <div className="flex min-h-screen w-screen items-center justify-center p-4">
      <Card className="w-full max-w-100">
        <CardHeader>
          <CardTitle>Chess with Websocket</CardTitle>
          <CardDescription>
            Create a new game or join an existing game and play with your
            friends
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="account">Create new game</TabsTrigger>
              <TabsTrigger value="password">Join game</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  newGameForm.handleSubmit();
                }}
              >
                <FieldGroup>
                  <newGameForm.AppField
                    name="nickname"
                    children={(field) => (
                      <field.Input
                        placeholder="Type your nickname"
                        disabled={!isConnected}
                      />
                    )}
                  />
                  <Button
                    variant="default"
                    size="lg"
                    disabled={isCreatingGame || !isConnected}
                    type="submit"
                    className="w-full"
                  >
                    {isCreatingGame && <Spinner />}
                    Create new game
                  </Button>
                </FieldGroup>
              </form>
            </TabsContent>
            <TabsContent value="password" className="mt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  joinGameForm.handleSubmit();
                }}
              >
                <FieldGroup>
                  <joinGameForm.AppField
                    name="nickname"
                    children={(field) => (
                      <field.Input
                        placeholder="Type your nickname"
                        disabled={!isConnected}
                      />
                    )}
                  />
                  <FieldGroup className="flex justify-between items-center gap-2">
                    <joinGameForm.AppField
                      name="gameRoomId"
                      children={(field) => (
                        <field.Input
                          placeholder="Type the game code"
                          disabled={!isConnected}
                        />
                      )}
                    />
                    <Button
                      variant="default"
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isJoiningGame || !isConnected}
                    >
                      {isJoiningGame && <Spinner />}
                      Join game
                    </Button>
                  </FieldGroup>
                </FieldGroup>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
