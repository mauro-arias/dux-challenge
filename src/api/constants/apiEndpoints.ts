import { SECTOR } from "@/app/constants";

export const usersApi = `${process.env.API_BASE_URL}/api/personal`;
export const sectorUrlParam = `?sector=${SECTOR}`;

export enum QUERY_KEYS {
  USERS = "users",
  ADDED_USER = "addedUser",
  DELETED_USER = "deletedUser",
  UPDATED_USER = "updatedUser",
}
