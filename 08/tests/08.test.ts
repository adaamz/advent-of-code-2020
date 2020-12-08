import { assertStrictEquals } from "../../deps.ts";
import { countPart1, countPart2 } from "../src/08.ts";

Deno.test("ABC: Example test from introduction (Part one)", () => {
  const input = (
    "nop +0\n" +
    "acc +1\n" +
    "jmp +4\n" +
    "acc +3\n" +
    "jmp -3\n" +
    "acc -99\n" +
    "acc +1\n" +
    "jmp -4\n" +
    "acc +6"
  ).split("\n");
  const expectedOutput = 5;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("ABC: Final test (Part one)", () => {
  const input = (
    Deno.readTextFileSync("08/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 1709;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("ABC: Example test from introduction (Part two)", () => {
  const input = (
    "nop +0\n" +
    "acc +1\n" +
    "jmp +4\n" +
    "acc +3\n" +
    "jmp -3\n" +
    "acc -99\n" +
    "acc +1\n" +
    "jmp -4\n" +
    "acc +6"
  ).split("\n");

  const expectedOutput = 8;

  assertStrictEquals(countPart2(input), expectedOutput);
});

Deno.test("ABC: Final test (Part two)", () => {
  const input = (
    Deno.readTextFileSync("08/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 1976;

  assertStrictEquals(countPart2(input), expectedOutput);
});
