import {assertStrictEquals} from "../../deps.ts";
import {countPart1} from "../src/13.ts";

Deno.test("ShuttleSearch: Example test from introduction (Part one)", () => {
  const input = [
      "939",
      "7,13,x,x,59,x,31,19"
  ];
  const expectedOutput = 295;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("ShuttleSearch: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("13/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 410;

  assertStrictEquals(countPart1(input), expectedOutput);
});

// part 2 not implemented
