import { AppContext } from "@/context";
import { AppContextInterface } from "@/interfaces";
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

  const statusOptions = [
    { label: "Todos los estados", value: 0 },
    { label: "Activo", value: "ACTIVO" },
    { label: "Inactivo", value: "INACTIVO" },
  ];

  return (
    <div className="flex gap-4 mb-4">
      <InputText
        value={userLocalFilter}
        type="text"
        placeholder="Filtrar por nombre o apellido"
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
      ></Dropdown>
    </div>
  );
};

export default UserTableFilters;
