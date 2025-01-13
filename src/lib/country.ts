export function getTopCountriesWithOther(data: { country: string }[]) {
  // Step 1: Count occurrences of each country
  const countryCount = data.reduce((acc, entry) => {
    acc[entry.country] = (acc[entry.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Step 2: Sort countries by count in descending order
  const sortedCountries = Object.entries(countryCount).sort(
    (a, b) => b[1] - a[1]
  );

  // Step 3: Get top 5 countries and count the rest as "Other"
  const top5 = sortedCountries.slice(0, 5);
  const others = sortedCountries.slice(5);

  const result = top5.map(([country, count]) => ({ country, count }));

  if (others.length > 0) {
    const otherCount = others.reduce((sum, [, count]) => sum + count, 0);
    result.push({ country: "Other", count: otherCount });
  }

  return {
    result,
    count: sortedCountries?.length ?? 0,
  };
}
