import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { TableProps } from "./interfaces";
import Title from "../Title/Title";
import { Button } from "primereact/button";

const Table = ({ title, data, columns }: TableProps) => {
  return (
    <>
      <div className="flex justify-content-between">
        <Title text={title} />
        <Button>Nuevo Usuario</Button>
      </div>
      <DataTable value={data}>
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
