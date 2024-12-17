"use server";

import { FilterValues, UserData } from "@/interfaces";
import { sectorUrlParam, usersApi } from "./constants/apiEndpoints";

export const getUsers = async (page: number, limit: number, filters: FilterValues) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("_page", page.toString());
    queryParams.append("_limit", limit.toString());

    if (filters?.user) queryParams.append("usuario", filters.user);
    if (filters?.status) queryParams.append("estado", filters.status.toString());

    const res = await fetch(`${usersApi}${sectorUrlParam}&${queryParams.toString()}`);

    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText || "Error al obtener usuarios"}`
      );
    }

    const totalItems = Number(res.headers.get("X-Total-Count")); // Obtiene el total de registros
    const data = await res.json();

    return {
      users: data as UserData[],
      totalItems,
    };
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

export const updateUser = async (id: string, data: UserData) => {
  const res = await fetch(`${usersApi}/${id}${sectorUrlParam}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
