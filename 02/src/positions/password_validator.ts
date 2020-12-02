import {PasswordWithPolicy} from "../../@types/positions/password_policy.d.ts";
import {parsePasswordsListWithPolicy} from "./password_policy_parser.ts";

export function validatePassword(passwordWithPolicy: PasswordWithPolicy): boolean
{
    const password = passwordWithPolicy.password;
    const policy = passwordWithPolicy.policy;

    let alreadyFound = false;

    for (const position of policy.letterPositions) {
        if (password[position - 1] === policy.letter) {
            if (alreadyFound) {
                return false;
            }

            alreadyFound = true;
        }
    }

    return alreadyFound;
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
