export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(timestamp);
}

export function formatTime(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(timestamp);
}

export function formatDateRange(start: number, end: number): string {
  return `${formatDate(start)} • ${formatTime(start)} - ${formatTime(end)}`;
}
