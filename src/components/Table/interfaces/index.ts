import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";

export interface TableProps<TData> {
  title: string;
  columns: ColumnProps[];
  data: TData[];
  totalRecords: number;
  emptyMessage?: string;
  actionButtons?: ButtonProps[];
}
