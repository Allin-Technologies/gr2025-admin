export function getCheckedInCount(
  data: { minister_checked_in?: boolean; guest_checked_in?: boolean }[] = []
) {
  const totals = data.reduce(
    (acc, person) => {
      if (person.minister_checked_in) acc.minister_checked_in += 1;
      if (person.guest_checked_in) acc.guest_checked_in += 1;
      return acc;
    },
    { minister_checked_in: 0, guest_checked_in: 0 }
  );

  return totals;
}
