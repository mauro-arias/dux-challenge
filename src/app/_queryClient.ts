import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 25 * 1000, // 25 segundos para considerar la data anticuada y realizar un refetch
      // gcTime: Infinity,
      // refetchOnMount: true,
      retry: false,
    },
    mutations: {
      gcTime: Infinity,
    },
  },
});
