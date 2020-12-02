import {PasswordWithPolicy} from "../../@types/min_max/password_policy.d.ts";

const passwordPolicyLineRegExp = /^(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>.*)$/;
type RegexResult = {
    min: string;
    max: string;
    letter: string;
    password: string;
};

export function parsePasswordsListWithPolicy(passwordsWithPolicy: string[]): PasswordWithPolicy[]
{
    const parsed: PasswordWithPolicy[] = [];

    for (const line of passwordsWithPolicy) {
        if (line.trim() === '') {
            continue;
        }

        const lineMatch = line.match(passwordPolicyLineRegExp);

        if (lineMatch === null) {
            throw `Line ${line} is not valid input!`;
        }

        const lineGroups = lineMatch.groups as RegexResult;

        parsed.push({
            password: lineGroups.password,
            policy: {
                letter: lineGroups.letter,
                quantifier: {
                    min: Number(lineGroups.min),
                    max: Number(lineGroups.max),
                },
            },
        });
    }

    return parsed;
}
