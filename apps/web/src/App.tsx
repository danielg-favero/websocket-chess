import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@components/ui/sonner";

import { toast } from "@lib/toast";

import AppRouter from "@presentation/routes/app-router";

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
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
