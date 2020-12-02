import {assertEquals} from "../../../deps.ts";
import {PasswordWithPolicy} from "../../@types/min_max/password_policy.d.ts";
import {parsePasswordsListWithPolicy} from "../../src/min_max/password_policy_parser.ts";

Deno.test("Password policy parser: Example test from introduction (Part one)", () => {
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
                quantifier: {
                    min: 1,
                    max: 3,
                },
            },
        },
        {
            password: 'cdefg',
            policy: {
                letter: 'b',
                quantifier: {
                    min: 1,
                    max: 3,
                },
            },
        },
        {
            password: 'ccccccccc',
            policy: {
                letter: 'c',
                quantifier: {
                    min: 2,
                    max: 9,
                },
            },
        },
    ];

    assertEquals(parsePasswordsListWithPolicy(input), expectedOutput);
});


Deno.test("Password policy parser: Skips empty line (Part one)", () => {
    const input = ['\n', '', '\r'];
    const expectedOutput: PasswordWithPolicy[] = [];

    assertEquals(parsePasswordsListWithPolicy(input), expectedOutput);
});
