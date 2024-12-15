import { ColumnProps } from "primereact/column";

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
    style: { width: "25%" },
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
