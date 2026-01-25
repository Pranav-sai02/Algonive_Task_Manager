export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type TaskFilter = "ALL" | "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  status: TaskStatus;

  // ✅ Task-2 fields
  createdBy: string;  // userId (ALG-U-xxxxxx)
  assignedTo: string; // userId (ALG-U-xxxxxx)

  createdAt: string;
  updatedAt: string;
};
