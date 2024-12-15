import { modalTypes, sessionStorageKeys } from "@/client/constants";
import useSessionStorage from "@/client/hooks/useSessionStorage";
import { ColumnProps } from "primereact/column";

const UserCellCustomStyle = (rowData) => {
  const setSelectedUser = useSessionStorage(sessionStorageKeys.SELECTED_USER, [])[1];
  const setModalType = useSessionStorage(
    sessionStorageKeys.MODAL_TYPE,
    modalTypes.ADD
  )[1];

  const onSelectUser = () => {
    setSelectedUser(rowData);
    setModalType(modalTypes.EDIT);
  };

  return (
    <div
      className="underline text-blue-600 font-semibold cursor-pointer"
      onClick={onSelectUser}
    >
      {rowData.usuario}
    </div>
  );
};

export const usersColumns: ColumnProps[] = [
  {
    field: "id",
    header: "id",
    sortable: true,
    style: { width: "25%" },
  },
  {
    field: "usuario",
    header: "Usuario",
    sortable: true,
    body: UserCellCustomStyle,
  },
  {
    field: "estado",
    header: "Estado",
    sortable: true,
    style: { width: "25%" },
  },
  {
    field: "sector",
    header: "Sector",
    sortable: true,
    style: { width: "25%" },
  },
];
