export const usersApi = `${process.env.API_BASE_URL}/api/personal`;
export const sectorUrlParam = `?sector=${process.env.SECTOR_CODE}`;

export enum QUERY_KEYS {
  USERS = "users",
  ADDED_USER = "addedUser",
  DELETED_USER = "deletedUser",
}
