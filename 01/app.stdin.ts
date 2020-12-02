import { readLines } from "../deps.ts";

import {fixExpenseReport2, fixExpenseReport3} from "./src/expense_report_fixer.ts";

async function readExpenses(): Promise<number[]> {
  const expenses = [];

  for await (const line of readLines(Deno.stdin)) {
    expenses.push(Number(line));
  }

  return expenses;
}

console.log(fixExpenseReport2(await readExpenses()));
console.log(fixExpenseReport3(await readExpenses()));
