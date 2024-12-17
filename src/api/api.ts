"use server";

import { UserData } from "@/interfaces";
import { sectorUrlParam, usersApi } from "./constants/apiEndpoints";

export const getUsers = async (page: number, limit: number) => {
  try {
    const res = await fetch(`${usersApi}${sectorUrlParam}&_page=${page}&_limit=${limit}`);

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

    // const users: UserData[] = await res.json();
    // return users;
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
