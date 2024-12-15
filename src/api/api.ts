"use server";

import { usersApi } from "./constants/apiEndpoints";

export const getUsers = async () => {
  const data = await fetch(usersApi);
  const users = await data.json();

  return users;
};
