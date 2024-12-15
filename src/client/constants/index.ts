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
