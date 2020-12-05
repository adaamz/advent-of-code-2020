import {assertStrictEquals} from "../../deps.ts";
import {findMissingNumberInList} from "../src/math.ts";

Deno.test("FindMissingNumberInList: #1", () => {
    const input = [3, 4, 6, 7, 8, 9];
    const expectedOutput = 5;

    assertStrictEquals(findMissingNumberInList(input), expectedOutput);
});
Deno.test("FindMissingNumberInList: #2", () => {
    const input = [101, 102, 103, 104, 105, 107];
    const expectedOutput = 106;

    assertStrictEquals(findMissingNumberInList(input), expectedOutput);
});
