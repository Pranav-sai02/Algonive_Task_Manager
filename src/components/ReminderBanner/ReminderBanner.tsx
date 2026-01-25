import "./reminderBanner.css";

type Props = {
  counts: { dueSoon: number; overdue: number };
};

type BannerTone = "soon" | "overdue";

export const ReminderBanner = ({ counts }: Props) => {
  const { dueSoon, overdue } = counts;
  if (dueSoon === 0 && overdue === 0) return null;

  // 🔴 overdue wins if both exist
  const tone: BannerTone = overdue > 0 ? "overdue" : "soon";

  const parts = [
    dueSoon ? `${dueSoon} due in 24 hours` : null,
    overdue ? `${overdue} overdue` : null,
  ].filter(Boolean) as string[];

  const icon = tone === "overdue" ? "⚠️" : "⏳";

  return (
    <div className={`rb rb--${tone}`}>
      {icon} {parts.join(" • ")}
    </div>
  );
};
