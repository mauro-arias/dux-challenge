"use server";

import { UserData } from "@/interfaces";
import { usersApi } from "./constants/apiEndpoints";

export const getUsers = async () => {
  const data = await fetch(usersApi);
  const users = await data.json();

  return users;
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
