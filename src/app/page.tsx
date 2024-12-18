import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import UsersPage from "@/client/pages/UsersPage/UsersPage";
import { Suspense } from "react";
import UsersSkeleton from "@/client/components/UsersSkeleton/UsersSkeleton";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 25 * 1000, // 25 segundos para considerar la data anticuada
      },
    },
  });
  // Fetch data en el servidor y cargarla en el cache de React Query
  await queryClient.prefetchQuery({
    queryKey: ["users", 1, 10, {}], // Página 1, 10 registros por defecto
    queryFn: () => getUsers(1, 10, { user: "", status: 0 }), // Llamada inicial
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<UsersSkeleton />}>
        <UsersPage />
      </Suspense>
    </HydrationBoundary>
  );
}
