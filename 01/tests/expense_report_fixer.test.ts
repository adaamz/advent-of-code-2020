import { assertStrictEquals } from "../../deps.ts";
import {fix_expense_report_2, fix_expense_report_3} from "../src/expense_report_fixer.ts";

Deno.test("Example test from introduction (Part one)", () => {
  const input = (
    '1721\n' +
    '979\n' +
    '366\n' +
    '299\n' +
    '675\n' +
    '1456'
  ).split('\n').map((n: string): number => Number(n));

  const expected_output = 514579;

  assertStrictEquals(fix_expense_report_2(input), expected_output);
});

Deno.test("Example test from introduction (Part two)", () => {
  const input = (
    '1721\n' +
    '979\n' +
    '366\n' +
    '299\n' +
    '675\n' +
    '1456'
  ).split('\n').map((n: string): number => Number(n));

  const expected_output = 241861950;

  assertStrictEquals(fix_expense_report_3(input), expected_output);
});

Deno.test("Final test (Part one)", () => {
  const input = (
    Deno.readTextFileSync("01/final_input.txt")
  ).split('\n').map((n: string): number => Number(n));

  const expected_output = 545379;

  assertStrictEquals(fix_expense_report_2(input), expected_output);
});

Deno.test("Final test (Part two)", () => {
  const input = (
    Deno.readTextFileSync("01/final_input.txt")
  ).split('\n').map((n: string): number => Number(n));

  const expected_output = 257778836;

  assertStrictEquals(fix_expense_report_3(input), expected_output);
});
