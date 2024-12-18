import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import UsersPage from "@/client/pages/UsersPage/UsersPage";
import { queryClient } from "./_queryClient";

export default async function Home() {
  // Fetch data en el servidor y cargarla en el cache de React Query
  await queryClient.prefetchQuery({
    queryKey: ["users", 1, 10, {}], // Página 1, 10 registros por defecto
    queryFn: () => getUsers(1, 10, { user: "", status: 0 }), // Llamada inicial
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersPage />
      </HydrationBoundary>
    </>
  );
}
