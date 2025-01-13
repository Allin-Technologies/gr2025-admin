export function getTopServices(data: { service_number?: string }[]) {
  // Step 1: Count occurrences of each service
  const serviceCount = data.reduce((acc, entry) => {
    if (entry?.service_number) {
      acc[entry.service_number] = (acc[entry.service_number] || 0) + 1;
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
    {
      service: "21",
      count: 0,
    },
    { service: "1", count: 0 },
    {
      service: "2",
      count: 0,
    },
    {
      service: "3",
      count: 0,
    },
    {
      service: "4",
      count: 0,
    },
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
    count: sortedService.length,
  };
}
