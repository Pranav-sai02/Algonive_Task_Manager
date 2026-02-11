import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import { FiMail, FiLock, FiUser } from "react-icons/fi";




import {
  ensureSeedUsers,
  findUserByEmail,
  createUser,
} from "../../services/userStorage";
import { setSession } from "../../services/session";
import { useAppSnackbar } from "../../context/SnackbarContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"LOGIN" | "SIGNUP">("LOGIN");

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // use email as username for team scenario
  const [password, setPassword] = useState("");

  const { show } = useAppSnackbar();

  useEffect(() => {
    // Seed 2 demo users (only if users list is empty)
    ensureSeedUsers();
  }, []);

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanPassword = password;

    if (mode === "LOGIN") {
      const user = findUserByEmail(cleanEmail);

      if (!user || user.password !== cleanPassword) {
        show("Invalid email or password ❌", "error");
        return;
      }

      setSession({ userId: user.id, name: user.name, email: user.email });
      show("Login successful ✅", "success");
      navigate("/app", { replace: true });
      return;
    }

    // SIGNUP
    const cleanName = name.trim();
    if (!cleanName) {
      show("Please enter your name ❌", "error");
      return;
    }

    if (cleanPassword.length < 4) {
      show("Password must be at least 4 characters ❌", "error");
      return;
    }

    const existing = findUserByEmail(cleanEmail);
    if (existing) {
      show("Email already registered. Please login ✅", "info");
      setMode("LOGIN");
      // keep email filled for convenience
      return;
    }

    const newUser = createUser(cleanName, cleanEmail, cleanPassword);
    setSession({ userId: newUser.id, name: newUser.name, email: newUser.email });
    show("Account created ✅", "success");
    navigate("/app", { replace: true });
  };

  return (
    <>
      <div className="auth">
        {/* Background abstract shapes */}
        <div className="auth__bg" aria-hidden="true">
          <span className="blob blob--1" />
          <span className="blob blob--2" />
          <span className="blob blob--3" />
          <span className="blob blob--4" />
        </div>

        <div className="auth__wrap">
          {/* Left brand panel */}
          <aside className="auth__brand authGlass">
            <div className="brand__top">
              <div className="brand__logo" aria-hidden="true">
                <span />
                <span />
              </div>

              <h1 className="brand__title">
                ALGONIVE <span>Task Manager</span>
              </h1>

              <p className="brand__tagline">Simple team tasks. Clear deadlines.</p>
            </div>

            <ul className="brand__bullets">
              <li>Assign tasks to teammates</li>
              <li>Track progress in seconds</li>
              <li>Never miss a deadline</li>
            </ul>

            <div className="brand__footer">© {new Date().getFullYear()} Algonive</div>
          </aside>

          {/* Right auth card */}
          <main className="auth__card authGlass">
            <div className="card__head">
              <h2>{mode === "LOGIN" ? "Welcome Back!" : "Create Account"}</h2>
              <p>{mode === "LOGIN" ? "Login to your account" : "Sign up to get started"}</p>
            </div>

            {/* Mode toggle (kept minimal, no new CSS required) */}
            <div className="card__switch" style={{ marginBottom: 12 }}>
              <button
                className="link"
                type="button"
                onClick={() => {
                  setMode("LOGIN");
                  resetFields();
                }}
                aria-pressed={mode === "LOGIN"}
              >
                Login
              </button>
              <span style={{ opacity: 0.6, margin: "0 10px" }}>|</span>
              <button
                className="link"
                type="button"
                onClick={() => {
                  setMode("SIGNUP");
                  resetFields();
                }}
                aria-pressed={mode === "SIGNUP"}
              >
                Sign Up
              </button>
            </div>

            <form className="card__form" onSubmit={onSubmit}>
              {mode === "SIGNUP" && (
                <label className="field">
                  <span className="field__label">Name</span>
                  <div className="field__control">
                    <span className="field__icon">
                      <FiUser size={18} />
                    </span>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </label>
              )}

              <label className="field">
                <span className="field__label">Email</span>
                <div className="field__control">
                  <span className="field__icon">
                    <FiMail size={18} />
                  </span>
                  <input
                    type="email"
                    placeholder="eg : pranav@test.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </label>

              <label className="field">
                <span className="field__label">Password</span>
                <div className="field__control">
                  <span className="field__icon">
                    <FiLock size={18} />
                  </span>
                  <input
                    type="password"
                    placeholder={mode === "LOGIN" ? "eg : 123456" : "eg : 123456"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </label>

              <div className="card__row">
                <button
                  className="link"
                  type="button"
                  onClick={() =>
                    show(
                      "Mock auth: use seeded users or create a new account.",
                      "info"
                    )
                  }
                >
                  {mode === "LOGIN" ? "Forgot Password?" : "Need help?"}
                </button>
              </div>

              <button className="btn btn--primary" type="submit">
                {mode === "LOGIN" ? "Login" : "Create Account"}
              </button>

              {mode === "LOGIN" ? (
                <div className="card__switch">
                  <span>Don’t have an account?</span>
                  <button
                    className="link"
                    type="button"
                    onClick={() => {
                      setMode("SIGNUP");
                      resetFields();
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="card__switch">
                  <span>Already have an account?</span>
                  <button
                    className="link"
                    type="button"
                    onClick={() => {
                      setMode("LOGIN");
                      resetFields();
                    }}
                  >
                    Login
                  </button>
                </div>
              )}

            </form>
          </main>
        </div>
      </div>
    </>
  );
}
