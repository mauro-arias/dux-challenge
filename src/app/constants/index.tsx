import { modalTypes } from "@/client/constants";
import { AppContext } from "@/context";
import { AppContextInterface, UserData } from "@/interfaces";
import { ColumnProps } from "primereact/column";
import { useContext } from "react";

const UserCellCustomStyle = (rowData: UserData) => {
  const { modal, user } = useContext(AppContext) as AppContextInterface;

  const onSelectUser = () => {
    user.setUser(rowData);
    modal.setModalType(modalTypes.EDIT);
    modal.setIsVisible(true);
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
