export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // mock only
};

export type SessionUser = {
  userId: string;
  name: string;
  email: string;
};
