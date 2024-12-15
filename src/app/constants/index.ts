import { ColumnProps } from "primereact/column";

export const usersColumns: ColumnProps[] = [
  {
    field: "code",
    header: "Código",
    sortable: true,
    style: { width: "25%" },
  },
  {
    field: "category",
    header: "Categoría",
    sortable: true,
    style: { width: "25%" },
  },
  {
    field: "name",
    header: "Nombre",
    sortable: true,
    style: { width: "25%" },
  },
  {
    field: "quantity",
    header: "Cantidad",
    sortable: true,
    style: { width: "25%" },
  },
];
