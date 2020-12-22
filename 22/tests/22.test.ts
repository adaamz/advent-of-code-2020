import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/22.ts";

Deno.test("Crab Compat: Example test from introduction (Part one)", () => {
    const input = (
        "Player 1:\n" +
        "9\n" +
        "2\n" +
        "6\n" +
        "3\n" +
        "1\n" +
        "\n" +
        "Player 2:\n" +
        "5\n" +
        "8\n" +
        "4\n" +
        "7\n" +
        "10"
    );
    const expectedOutput = 306;

    assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("Crab Compat: Final test (Part one)", () => {
    const input = (
        Deno.readTextFileSync("22/final_input.txt").trimEnd()
    );

    const expectedOutput = 33559;

    assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("Crab Compat: Example test from introduction (Part two)", () => {
    const input = (
        "Player 1:\n" +
        "9\n" +
        "2\n" +
        "6\n" +
        "3\n" +
        "1\n" +
        "\n" +
        "Player 2:\n" +
        "5\n" +
        "8\n" +
        "4\n" +
        "7\n" +
        "10"
    );

    const expectedOutput = 291;

    assertStrictEquals(countPart2(input), expectedOutput);
});

Deno.test("Crab Compat: Final test (Part two)", () => {
    const input = (
        Deno.readTextFileSync("22/final_input.txt").trimEnd()
    );

    const expectedOutput = 32789;

    assertStrictEquals(countPart2(input), expectedOutput);
});
