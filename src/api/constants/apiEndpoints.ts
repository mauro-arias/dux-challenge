export const usersApi = `${process.env.API_BASE_URL}/api/personal?sector=${process.env.SECTOR_CODE}`;

export enum QUERY_KEYS {
  USERS = "users",
  ADDED_USER = "addedUser",
}
