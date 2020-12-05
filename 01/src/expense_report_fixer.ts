const neededSumValue = 2020;

export function fixExpenseReport2(expenses: number[]): number
{
  for (let i = 0; i < expenses.length - 1; i++) {
    const expense1 = expenses[i];
    for (let j = i; j < expenses.length; j++) {
      const expense2 = expenses[j];
      if (expense1 + expense2 === neededSumValue) {
        return expense1 * expense2;
      }
    }
  }

  return NaN;
}

export function fixExpenseReport3(expenses: number[]): number
{
  for (let i = 0; i < expenses.length - 2; i++) {
    const expense1 = expenses[i];
    for (let j = i; j < expenses.length - 1; j++) {
      const expense2 = expenses[j];
      for (let k = j; k < expenses.length; k++) {
        const expense3 = expenses[k];
        if (expense1 + expense2 + expense3 === neededSumValue) {
          return expense1 * expense2 * expense3;
        }
      }
    }
  }

  return NaN;
}
