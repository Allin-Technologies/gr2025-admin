export function getTopLocationsAttending(data: { attending_via?: string }[]) {
  // Step 1: Count occurrences of each service
  const serviceCount = data.reduce((acc, entry) => {
    if (entry?.attending_via) {
      acc[entry.attending_via] = (acc[entry.attending_via] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Step 2: Sort services by count in descending order
  const sortedService = Object.entries(serviceCount).sort(
    (a, b) => b[1] - a[1]
  );

  // Step 3: Get top 5 services
  const top5 = sortedService.slice(0, 5);

  // Convert to the desired result format
  const result = top5.map(([service, count]) => ({ service, count }));

  return {
    result,
    count: sortedService.length,
  };
}
