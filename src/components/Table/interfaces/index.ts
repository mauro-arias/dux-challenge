import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";

export interface TableProps {
  title: string;
  columns: ColumnProps[];
  data: any[];
  rowsPerPage?: number;
  actionButtons?: ButtonProps[];
}
