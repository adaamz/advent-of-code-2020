import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/09.ts";

Deno.test("EncodingError: Example test from introduction (Part one)", () => {
  const input = (
      "35\n" +
      "20\n" +
      "15\n" +
      "25\n" +
      "47\n" +
      "40\n" +
      "62\n" +
      "55\n" +
      "65\n" +
      "95\n" +
      "102\n" +
      "117\n" +
      "150\n" +
      "182\n" +
      "127\n" +
      "219\n" +
      "299\n" +
      "277\n" +
      "309\n" +
      "576"
  ).split("\n").map(Number);
  const expectedOutput = 127;

  assertStrictEquals(countPart1(input, 5), expectedOutput);
});

Deno.test("EncodingError: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("09/final_input.txt")
  ).split("\n").map(Number);

  const expectedOutput = 1038347917;

  assertStrictEquals(countPart1(input, 25), expectedOutput);
});

Deno.test("EncodingError: Example test from introduction (Part two)", () => {
  const input = (
      "35\n" +
      "20\n" +
      "15\n" +
      "25\n" +
      "47\n" +
      "40\n" +
      "62\n" +
      "55\n" +
      "65\n" +
      "95\n" +
      "102\n" +
      "117\n" +
      "150\n" +
      "182\n" +
      "127\n" +
      "219\n" +
      "299\n" +
      "277\n" +
      "309\n" +
      "576"
  ).split("\n").map(Number);

  const expectedOutput = 62;

  assertStrictEquals(countPart2(input, 5), expectedOutput);
});

Deno.test("EncodingError: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("09/final_input.txt").trimEnd()
  ).split("\n").map(Number);

  const expectedOutput = 137394018;

  assertStrictEquals(countPart2(input, 25), expectedOutput);
});
