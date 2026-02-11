export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type TaskFilter = "ALL" | "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string; 
  status: TaskStatus;

  createdBy: string;  
  assignedTo: string; 

  createdAt: string;
  updatedAt: string;
};
