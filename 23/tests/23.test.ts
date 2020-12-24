import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/23.ts";

Deno.test("Crab Cups: Example test from introduction (Part one)", () => {
  const input = (
      "389125467"
  ).split("").map(Number);
  const expectedOutput = 92658374;

  assertStrictEquals(countPart1(input, 10), expectedOutput);
});

Deno.test("Crab Cups: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("23/final_input.txt").trimEnd()
  ).split("").map(Number);

  const expectedOutput = 97342568;

  assertStrictEquals(countPart1(input, 100), expectedOutput);
});

Deno.test("Crab Cups: Example test from introduction (Part two)", () => {
  const input = (
      "389125467"
  ).split("").map(Number);

  const expectedOutput = 149245887792;

  assertStrictEquals(countPart2(input), expectedOutput);
});

Deno.test("Crab Cups: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("23/final_input.txt").trimEnd()
  ).split("").map(Number);

  const expectedOutput = 902208073192;

  assertStrictEquals(countPart2(input), expectedOutput);
});
