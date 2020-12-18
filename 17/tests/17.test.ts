import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/17.ts";

Deno.test("ConwayCubes: Example test from introduction (Part one)", () => {
  const input = (
      ".#.\n" +
      "..#\n" +
      "###"
  ).split("\n").map(l => l.split(""));
  const expectedOutput = 112;

  assertStrictEquals(countPart1(input, 6), expectedOutput);
});

Deno.test("ConwayCubes: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("17/final_input.txt").trimEnd()
  ).split("\n").map(l => l.split(""));

  const expectedOutput = 315;

  assertStrictEquals(countPart1(input, 6), expectedOutput);
});

Deno.test("ConwayCubes: Example test from introduction (Part two)", () => {
    const input = (
        ".#.\n" +
        "..#\n" +
        "###"
    ).split("\n").map(l => l.split(""));

  const expectedOutput = 848;

  assertStrictEquals(countPart2(input, 6), expectedOutput);
});

Deno.test("ConwayCubes: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("17/final_input.txt").trimEnd()
  ).split("\n").map(l => l.split(""));

  const expectedOutput = 1520;

  assertStrictEquals(countPart2(input, 6), expectedOutput);
});
