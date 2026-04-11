import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@components/ui/sonner";

import { useSocketConnection } from "@hooks/use-socket-connection";

import { socketClient } from "@infra/socket/instance";

import { toast } from "@lib/toast";

import AppRouter from "@presentation/routes/app-router";
import { useCurrentPlayer } from "@presentation/stores/current-player.store";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        toast.error(error.message);
      },
    },
  },
});

function App() {
  const currentPlayerStore = useCurrentPlayer();

  useSocketConnection({
    socketClient,
    currentPlayerStore,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
