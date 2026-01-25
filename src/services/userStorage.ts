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
  const random = Math.floor(100000 + Math.random() * 900000); // 6 digits
  return `ALG-U-${random}`;
}

/**
 * Load all users from localStorage
 */
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

/**
 * Save users to localStorage
 */
export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Seed initial users (for testing & demo)
 * Runs only once if no users exist
 */
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

/**
 * Find user by email (case-insensitive)
 */
export function findUserByEmail(email: string): User | undefined {
  const users = loadUsers();
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

/**
 * Create a new user (Signup)
 */
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
