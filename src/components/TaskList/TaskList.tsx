import "./taskList.css";
import type { Task } from "../../types/task";
import { TaskItem } from "./TaskItem";



type Props = {
  tasks: Task[];
  onStatusChange: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    patch: Partial<Pick<Task, "title" | "description" | "dueDate" | "assignedTo">>
  ) => void;
};

export const TaskList = ({ tasks, onStatusChange, onDelete, onEdit }: Props) => {
  return (
    <div className="tl">
      <div className="tl__title">Your Tasks</div>

      {tasks.length === 0 ? (
        <div className="tl__empty">No tasks yet — add your first task</div>
      ) : (
        <div className="tl__grid">
          {tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};
