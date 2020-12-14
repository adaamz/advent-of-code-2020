import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/14.ts";

Deno.test("DockingData: Example test from introduction (Part one)", () => {
  const input = (
      "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\n" +
      "mem[8] = 11\n" +
      "mem[7] = 101\n" +
      "mem[8] = 0"
  ).split("\n");
  const expectedOutput = 165;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("DockingData: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("14/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 12408060320841;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("DockingData: Example test from introduction (Part two)", () => {
  const input = (
      "mask = 000000000000000000000000000000X1001X\n" +
      "mem[42] = 100\n" +
      "mask = 00000000000000000000000000000000X0XX\n" +
      "mem[26] = 1"
  ).split("\n");

  const expectedOutput = 208;

  assertStrictEquals(countPart2(input), expectedOutput);
});

Deno.test("DockingData: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("14/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 4466434626828;

  assertStrictEquals(countPart2(input), expectedOutput);
});
