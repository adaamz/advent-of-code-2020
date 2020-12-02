import {PasswordWithPolicy} from "../../@types/min_max/password_policy.d.ts";
import {parsePasswordsListWithPolicy} from "./password_policy_parser.ts";

export function validatePassword(passwordWithPolicy: PasswordWithPolicy): boolean
{
    const password = passwordWithPolicy.password;
    const policy = passwordWithPolicy.policy;

    const foundOccurrences = password.split(policy.letter).length - 1;

    return foundOccurrences >= policy.quantifier.min && foundOccurrences <= policy.quantifier.max;
}

export function validatePasswordList(passwordsWithPolicy: string[]): number
{
    const parsedPasswordsWithPolicy = parsePasswordsListWithPolicy(passwordsWithPolicy);

    let validPasswordsCount = 0;

    for (const passwordWithPolicy of parsedPasswordsWithPolicy) {
        if (validatePassword(passwordWithPolicy)) {
            validPasswordsCount++;
        }
    }

    return validPasswordsCount;
}
