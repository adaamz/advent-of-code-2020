import {assertStrictEquals} from "../../deps.ts";
import {validatePasswordList as validateMinMaxPasswordList} from "../src/min_max/password_validator.ts";
import {validatePasswordList as validatePositionsPasswordList} from "../src/positions/password_validator.ts";

Deno.test("Password validator: Example test from introduction (Part one)", () => {
  const input = [
      '1-3 a: abcde',
      '1-3 b: cdefg',
      '2-9 c: ccccccccc',
  ];

  const expectedOutput = 2;

  assertStrictEquals(validateMinMaxPasswordList(input), expectedOutput);
});

Deno.test("Password validator: Example test from introduction (Part two)", () => {
  const input = [
      '1-3 a: abcde',
      '1-3 b: cdefg',
      '2-9 c: ccccccccc',
  ];

  const expectedOutput = 1;

  assertStrictEquals(validatePositionsPasswordList(input), expectedOutput);
});

Deno.test("Password validator: Final test (Part one)", () => {
  const input = (
    Deno.readTextFileSync("02/final_input.txt")
  ).split('\n');

  const expectedOutput = 517;

  assertStrictEquals(validateMinMaxPasswordList(input), expectedOutput);
});

Deno.test("Password validator: Final test (Part two)", () => {
  const input = (
    Deno.readTextFileSync("02/final_input.txt")
  ).split('\n');

  const expectedOutput = 284;

  assertStrictEquals(validatePositionsPasswordList(input), expectedOutput);
});
