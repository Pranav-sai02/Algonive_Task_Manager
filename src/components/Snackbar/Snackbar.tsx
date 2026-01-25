import "./snackbar.css";

export type SnackbarType = "success" | "error" | "info" | "warning";

type Props = {
  open: boolean;
  message: string;
  type?: SnackbarType;
  onClose: () => void;
};

export function Snackbar({ open, message, type = "info", onClose }: Props) {
  return (
    <div
      className={`snackbar snackbar--${type} ${open ? "snackbar--open" : "snackbar--closed"}`}
      role="status"
      aria-live="polite"
      aria-hidden={!open}
    >
      <span className="snackbar__msg">{message}</span>
      <button type="button" onClick={onClose} aria-label="close">
        ×
      </button>
    </div>
  );
}
