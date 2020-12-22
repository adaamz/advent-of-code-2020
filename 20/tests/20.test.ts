import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/20.ts";

Deno.test("Jurassic Jigsaw: Example test from introduction (Part one)", () => {
  const input = (
      Deno.readTextFileSync("20/tests/example_input.txt").trimEnd()
  ).split("\n\n");
  const expectedOutput = 0;

  assertStrictEquals(countPart1(input), expectedOutput);
});
/*
Deno.test("Jurassic Jigsaw: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("20/final_input.txt").trimEnd()
  ).split("\n\n");

  const expectedOutput = 0;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("Jurassic Jigsaw: Example test from introduction (Part two)", () => {
  const input = (
      Deno.readTextFileSync("20/tests/example_input.txt").trimEnd()
  ).split("\n\n");

  const expectedOutput = 0;

  assertStrictEquals(countPart2(input), expectedOutput);
});

Deno.test("Jurassic Jigsaw: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("20/final_input.txt").trimEnd()
  ).split("\n\n");

  const expectedOutput = 0;

  assertStrictEquals(countPart2(input), expectedOutput);
});
*/
