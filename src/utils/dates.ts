export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0,0,0,0);
  return d;
}

export function parseDueDate(yyyyMmDd: string): Date {
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
}

export function isOverdue(dueDate: string): boolean {
  return parseDueDate(dueDate).getTime() < startOfToday().getTime();
}

export function isDueSoon(dueDate: string, hours = 24): boolean {
  const now = Date.now();
  const due = parseDueDate(dueDate).getTime();
  const diff = due - now;
  return diff >= 0 && diff <= hours * 60 * 60 * 1000;
}

export function formatDue(dueDate: string): string {
  const d = parseDueDate(dueDate);
  const day = String(d.getDate()).padStart(2, "0");
  const mon = d.toLocaleString(undefined, { month: "short" });
  const year = d.getFullYear();
  return `${day} ${mon} ${year}`;
}
