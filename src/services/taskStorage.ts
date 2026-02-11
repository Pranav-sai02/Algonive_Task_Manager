import type { Task } from "../types/task";

const KEY = "algonive_task_manager_v1";


export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];

    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];

    return data.map((t: any) => migrateTask(t));
  } catch {
    return [];
  }
}


export function saveTasks(tasks: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}


function migrateTask(t: any): Task {
  const now = new Date().toISOString();

  return {
    id: t.id,
    title: t.title ?? "",
    description: t.description ?? "",
    dueDate: t.dueDate ?? now.slice(0, 10),

    // ✅ Status migration
    status:
      t.status === "COMPLETED" ||
      t.status === "IN_PROGRESS" ||
      t.status === "PENDING"
        ? t.status
        : "PENDING",

    // ✅ Ownership migration
    createdBy: t.createdBy ?? "LEGACY",
    assignedTo: t.assignedTo ?? t.createdBy ?? "LEGACY",

    createdAt: t.createdAt ?? now,
    updatedAt: t.updatedAt ?? now,
  };
}
