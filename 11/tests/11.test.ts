import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/11.ts";

Deno.test("SeatingSystem: Example test from introduction (Part one)", () => {
  const input = (
      "L.LL.LL.LL\n" +
      "LLLLLLL.LL\n" +
      "L.L.L..L..\n" +
      "LLLL.LL.LL\n" +
      "L.LL.LL.LL\n" +
      "L.LLLLL.LL\n" +
      "..L.L.....\n" +
      "LLLLLLLLLL\n" +
      "L.LLLLLL.L\n" +
      "L.LLLLL.LL"
  ).split("\n").map(l => l.split(""));
  const expectedOutput = 37;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("SeatingSystem: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("11/final_input.txt").trimEnd()
  ).split("\n").map(l => l.split(""));

  const expectedOutput = 2093;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("SeatingSystem: Example test from introduction (Part two)", () => {
  const input = (
      "L.LL.LL.LL\n" +
      "LLLLLLL.LL\n" +
      "L.L.L..L..\n" +
      "LLLL.LL.LL\n" +
      "L.LL.LL.LL\n" +
      "L.LLLLL.LL\n" +
      "..L.L.....\n" +
      "LLLLLLLLLL\n" +
      "L.LLLLLL.L\n" +
      "L.LLLLL.LL"
  ).split("\n").map(l => l.split(""));

  const expectedOutput = 26;
  assertStrictEquals(countPart2(input), expectedOutput);
});

Deno.test("SeatingSystem: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("11/final_input.txt").trimEnd()
  ).split("\n").map(l => l.split(""));

  const expectedOutput = 1862;

  assertStrictEquals(countPart2(input), expectedOutput);
});
