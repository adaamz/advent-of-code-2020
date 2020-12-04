import {parsePassports} from "./passports_parser.ts";

export function countValidPassports(passportsInput: string, strictValidation: boolean): number
{
    const passports = parsePassports(passportsInput, strictValidation);

    return passports.length;
}
