import { useEffect, useMemo, useState } from "react";
import type { Task, TaskFilter } from "../types/task";
import { loadTasks, saveTasks } from "../services/taskStorage";
import { isDueSoon, isOverdue } from "../utils/dates";

export type CreateTaskInput = {
  title: string;
  description: string;
  dueDate: string;
};

export function useTasks() {
  // ✅ loads once during initial state creation (does NOT wipe storage)
  const [items, setItems] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<TaskFilter>("ALL");

  // ✅ now safe — items already came from storage
  useEffect(() => {
    saveTasks(items);
  }, [items]);

  const tasks = useMemo(() => {
    const sorted = [...items].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    if (filter === "ALL") return sorted;
    return sorted.filter((t) => t.status === filter);
  }, [items, filter]);

  const counts = useMemo(() => {
    const dueSoon = items.filter((t) => t.status !== "COMPLETED" && isDueSoon(t.dueDate)).length;
    const overdue = items.filter((t) => t.status !== "COMPLETED" && isOverdue(t.dueDate)).length;
    return { dueSoon, overdue };
  }, [items]);

  function addTask(input: CreateTaskInput) {
    const now = new Date().toISOString();
    const task: Task = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description.trim(),
      dueDate: input.dueDate,
      status: "PENDING",
      createdAt: now,
      updatedAt: now,
    };
    setItems((prev) => [task, ...prev]);
  }

  function toggleTask(id: string) {
    const now = new Date().toISOString();
    setItems((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "COMPLETED" ? "PENDING" : "COMPLETED", updatedAt: now }
          : t
      )
    );
  }

  function deleteTask(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id: string, patch: Partial<Pick<Task, "title" | "description" | "dueDate">>) {
    const now = new Date().toISOString();
    setItems((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: patch.title !== undefined ? patch.title.trim() : t.title,
              description: patch.description !== undefined ? patch.description.trim() : t.description,
              dueDate: patch.dueDate !== undefined ? patch.dueDate : t.dueDate,
              updatedAt: now,
            }
          : t
      )
    );
  }

  return { tasks, filter, setFilter, counts, addTask, toggleTask, deleteTask, editTask };
}
