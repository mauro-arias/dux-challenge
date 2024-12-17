"use client";
import Table from "@/components/Table/Table";
import { usersColumns } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import { Suspense, useContext, useState } from "react";
import UsersSkeleton from "@/client/components/UsersSkeleton/UsersSkeleton";
import UserModal from "@/client/components/UserModal/UserModal";
import { ButtonProps } from "primereact/button";
import { useForm } from "react-hook-form";
import { UserInputs } from "@/client/components/UserModal/interfaces";
import { QUERY_KEYS } from "@/api/constants/apiEndpoints";
import { AppContext } from "@/context";
import { AppContextInterface, UserData } from "@/interfaces";
import { modalTypes } from "@/client/constants";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

export default function Home() {
  const { modal, pagination, filters } = useContext(AppContext) as AppContextInterface;

  const [filtersLocalState, setFiltersLocalState] = useState({ user: "", status: "" });

  const { data, isPending, isFetching } = useQuery({
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
      className: "font-semibold flex gap-2",
      icon: "pi pi-plus",
      size: "small",
    },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltersLocalState((prev) => ({ ...prev, user: e.target.value }));
  };

  const handleStatusChange = (e: DropdownChangeEvent) => {
    filters.setFilters((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleApplyFilters = () => {
    // console.log(filtersLocalState);
    filters.setFilters((prev) => ({
      ...prev,
      user: filtersLocalState.user,
    }));
    // filters.setFilters({
    //   user: filtersLocalState.user,
    //   status: filtersLocalState.status,
    // });
  };

  if (isPending || isFetching) return <UsersSkeleton />;

  const options = [
    {
      label: "Todos los estados",
      value: 0,
    },
    {
      label: "Activo",
      value: "ACTIVO",
    },
    {
      label: "Inactivo",
      value: "INACTIVO",
    },
  ];

  return (
    <>
      <Suspense fallback={<UsersSkeleton />}>
        <div className="flex gap-4 mb-4">
          <InputText
            value={filtersLocalState.user}
            type="text"
            placeholder="Filtrar por nombre o apellido"
            name="name"
            onChange={handleFilterChange}
            onBlur={handleApplyFilters}
            className="input-field"
          />
          <Dropdown
            value={filters.values.status}
            name="status"
            defaultValue={options[0].value}
            options={options}
            onChange={handleStatusChange}
            className="select-field"
          ></Dropdown>
          {/* <Button onClick={handleApplyFilters}>Aplicar</Button> */}
        </div>
        <Table<UserData>
          title="Usuarios"
          emptyMessage="No se encontraron usuarios."
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
