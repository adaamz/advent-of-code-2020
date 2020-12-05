import {assertStrictEquals} from "../../deps.ts";
import {countValidPassports} from "../src/passport_validator.ts";

Deno.test("PassportValidator: Example test from introduction (Part one)", () => {
  const input = (
    'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
    'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
    '\n' +
    'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n' +
    'hcl:#cfa07d byr:1929\n' +
    '\n' +
    'hcl:#ae17e1 iyr:2013\n' +
    'eyr:2024\n' +
    'ecl:brn pid:760753108 byr:1931\n' +
    'hgt:179cm\n' +
    '\n' +
    'hcl:#cfa07d eyr:2025 pid:166559648\n' +
    'iyr:2011 ecl:brn hgt:59in'
  );

  const expectedOutput = 2;

  assertStrictEquals(countValidPassports(input, false), expectedOutput);
});

Deno.test("PassportValidator: Example test from introduction (Part two)", () => {
  const input = (
      'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
      'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
      '\n' +
      'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n' +
      'hcl:#cfa07d byr:1929\n' +
      '\n' +
      'hcl:#ae17e1 iyr:2013\n' +
      'eyr:2024\n' +
      'ecl:brn pid:760753108 byr:1931\n' +
      'hgt:179cm\n' +
      '\n' +
      'hcl:#cfa07d eyr:2025 pid:166559648\n' +
      'iyr:2011 ecl:brn hgt:59in'
  );

  const expectedOutput = 2;

  assertStrictEquals(countValidPassports(input, true), expectedOutput);
});

Deno.test("PassportValidator: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("04/final_input.txt")
  );

  const expectedOutput = 239;

  assertStrictEquals(countValidPassports(input, false), expectedOutput);
});


Deno.test("PassportValidator: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("04/final_input.txt")
  );

  const expectedOutput = 188;

  assertStrictEquals(countValidPassports(input, true), expectedOutput);
});
