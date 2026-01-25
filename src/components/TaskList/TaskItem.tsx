import { useMemo, useState } from "react";
import "./taskList.css";
import type { Task } from "../../types/task";
import { formatDue, isDueSoon, isOverdue } from "../../utils/dates";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { getSession } from "../../services/session";
import { loadUsers } from "../../services/userStorage";

type Props = {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    patch: Partial<Pick<Task, "title" | "description" | "dueDate" | "assignedTo">>
  ) => void;
};

type VisualStatus = "completed" | "overdue" | "soon" | "pending";

function getUserNameById(userId: string): string {
  if (!userId || userId === "LEGACY") return "Unknown";
  const users = loadUsers();
  const u = users.find((x) => x.id === userId);
  return u ? u.name : "Unknown";
}

export const TaskItem = ({ task, onStatusChange, onDelete, onEdit }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [due, setDue] = useState(task.dueDate);

  const session = getSession();
  const myId = session?.userId;

  const assignedByName =
    task.createdBy === myId ? "You" : getUserNameById(task.createdBy);

  const { overdue, soon, visual } = useMemo(() => {
    const isDone = task.status === "COMPLETED";
    const overdue = !isDone && isOverdue(task.dueDate);
    const soon = !isDone && !overdue && isDueSoon(task.dueDate);

    const visual: VisualStatus = isDone
      ? "completed"
      : overdue
      ? "overdue"
      : soon
      ? "soon"
      : "pending";

    return { overdue, soon, visual };
  }, [task.status, task.dueDate]);

  function save() {
    if (!title.trim() || !due) return;
    onEdit(task.id, { title, description: desc, dueDate: due });
    setEditing(false);
  }

  function cancel() {
    setTitle(task.title);
    setDesc(task.description);
    setDue(task.dueDate);
    setEditing(false);
  }

  const badgeText =
    task.status === "COMPLETED"
      ? "Completed"
      : overdue
      ? "Overdue"
      : soon
      ? "Due soon"
      : task.status === "IN_PROGRESS"
      ? "In progress"
      : "Pending";

  const statusText =
    task.status === "COMPLETED"
      ? "Done"
      : overdue
      ? "Overdue"
      : soon
      ? "Due soon"
      : task.status === "IN_PROGRESS"
      ? "In progress"
      : "On track";

  return (
    <div className={["card", `card--${visual}`, editing ? "card--editing" : ""].join(" ")}>
      <div className="card__main">
        {editing ? (
          <div className="card__editGrid">
            <div className="card__editField">
              <label className="card__label">Title</label>
              <input
                className="edit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
            </div>

            <div className="card__editField">
              <label className="card__label">Due date</label>
              <input
                className="edit"
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>

            <div className="card__editField card__editFull">
              <label className="card__label">Description</label>
              <textarea
                className="edit edit--area"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="card__title">{task.title}</div>

            {task.description ? <div className="card__desc">{task.description}</div> : null}

            {/* ✅ Assigned By (creator) */}
            <div className="card__who">
              Assigned by: <strong>{assignedByName}</strong>
            </div>

            <div className="card__meta">
              <span className="card__due">Due: {formatDue(task.dueDate)}</span>
              <span> • {statusText}</span>
            </div>
          </>
        )}
      </div>

      <div className="card__actions">
        {!editing && <span className={`badge badge--${visual}`}>{badgeText}</span>}

        {editing ? (
          <div className="card__editActions">
            <button type="button" className="btn btn--ghost" onClick={cancel}>
              Cancel
            </button>
            <button type="button" className="btn" onClick={save}>
              Save
            </button>
          </div>
        ) : (
          <>
            {/* ✅ Status (3-state) */}
            <select
              className="statusSelect"
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
              title="Change status"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <button type="button" className="icon" onClick={() => setEditing(true)} title="Edit">
              <FiEdit />
            </button>

            <button type="button" className="icon danger" onClick={() => onDelete(task.id)} title="Delete">
              <FiTrash2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
