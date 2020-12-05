import { assertStrictEquals } from "../../deps.ts";
import {fixExpenseReport2, fixExpenseReport3} from "../src/expense_report_fixer.ts";

Deno.test("ExpenseReportFixer: Example test from introduction (Part one)", () => {
  const input = (
    '1721\n' +
    '979\n' +
    '366\n' +
    '299\n' +
    '675\n' +
    '1456'
  ).split('\n').map((n: string): number => Number(n));

  const expectedOutput = 514579;

  assertStrictEquals(fixExpenseReport2(input), expectedOutput);
});

Deno.test("ExpenseReportFixer: Example test from introduction (Part two)", () => {
  const input = (
    '1721\n' +
    '979\n' +
    '366\n' +
    '299\n' +
    '675\n' +
    '1456'
  ).split('\n').map((n: string): number => Number(n));

  const expectedOutput = 241861950;

  assertStrictEquals(fixExpenseReport3(input), expectedOutput);
});

Deno.test("ExpenseReportFixer: Final test (Part one)", () => {
  const input = (
    Deno.readTextFileSync("01/final_input.txt")
  ).split('\n').map((n: string): number => Number(n));

  const expectedOutput = 545379;

  assertStrictEquals(fixExpenseReport2(input), expectedOutput);
});

Deno.test("ExpenseReportFixer: Final test (Part two)", () => {
  const input = (
    Deno.readTextFileSync("01/final_input.txt")
  ).split('\n').map((n: string): number => Number(n));

  const expectedOutput = 257778836;

  assertStrictEquals(fixExpenseReport3(input), expectedOutput);
});
