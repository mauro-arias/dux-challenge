"use client";
import { ButtonProps } from "primereact/button";

export const usersActionButtons: ButtonProps[] = [
  {
    onClick: () => {
      console.log("Add");
    },
    label: "Nuevo Usuario",
    className: "font-semibold flex gap-2",
    icon: "pi pi-plus",
    size: "small",
  },
];

export enum sessionStorageKeys {
  SELECTED_USER = "selectedUser",
  MODAL_TYPE = "modalType",
}

export enum modalTypes {
  ADD = "add",
  EDIT = "edit",
}
