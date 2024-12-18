import { AppContext } from "@/context";
import { AppContextInterface } from "@/interfaces";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useContext, useState } from "react";

const UserTableFilters = () => {
  const { filters } = useContext(AppContext) as AppContextInterface;

  // Estado local de los filtros
  const [userLocalFilter, setUserLocalFilter] = useState(filters.values.user || "");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLocalFilter(e.target.value);
  };

  const handleStatusChange = (e: DropdownChangeEvent) => {
    filters.setFilters((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleApplyFilters = () => {
    filters.setFilters((prev) => ({ ...prev, user: userLocalFilter }));
  };

  const handleClearFliters = () => {
    filters.setFilters({ user: "", status: 0 });
  };

  const statusOptions = [
    { label: "Todos los estados", value: 0 },
    { label: "Activo", value: "ACTIVO" },
    { label: "Inactivo", value: "INACTIVO" },
  ];

  return (
    <div className="flex gap-4 mb-4 sm:flex-row flex-column">
      <InputText
        value={userLocalFilter}
        type="text"
        placeholder="Filtrar por usuario"
        name="name"
        onChange={handleFilterChange}
        onBlur={handleApplyFilters}
        className="input-field"
      />
      <Dropdown
        value={filters.values.status}
        name="status"
        defaultValue={statusOptions[0].value}
        options={statusOptions}
        onChange={handleStatusChange}
        className="select-field"
      />
      <Button
        icon="pi pi-filter-slash"
        onClick={handleClearFliters}
        disabled={!filters.values.user && filters.values.status === 0}
        className="p-button-outlined"
        tooltip="Borrar filtros"
        tooltipOptions={{ position: "bottom" }}
      />
    </div>
  );
};

export default UserTableFilters;
