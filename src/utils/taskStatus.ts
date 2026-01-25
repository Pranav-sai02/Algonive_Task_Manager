import type { Task } from "../types/task";

export type TaskVisualStatus = "COMPLETED" | "PENDING" | "OVERDUE";

export function getTaskVisualStatus(task: Task): TaskVisualStatus {
  if (task.status === "COMPLETED") return "COMPLETED";

  const today = new Date();
  const due = new Date(task.dueDate);

  if (due < today) return "OVERDUE";

  return "PENDING";
}
