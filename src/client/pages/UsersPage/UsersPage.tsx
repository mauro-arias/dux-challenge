"use client";
import { ButtonProps } from "primereact/button";
import { useForm } from "react-hook-form";
import { UserInputs } from "@/client/components/UserModal/interfaces";
import { QUERY_KEYS } from "@/api/constants/apiEndpoints";
import { AppContext } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContextInterface, UserData } from "@/interfaces";
import { modalTypes } from "@/client/constants";
import UserModal from "@/client/components/UserModal/UserModal";
import Table from "@/components/Table/Table";
import { usersColumns } from "../../../app/constants";

import UserTableFilters from "@/client/components/UserTableFilters/UserTableFilters";
import { getUsers } from "@/api/api";
import UsersSkeleton from "@/client/components/UsersSkeleton/UsersSkeleton";

const UsersPage = () => {
  const { modal, pagination, filters } = useContext(AppContext) as AppContextInterface;

  const { data, isFetching, isLoading } = useQuery({
    staleTime: 5000,
    queryKey: [
      QUERY_KEYS.USERS,
      pagination.currentPage,
      pagination.rowsPerPage,
      filters.values,
    ],
    queryFn: () =>
      getUsers(pagination.currentPage, pagination.rowsPerPage, filters.values),
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
      className: "font-semibold flex gap-2 w-11rem",
      icon: "pi pi-plus",
      size: "small",
    },
  ];

  if (isLoading || isFetching) return <UsersSkeleton />;

  return (
    <>
      <Table<UserData>
        title="Usuarios"
        filtersComponent={<UserTableFilters />}
        emptyMessage="No se encontraron usuarios."
        data={data?.users || []}
        totalRecords={data?.totalItems || 0}
        columns={usersColumns}
        actionButtons={usersActionButtons}
      />

      <UserModal form={form} />
    </>
  );
};

export default UsersPage;
