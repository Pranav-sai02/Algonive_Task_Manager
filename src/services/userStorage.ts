import type { User } from "../types/User";


/**
 * Internal storage key
 */
const USERS_KEY = "tm_users_v1";

/**
 * Generate Algonive-style user ID
 * Example: ALG-U-582391
 */
function makeUserId(): string {
  const random = Math.floor(100000 + Math.random() * 900000); 
  return `ALG-U-${random}`;
}


export function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as User[]) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


export function ensureSeedUsers() {
  const existing = loadUsers();
  if (existing.length > 0) return;

  const seeded: User[] = [
    {
      id: makeUserId(),
      name: "Pranav",
      email: "pranav@test.com",
      password: "123456",
    },
    {
      id: makeUserId(),
      name: "Teammate",
      email: "team@test.com",
      password: "123456",
    },
  ];

  saveUsers(seeded);
}


export function findUserByEmail(email: string): User | undefined {
  const users = loadUsers();
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}


export function createUser(
  name: string,
  email: string,
  password: string
): User {
  const users = loadUsers();

  const user: User = {
    id: makeUserId(),
    name,
    email,
    password,
  };

  users.push(user);
  saveUsers(users);
  return user;
}
