import {assertStrictEquals} from "../../deps.ts";
import {countPart1} from "../src/18.ts";

Deno.test("OperationOrder:Example #1 test from introduction (Part one)", () => {
  const input = (
      "1 + 2 * 3 + 4 * 5 + 6"
  ).split("\n");
  const expectedOutput = 71;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("OperationOrder:Example #2 test from introduction (Part one)", () => {
  const input = (
      "1 + (2 * 3) + (4 * (5 + 6))"
  ).split("\n");
  const expectedOutput = 51;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("OperationOrder:Example #3 test from introduction (Part one)", () => {
  const input = (
      "2 * 3 + (4 * 5)"
  ).split("\n");
  const expectedOutput = 26;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("OperationOrder:Example #6 test from introduction (Part one)", () => {
  const input = (
      "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"
  ).split("\n");
  const expectedOutput = 13632;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("OperationOrder:Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("18/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 9535936849815;

  assertStrictEquals(countPart1(input), expectedOutput);
});
