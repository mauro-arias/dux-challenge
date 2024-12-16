"use server";

import { UserData } from "@/interfaces";
import { usersApi } from "./constants/apiEndpoints";

export const getUsers = async () => {
  try {
    // const res = await fetch(usersApi);

    // if (!res.ok) {
    //   throw new Error(
    //     `Error ${res.status}: ${res.statusText || "Error al obtener usuarios"}`
    //   );
    // }

    // const users: UserData[] = await res.json();
    // return users;
    return [
      {
        id: "1",
        usuario: "Fernando",
        estado: "Activo",
        sector: 9000,
      },
      {
        id: "2",
        usuario: "Maria",
        estado: "Inactivo",
        sector: 9000,
      },
    ];
  } catch (e) {
    console.error(e);
    throw new Error("No se pudo conectar al servidor. Por favor, intenta más tarde.");
  }
};

export const addUser = async (data: UserData) => {
  const res = await fetch(usersApi, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
