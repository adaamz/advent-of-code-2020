import {assertStrictEquals} from "../../deps.ts";
import {getHighestSeatID, getMissingSeatID, getSeatID} from "../src/seat_finder.ts";

Deno.test("SeatFinder: Example test from introduction (Part one)", () => {
  const input = 'FBFBBFFRLR';
  const expectedOutput = 357;

  assertStrictEquals(getSeatID(input), expectedOutput);
});

Deno.test("SeatFinder: Example test from introduction (Highest seat ID) (Part one)", () => {
  const input = [
      'BFFFBBFRRR',
      'FFFBBBFRRR',
      'BBFFBBFRLL',
  ];
  const expectedOutput = 820;

  assertStrictEquals(getHighestSeatID(input), expectedOutput);
});

Deno.test("SeatFinder: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("05/final_input.txt")
  ).split("\n").filter(Boolean);

  const expectedOutput = 963;

  assertStrictEquals(getHighestSeatID(input), expectedOutput);
});

Deno.test("SeatFinder: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("05/final_input.txt")
  ).split("\n").filter(Boolean);

  const expectedOutput = 592;

  assertStrictEquals(getMissingSeatID(input), expectedOutput);
});
