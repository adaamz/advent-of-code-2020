const needed_sum_value = 2020;

export function fix_expense_report_2(expenses: Iterable<number>): number
{
  for (const expense1 of expenses) {
    for (const expense2 of expenses) {
      if (expense1 + expense2 === needed_sum_value) {
        return expense1 * expense2;
      }
    }
  }

  return NaN;
}

export function fix_expense_report_3(expenses: Iterable<number>): number
{
  for (const expense1 of expenses) {
    for (const expense2 of expenses) {
      for (const expense3 of expenses) {
        if (expense1 + expense2 + expense3 === needed_sum_value) {
          return expense1 * expense2 * expense3;
        }
      }
    }
  }

  return NaN;
}
