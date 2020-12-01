import { readLines } from "../deps.ts";

import {fix_expense_report_2, fix_expense_report_3} from "./src/expense_report_fixer.ts";

async function read_expenses(): Promise<number[]> {
  const expenses = [];

  for await (const line of readLines(Deno.stdin)) {
    expenses.push(Number(line));
  }

  return expenses;
}

console.log(fix_expense_report_2(await read_expenses()));
console.log(fix_expense_report_3(await read_expenses()));
