import { useEffect, useMemo, useState } from "react";
import type { Task, TaskFilter, TaskStatus } from "../types/task";
import { loadTasks, saveTasks } from "../services/taskStorage";
import { isDueSoon, isOverdue } from "../utils/dates";
import { getSession } from "../services/session";

export type CreateTaskInput = {
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string; // ✅ userId
};

export function useTasks() {
  const session = getSession(); // { userId, name, email } | null
  const myId = session?.userId ?? "";

  const [items, setItems] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<TaskFilter>("ALL");

  useEffect(() => {
    saveTasks(items);
  }, [items]);

  // ✅ only tasks relevant to current user (small teams)
  const visibleItems = useMemo(() => {
    if (!myId) return [];
    return items.filter((t) => t.createdBy === myId || t.assignedTo === myId);
  }, [items, myId]);

  const tasks = useMemo(() => {
    const sorted = [...visibleItems].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    if (filter === "ALL") return sorted;
    return sorted.filter((t) => t.status === filter);
  }, [visibleItems, filter]);

  const counts = useMemo(() => {
    const dueSoon = visibleItems.filter(
      (t) => t.status !== "COMPLETED" && isDueSoon(t.dueDate)
    ).length;

    const overdue = visibleItems.filter(
      (t) => t.status !== "COMPLETED" && isOverdue(t.dueDate)
    ).length;

    return { dueSoon, overdue };
  }, [visibleItems]);

  function addTask(input: CreateTaskInput) {
    if (!myId) return;

    const now = new Date().toISOString();
    const task: Task = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description.trim(),
      dueDate: input.dueDate,
      status: "PENDING",

      createdBy: myId,
      assignedTo: input.assignedTo,

      createdAt: now,
      updatedAt: now,
    };

    setItems((prev) => [task, ...prev]);
  }

  // ✅ 3-state status update
  function setStatus(id: string, status: TaskStatus) {
    const now = new Date().toISOString();
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, updatedAt: now } : t))
    );
  }

  // Optional: keep old toggle behavior (PENDING <-> COMPLETED)
  function toggleTask(id: string) {
    const now = new Date().toISOString();
    setItems((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "COMPLETED" ? "PENDING" : "COMPLETED",
              updatedAt: now,
            }
          : t
      )
    );
  }

  function deleteTask(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(
    id: string,
    patch: Partial<Pick<Task, "title" | "description" | "dueDate" | "assignedTo">>
  ) {
    const now = new Date().toISOString();
    setItems((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: patch.title !== undefined ? patch.title.trim() : t.title,
              description:
                patch.description !== undefined ? patch.description.trim() : t.description,
              dueDate: patch.dueDate !== undefined ? patch.dueDate : t.dueDate,
              assignedTo: patch.assignedTo !== undefined ? patch.assignedTo : t.assignedTo,
              updatedAt: now,
            }
          : t
      )
    );
  }

  return {
    tasks,
    filter,
    setFilter,
    counts,
    addTask,
    setStatus,   // ✅ use this in UI
    toggleTask,  // optional backward compatibility
    deleteTask,
    editTask,
    myId,
  };
}
