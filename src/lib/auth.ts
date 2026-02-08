import { AUTH_CREDENTIALS } from "../constants/auth";

export function validateCredentials(username: string, password: string): boolean {
  return (
    username === AUTH_CREDENTIALS.username &&
    password === AUTH_CREDENTIALS.password
  );
}
