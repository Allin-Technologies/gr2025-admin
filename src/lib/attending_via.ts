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

  // Default values for cases where no data exists
  const defaultValues = [
    { service: "Global headquarters ", count: 0 },
    { service: "Satellite church", count: 0 },
    { service: "Online", count: 0 },
  ];

  // Combine and ensure unique services by using Set and filter
  const combinedServices = new Set([
    ...defaultValues.map((item) => item.service),
    ...result.map((item) => item.service),
  ]);

  // Create unique objects
  const mergedResult = Array.from(combinedServices).map((service) => {
    const defaultItem = defaultValues.find((item) => item.service === service);
    const resultItem = result.find((item) => item.service === service);

    const count = resultItem
      ? resultItem.count
      : defaultItem
      ? defaultItem.count
      : 0;

    return { service, count };
  });

  return {
    result: mergedResult,
    count: sortedService.length, // total count of services
  };
}
