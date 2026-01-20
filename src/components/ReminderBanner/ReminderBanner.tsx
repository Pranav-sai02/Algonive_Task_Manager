import "./reminderBanner.css";

type Props = {
  counts: { dueSoon: number; overdue: number };
};

export const ReminderBanner = ({ counts }: Props) => {
  const { dueSoon, overdue } = counts;
  if (dueSoon === 0 && overdue === 0) return null;

  const parts = [
    dueSoon ? `${dueSoon} due in 24 hours` : null,
    overdue ? `${overdue} overdue` : null,
  ].filter(Boolean);

  return <div className="rb">🔔 {parts.join(" • ")}</div>;
};
