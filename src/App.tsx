import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import TasksPage from "./components/TasksPage/TasksPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("tm_session_user"))
  );

  useEffect(() => {
    const handler = () => {
      setLoggedIn(Boolean(localStorage.getItem("tm_session_user")));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={loggedIn ? <Navigate to="/app" replace /> : <LoginPage />}
      />

      <Route
        path="/app"
        element={loggedIn ? <TasksPage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to={loggedIn ? "/app" : "/login"} replace />}
      />
    </Routes>
  );
}
