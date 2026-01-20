import { useState } from "react";
import "./taskForm.css";

type Props = {
  onAdd: (input: { title: string; description: string; dueDate: string }) => void;
};

export const TaskForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    onAdd({ title, description, dueDate });
    setTitle("");
    setDueDate("");
    setDescription("");
  }

  return (
    <form className="tf" onSubmit={submit}>
      <div className="tf__title">➕ Add New Task</div>

      <div className="tf__grid">
        <div className="tf__field">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Finish Algonive task manager"
            required
          />
        </div>

        <div className="tf__field">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="tf__field tf__full">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description..."
          />
        </div>
      </div>

      <div className="tf__actions">
        <button type="submit" className="tf__btn">Add Task</button>
      </div>
    </form>
  );
};
