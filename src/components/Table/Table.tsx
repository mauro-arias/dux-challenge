"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext } from "react";
import { TableProps } from "./interfaces";
import Title from "../Title/Title";
import TableToolbar from "@/client/components/TableToolbar/TableToolbar";
import { AppContext } from "@/context";
import { AppContextInterface } from "@/interfaces";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

const Table = <TData extends object>({
  title,
  data,
  columns,
  actionButtons,
  totalRecords,
  emptyMessage,
  filtersComponent,
  ...rest
}: TableProps<TData>) => {
  const { pagination } = useContext(AppContext) as AppContextInterface;
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    pagination.setCurrentPage(event.page + 1); // PrimeReact usa base 0
    pagination.setRowsPerPage(event.rows);
  };

  return (
    <>
      <div className="flex justify-content-between my-2">
        <Title text={title} />
        <TableToolbar actionButtons={actionButtons} />
      </div>
      <div className="flex justify-content-end">
        {filtersComponent && <>{filtersComponent}</>}
      </div>
      <DataTable
        emptyMessage={emptyMessage ?? "No se encontraron datos."}
        scrollable
        scrollHeight="350px"
        value={data}
        dataKey="id"
        {...rest}
      >
        {columns.map((column, index) => (
          <Column key={index} {...column} />
        ))}
      </DataTable>
      <Paginator
        first={(pagination.currentPage - 1) * pagination.rowsPerPage}
        rows={pagination.rowsPerPage}
        totalRecords={totalRecords}
        rowsPerPageOptions={pagination.rowsPerPageOptions}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown "
      />
    </>
  );
};

export default Table;
