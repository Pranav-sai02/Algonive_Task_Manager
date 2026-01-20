import "./sidebar.css";
import type { TaskFilter } from "../../types/task";
import { FiList, FiClock, FiCheckCircle } from "react-icons/fi";

type Props = {
  filter: TaskFilter;
  setFilter: (f: TaskFilter) => void;
};

const FILTERS = [
  { label: "All Tasks", value: "ALL" as TaskFilter, icon: <FiList /> },
  { label: "Pending", value: "PENDING" as TaskFilter, icon: <FiClock /> },
  { label: "Completed", value: "COMPLETED" as TaskFilter, icon: <FiCheckCircle /> },
];

export const Sidebar = ({ filter, setFilter }: Props) => {
  return (
    <nav className="sb">
      {/* Brand */}
      <div className="sb__brand">Algonive</div>

      {/* Filters */}
      <div className="sb__menu">
        {FILTERS.map(({ label, value, icon }) => (
          <button
            key={value}
            type="button"
            className={`sb__item ${filter === value ? "active" : ""}`}
            onClick={() => setFilter(value)}
          >
            <span className="sb__icon">{icon}</span>
            <span className="sb__label">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
