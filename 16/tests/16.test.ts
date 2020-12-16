import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/16.ts";

Deno.test("TicketTranslation: Example test from introduction (Part one)", () => {
  const input = (
      "class: 1-3 or 5-7\n" +
      "row: 6-11 or 33-44\n" +
      "seat: 13-40 or 45-50\n" +
      "\n" +
      "your ticket:\n" +
      "7,1,14\n" +
      "\n" +
      "nearby tickets:\n" +
      "7,3,47\n" +
      "40,4,50\n" +
      "55,2,20\n" +
      "38,6,12"
  );
  const expectedOutput = 71;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("TicketTranslation: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("16/final_input.txt").trimEnd()
  );

  const expectedOutput = 26988;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("TicketTranslation: Example test from introduction (Part two)", () => {
  const input = (
      "class: 0-1 or 4-19\n" +
      "row: 0-5 or 8-19\n" +
      "seat: 0-13 or 16-19\n" +
      "\n" +
      "your ticket:\n" +
      "11,12,13\n" +
      "\n" +
      "nearby tickets:\n" +
      "3,9,18\n" +
      "15,1,5\n" +
      "5,14,9"
  );

  // used more for debugging than real test, this will be always right as it just multiply everything...
  const expectedOutput = 1716;

  assertStrictEquals(countPart2(input, ""), expectedOutput);
});

Deno.test("TicketTranslation: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("16/final_input.txt").trimEnd()
  );

  const expectedOutput = 426362917709;

  assertStrictEquals(countPart2(input, "departure"), expectedOutput);
});
