"use server";

import { UserData } from "@/interfaces";
import { sectorUrlParam, usersApi } from "./constants/apiEndpoints";

export const getUsers = async () => {
  try {
    const res = await fetch(`${usersApi}${sectorUrlParam}`);

    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText || "Error al obtener usuarios"}`
      );
    }

    const users: UserData[] = await res.json();
    return users;
  } catch (e) {
    console.error(e);
    throw new Error("No se pudo conectar al servidor. Por favor, intenta más tarde.");
  }
};

export const addUser = async (data: UserData) => {
  const res = await fetch(`${usersApi}${sectorUrlParam}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${usersApi}/${id}${sectorUrlParam}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
