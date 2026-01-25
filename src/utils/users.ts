import { loadUsers } from "../services/userStorage";

export function getUserNameById(userId: string): string {
  if (!userId) return "Unknown";
  if (userId === "LEGACY") return "Unknown";

  const users = loadUsers();
  const u = users.find((x) => x.id === userId);
  return u ? u.name : "Unknown";
}
