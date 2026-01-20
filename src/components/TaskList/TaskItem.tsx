import { useState } from "react";
import "./taskList.css";
import type { Task } from "../../types/task";
import { formatDue, isDueSoon, isOverdue } from "../../utils/dates";

import { FiEdit, FiCheck, FiTrash2 } from "react-icons/fi";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    patch: Partial<Pick<Task, "title" | "description" | "dueDate">>
  ) => void;
};

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [due, setDue] = useState(task.dueDate);

  const overdue = task.status !== "COMPLETED" && isOverdue(task.dueDate);
  const soon = task.status !== "COMPLETED" && !overdue && isDueSoon(task.dueDate);

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

  const badgeClass = task.status === "COMPLETED" ? "badge--done" : "badge--pending";
  const badgeText = task.status === "COMPLETED" ? "Completed" : "Pending";

  const statusText =
    task.status === "COMPLETED"
      ? "Done"
      : overdue
      ? "Overdue"
      : soon
      ? "Due soon"
      : "On track";

  return (
    <div className={`card ${editing ? "card--editing" : ""}`}>
      <div className="card__main">
        {editing ? (
          <div className="card__editGrid">
            {/* Row 1: Title + Due date */}
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

            {/* Row 2: Description full width */}
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

            {task.description ? (
              <div className="card__desc">{task.description}</div>
            ) : null}

            <div className="card__meta">
              Due: {formatDue(task.dueDate)} • {statusText}
            </div>
          </>
        )}
      </div>

      <div className="card__actions">
        {!editing && <span className={`badge ${badgeClass}`}>{badgeText}</span>}

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
            <button
              type="button"
              className="icon"
              onClick={() => setEditing(true)}
              title="Edit"
            >
              <FiEdit />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => onToggle(task.id)}
              title={task.status === "COMPLETED" ? "Mark pending" : "Mark complete"}
            >
              <FiCheck opacity={task.status === "COMPLETED" ? 0.4 : 1} />
            </button>

            <button
              type="button"
              className="icon danger"
              onClick={() => onDelete(task.id)}
              title="Delete"
            >
              <FiTrash2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
