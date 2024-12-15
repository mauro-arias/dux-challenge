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

export default function Home() {
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [modalVisible, setModalVisible] = useSessionStorage(
    sessionStorageKeys.MODAL_VISIBLE,
    false
  );

  const handleHideModal = () => setModalVisible(false);

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

      <UserModal isVisible={modalVisible} handleHideModal={handleHideModal} />
    </>
  );
}
