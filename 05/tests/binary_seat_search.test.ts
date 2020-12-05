import {assertStrictEquals} from "../../deps.ts";
import {binarySeatSearch, FRONT_BACK, LEFT_RIGHT} from "../src/seat_finder.ts";

Deno.test("BinarySeatSearch: Example test from introduction (FB) (Part one)", () => {
    const input = 'FBFBBFF';
    const expectedOutput = 44;

    assertStrictEquals(binarySeatSearch(FRONT_BACK, input), expectedOutput);
});

Deno.test("BinarySeatSearch: Example test from introduction (LR) (Part one)", () => {
    const input = 'RLR';
    const expectedOutput = 5;

    assertStrictEquals(binarySeatSearch(LEFT_RIGHT, input), expectedOutput);
});

Deno.test("BinarySeatSearch: Example test from introduction (BFFFBBF) (Part one)", () => {
    const input = 'BFFFBBF';
    const expectedOutput = 70;

    assertStrictEquals(binarySeatSearch(FRONT_BACK, input), expectedOutput);
});

Deno.test("BinarySeatSearch: Example test from introduction (RRR) (Part one)", () => {
    const input = 'RRR';
    const expectedOutput = 7;

    assertStrictEquals(binarySeatSearch(LEFT_RIGHT, input), expectedOutput);
});

Deno.test("BinarySeatSearch: Example test from introduction (FFFBBBF) (Part one)", () => {
    const input = 'FFFBBBF';
    const expectedOutput = 14;

    assertStrictEquals(binarySeatSearch(FRONT_BACK, input), expectedOutput);
});

Deno.test("BinarySeatSearch: Example test from introduction (BBFFBBF) (Part one)", () => {
    const input = 'BBFFBBF';
    const expectedOutput = 102;

    assertStrictEquals(binarySeatSearch(FRONT_BACK, input), expectedOutput);
});

Deno.test("BinarySeatSearch: Example test from introduction (RLL) (Part one)", () => {
    const input = 'RLL';
    const expectedOutput = 4;

    assertStrictEquals(binarySeatSearch(LEFT_RIGHT, input), expectedOutput);
});
