import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { TableProps } from "./interfaces";
import Title from "../Title/Title";
import TableToolbar from "@/client/components/TableToolbar/TableToolbar";

const Table = ({ title, data, columns, actionButtons }: TableProps) => {
  return (
    <>
      <div className="flex justify-content-between">
        <Title text={title} />
        <TableToolbar actionButtons={actionButtons} />
      </div>
      <DataTable value={data} paginator rows={5}>
        {columns.map((column, index) => (
          <Column
            key={index}
            field={column.field}
            header={column.header}
            sortable={column.sortable}
            style={{ width: column?.style?.width }}
          ></Column>
        ))}
      </DataTable>
    </>
  );
};

export default Table;
