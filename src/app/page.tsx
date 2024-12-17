"use client";
import Table from "@/components/Table/Table";
import { usersColumns } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import { Suspense, useContext } from "react";
import UsersSkeleton from "@/client/components/UsersSkeleton/UsersSkeleton";
import UserModal from "@/client/components/UserModal/UserModal";
import { ButtonProps } from "primereact/button";
import { useForm } from "react-hook-form";
import { UserInputs } from "@/client/components/UserModal/interfaces";
import { QUERY_KEYS } from "@/api/constants/apiEndpoints";
import { AppContext } from "@/context";
import { AppContextInterface, UserData } from "@/interfaces";
import { modalTypes } from "@/client/constants";

export default function Home() {
  const { modal, pagination } = useContext(AppContext) as AppContextInterface;

  const { data, isPending, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.USERS, pagination.currentPage, pagination.rowsPerPage],
    queryFn: () => getUsers(pagination.currentPage, pagination.rowsPerPage),
  });

  const form = useForm<UserInputs>();

  const usersActionButtons: ButtonProps[] = [
    {
      onClick: () => {
        form.reset({});
        modal.setIsVisible(true);
        modal.setModalType(modalTypes.ADD);
      },
      label: "Nuevo Usuario",
      className: "font-semibold flex gap-2",
      icon: "pi pi-plus",
      size: "small",
    },
  ];

  if (isPending || isFetching) return <UsersSkeleton />;

  return (
    <>
      <Suspense fallback={<UsersSkeleton />}>
        <Table<UserData>
          title="Usuarios"
          data={data?.users || []}
          totalRecords={data?.totalItems || 0}
          columns={usersColumns}
          actionButtons={usersActionButtons}
        />
      </Suspense>

      <UserModal form={form} />
    </>
  );
}
