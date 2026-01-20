export type TaskStatus = "PENDING" | "COMPLETED";
export type TaskFilter = "ALL" | "PENDING" | "COMPLETED";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};
