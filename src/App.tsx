import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { ReminderBanner } from "./components/ReminderBanner/ReminderBanner";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  const {
    filter,
    setFilter,
    counts,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
  } = useTasks();

  return (
    <div className="app">
      <aside className="app__sidebar glass">
        <Sidebar filter={filter} setFilter={setFilter} />
      </aside>

      <main className="app__main">
        <header className="app__top glass">
          <Header />
          <ReminderBanner counts={counts} />
        </header>

        <section className="app__content">
          <div className="glass">
            <TaskForm onAdd={addTask} />
          </div>

          <div className="glass">
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
