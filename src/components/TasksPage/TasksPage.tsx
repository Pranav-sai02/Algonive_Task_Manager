import "../../App.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";
import { ReminderBanner } from "../../components/ReminderBanner/ReminderBanner";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import { TaskList } from "../../components/TaskList/TaskList";
import { useTasks } from "../../hooks/useTasks";
import type { Task } from "../../types/task";

import { useNavigate } from "react-router-dom";
import { clearSession } from "../../services/session";
import { useAppSnackbar } from "../../context/SnackbarContext";

type EditPatch = Partial<Pick<Task, "title" | "description" | "dueDate" | "assignedTo">>;

export default function TasksPage() {
  const { show } = useAppSnackbar();
  const navigate = useNavigate();

  const {
    filter,
    setFilter,
    counts,
    tasks,
    addTask,
    setStatus,
    deleteTask,
    editTask,
    myId,
  } = useTasks();

  const logout = () => {
    clearSession();
    show("Logged out successfully", "success");
    navigate("/login", { replace: true });
  };

  const handleAddTask = (input: {
    title: string;
    description: string;
    dueDate: string;
    assignedTo: string;
  }) => {
    try {
      addTask(input);
      show("Task added", "success");
    } catch {
      show("Failed to add task", "error");
    }
  };

  const handleStatusChange = (id: string, status: Task["status"]) => {
    try {
      setStatus(id, status);
      show("Task updated", "success");
    } catch {
      show("Failed to update task", "error");
    }
  };

  const handleDeleteTask = (id: string) => {
    try {
      deleteTask(id);
      show("Task deleted", "error");
    } catch {
      show("Failed to delete task", "error");
    }
  };

  const handleEditTask = (id: string, patch: EditPatch) => {
    try {
      editTask(id, patch);
      show("Task updated", "success");
    } catch {
      show("Failed to update task", "error");
    }
  };

  return (
    <div className="app">
      <aside className="app__sidebar glass">
        <Sidebar filter={filter} setFilter={setFilter} />
      </aside>

      <main className="app__main">
        <header className="app__top glass">
          <Header />

          <div className="app__topRight">
            <ReminderBanner counts={counts} />

            <button
              className="logout-btn logout-btn--square"
              onClick={logout}
              type="button"
              aria-label="Logout"
              title="Logout"
            >
              <svg
                className="logout-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
                <path d="M17 16l4-4-4-4" />
                <path d="M21 12H10" />
              </svg>
            </button>
          </div>
        </header>

        <section className="app__content">
          <div className="glass">
            <TaskForm onAdd={handleAddTask} myId={myId} />
          </div>

          <div className="glass">
            <TaskList
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
