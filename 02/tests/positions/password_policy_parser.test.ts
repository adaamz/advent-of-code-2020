import {assertEquals} from "../../../deps.ts";
import {PasswordWithPolicy} from "../../@types/positions/password_policy.d.ts";
import {parsePasswordsListWithPolicy} from "../../src/positions/password_policy_parser.ts";

Deno.test("Password policy parser: Example test from introduction (Part two)", () => {
    const input = [
        '1-3 a: abcde',
        '1-3 b: cdefg',
        '2-9 c: ccccccccc',
    ];

    const expectedOutput: PasswordWithPolicy[] = [
        {
            password: 'abcde',
            policy: {
                letter: 'a',
                letterPositions: [1, 3],
            },
        },
        {
            password: 'cdefg',
            policy: {
                letter: 'b',
                letterPositions: [1, 3],
            },
        },
        {
            password: 'ccccccccc',
            policy: {
                letter: 'c',
                letterPositions: [2, 9],
            },
        },
    ];

    assertEquals(parsePasswordsListWithPolicy(input), expectedOutput);
});


Deno.test("Password policy parser: Skips empty line (Part two)", () => {
    const input = ['\n', '', '\r'];
    const expectedOutput: PasswordWithPolicy[] = [];

    assertEquals(parsePasswordsListWithPolicy(input), expectedOutput);
});
