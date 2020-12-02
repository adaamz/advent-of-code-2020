import {PasswordWithPolicy} from "../../@types/positions/password_policy.d.ts";

const passwordPolicyLineRegExp = /^(?<position1>\d+)-(?<position2>\d+) (?<letter>[a-z]): (?<password>.*)$/;
type RegexResult = {
    position1: string;
    position2: string;
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
                letterPositions: [
                    Number(lineGroups.position1),
                    Number(lineGroups.position2),
                ],
            },
        });
    }

    return parsed;
}
