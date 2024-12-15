"use client";
import Table from "@/components/Table/Table";
import { usersColumns } from "./constants";
import { usersActionButtons } from "@/client/constants";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import { Suspense } from "react";
import UsersSkeleton from "@/client/components/UsersSkeleton/UsersSkeleton";
import FormModal from "@/client/components/FormModal/FormModal";

export default function Home() {
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isPending) return <UsersSkeleton />;

  return (
    <>
      <Suspense fallback={<UsersSkeleton />}>
        <Table
          title="Usuarios"
          data={data}
          rowsPerPage={5}
          columns={usersColumns}
          actionButtons={usersActionButtons}
        />
      </Suspense>

      {/* <FormModal /> */}
    </>
  );
}
