"use client";
import Table from "@/components/Table/Table";
import { usersColumns } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import { Suspense } from "react";
import UsersSkeleton from "@/client/components/UsersSkeleton/UsersSkeleton";
import UserModal from "@/client/components/UserModal/UserModal";
import { ButtonProps } from "primereact/button";
import useSessionStorage from "@/client/hooks/useSessionStorage";
import { sessionStorageKeys } from "@/client/constants";
import { useForm } from "react-hook-form";
import { UserInputs } from "@/client/components/UserModal/interfaces";
import { QUERY_KEYS } from "@/api/constants/apiEndpoints";

export default function Home() {
  const [modalVisible, setModalVisible] = useSessionStorage(
    sessionStorageKeys.MODAL_VISIBLE,
    false
  );

  const { data, isPending, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getUsers,
  });

  const form = useForm<UserInputs>();

  const handleHideModal = () => {
    form.reset();
    setModalVisible(false);
  };

  const usersActionButtons: ButtonProps[] = [
    {
      onClick: () => {
        setModalVisible(true);
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
        <Table
          title="Usuarios"
          data={data}
          rowsPerPage={5}
          columns={usersColumns}
          actionButtons={usersActionButtons}
        />
      </Suspense>

      <UserModal form={form} isVisible={modalVisible} handleHideModal={handleHideModal} />
    </>
  );
}
