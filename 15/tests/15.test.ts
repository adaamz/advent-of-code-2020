import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/15.ts";

Deno.test("RambunctiousRecitation: Example test from introduction (Part one)", () => {
  const input = (
      "0,3,6"
  ).split(",").map(Number);
  const expectedOutput = 436;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RambunctiousRecitation: Example test from introduction (Part one)", () => {
  const input = (
      "1,3,2"
  ).split(",").map(Number);
  const expectedOutput = 1;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RambunctiousRecitation: Example test from introduction (Part one)", () => {
  const input = (
      "2,1,3"
  ).split(",").map(Number);
  const expectedOutput = 10;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RambunctiousRecitation: Example test from introduction (Part one)", () => {
  const input = (
      "1,2,3"
  ).split(",").map(Number);
  const expectedOutput = 27;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RambunctiousRecitation: Example test from introduction (Part one)", () => {
  const input = (
      "2,3,1"
  ).split(",").map(Number);
  const expectedOutput = 78;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RambunctiousRecitation: Example test from introduction (Part one)", () => {
  const input = (
      "3,2,1"
  ).split(",").map(Number);
  const expectedOutput = 438;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RambunctiousRecitation: Example test from introduction (Part one)", () => {
  const input = (
      "3,1,2"
  ).split(",").map(Number);
  const expectedOutput = 1836;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("RambunctiousRecitation: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("15/final_input.txt").trimEnd()
  ).split(",").map(Number);

  const expectedOutput = 376;

  assertStrictEquals(countPart1(input), expectedOutput);
});
/*
// todo it works, but it is slow and I don't want to wait 8 minutes on CI pipeline
Deno.test("RambunctiousRecitation: Example test from introduction (Part two)", () => {
  const input = (
      "0,3,6"
  ).split(",").map(Number);

  const expectedOutput = 175594;

  assertStrictEquals(countPart2(input), expectedOutput);
});

Deno.test("RambunctiousRecitation: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("15/final_input.txt").trimEnd()
  ).split(",").map(Number);

  const expectedOutput = 323780;

  assertStrictEquals(countPart2(input), expectedOutput);
});
*/
