const neededSumValue = 2020;

export function fixExpenseReport2(expenses: Iterable<number>): number
{
  for (const expense1 of expenses) {
    for (const expense2 of expenses) {
      if (expense1 + expense2 === neededSumValue) {
        return expense1 * expense2;
      }
    }
  }

  return NaN;
}

export function fixExpenseReport3(expenses: Iterable<number>): number
{
  for (const expense1 of expenses) {
    for (const expense2 of expenses) {
      for (const expense3 of expenses) {
        if (expense1 + expense2 + expense3 === neededSumValue) {
          return expense1 * expense2 * expense3;
        }
      }
    }
  }

  return NaN;
}
