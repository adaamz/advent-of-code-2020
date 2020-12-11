import {assertStrictEquals} from "../../deps.ts";
import {countPart1} from "../src/10.ts";

Deno.test("AdapterArray: Example test from introduction (Part one)", () => {
  const input = (
      "16\n" +
      "10\n" +
      "15\n" +
      "5\n" +
      "1\n" +
      "11\n" +
      "7\n" +
      "19\n" +
      "6\n" +
      "12\n" +
      "4"
  ).split("\n").map(Number);
  const expectedOutput = 35;

  assertStrictEquals(countPart1(input), expectedOutput);
});

// part 2 not implemented
