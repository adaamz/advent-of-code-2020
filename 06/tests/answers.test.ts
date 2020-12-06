import {assertStrictEquals} from "../../deps.ts";
import {countUniqueAnswers, countUnitedAnswers} from "../src/answers.ts";

Deno.test("Answers: Example test from introduction (Part one)", () => {
  const input = (
      'abc\n' +
      '\n' +
      'a\n' +
      'b\n' +
      'c\n' +
      '\n' +
      'ab\n' +
      'ac\n' +
      '\n' +
      'a\n' +
      'a\n' +
      'a\n' +
      'a\n' +
      '\n' +
      'b'
  ).split("\n\n");
  const expectedOutput = 11;

  assertStrictEquals(countUniqueAnswers(input), expectedOutput);
});

Deno.test("Answers: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("06/final_input.txt")
  ).split("\n\n");

  const expectedOutput = 6534;

  assertStrictEquals(countUniqueAnswers(input), expectedOutput);
});

Deno.test("Answers: Example test from introduction (Part two)", () => {
  const input = (
      'abc\n' +
      '\n' +
      'a\n' +
      'b\n' +
      'c\n' +
      '\n' +
      'ab\n' +
      'ac\n' +
      '\n' +
      'a\n' +
      'a\n' +
      'a\n' +
      'a\n' +
      '\n' +
      'b'
  ).split("\n\n");

  const expectedOutput = 6;

  assertStrictEquals(countUnitedAnswers(input), expectedOutput);
});

Deno.test("Answers: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("06/final_input.txt").trimEnd()
  ).split("\n\n");

  const expectedOutput = 3402;

  assertStrictEquals(countUnitedAnswers(input), expectedOutput);
});
