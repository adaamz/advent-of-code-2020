import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/12.ts";

Deno.test("RainRisk: Example test from introduction (Part one)", () => {
  const input = (
      "F10\n" +
      "N3\n" +
      "F7\n" +
      "R90\n" +
      "F11"
  ).split("\n");
  const expectedOutput = 25;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RainRisk: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("12/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 582;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RainRisk: Example test from introduction (Part two)", () => {
  const input = (
      "F10\n" +
      "N3\n" +
      "F7\n" +
      "R90\n" +
      "F11"
  ).split("\n");

  const expectedOutput = 286;

  assertStrictEquals(countPart2(input), expectedOutput);
});

Deno.test("RainRisk: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("12/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 52069;

  assertStrictEquals(countPart2(input), expectedOutput);
});
