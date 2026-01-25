import { useEffect, useState } from "react";
import "./taskForm.css";
import { loadUsers } from "../../services/userStorage";

type Props = {
  onAdd: (input: {
    title: string;
    description: string;
    dueDate: string;
    assignedTo: string;
  }) => void;
  myId: string;
};

export const TaskForm = ({ onAdd, myId }: Props) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState(myId);

  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const allUsers = loadUsers();
    setUsers(allUsers.map((u) => ({ id: u.id, name: u.name })));
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    onAdd({ title, description, dueDate, assignedTo });
    setTitle("");
    setDueDate("");
    setDescription("");
    setAssignedTo(myId); // reset to self
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

        {/* ✅ Assignment dropdown */}
        <div className="tf__field">
          <label>Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} {u.id === myId ? "(You)" : ""}
              </option>
            ))}
          </select>
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
        <button type="submit" className="tf__btn">
          Add Task
        </button>
      </div>
    </form>
  );
};
