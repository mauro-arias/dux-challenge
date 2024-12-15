import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { TableProps } from "./interfaces";
import Title from "../Title/Title";
import TableToolbar from "@/client/components/TableToolbar/TableToolbar";

const Table = ({
  title,
  data,
  columns,
  actionButtons,
  rowsPerPage,
  ...rest
}: TableProps) => {
  return (
    <>
      <div className="flex justify-content-between my-2">
        <Title text={title} />
        <TableToolbar actionButtons={actionButtons} />
      </div>
      <DataTable
        value={data}
        paginator={!!rowsPerPage}
        rows={rowsPerPage}
        dataKey="id"
        {...rest}
      >
        {columns.map((column, index) => (
          <Column key={index} {...column} />
        ))}
      </DataTable>
    </>
  );
};

export default Table;
