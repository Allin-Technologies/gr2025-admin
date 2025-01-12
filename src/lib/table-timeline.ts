import { formatDateRange } from "little-date";

export function filterRegistrationsByTimeline(
  data: Array<{ createdAt?: string }>
) {
  if (data.length === 0) return "No data available";

  const dates = data
    .map((item) => (item.createdAt ? new Date(item.createdAt) : null))
    .filter((date): date is Date => date !== null && !isNaN(date.getTime())); // Exclude null dates and invalid dates

  if (dates.length === 0) return "No valid dates found";

  const from = new Date(Math.min(...dates.map((d) => d.getTime())));
  const to = new Date(Math.max(...dates.map((d) => d.getTime())));

  return `Showing data from ${formatDateRange(from, to, { includeTime: false })}`;
}
