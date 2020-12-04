export type Passport = {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid?: string;
};
const validKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

export function parsePassports(passportsInput: string, strictValidation: boolean): Passport[]
{
    const passports = passportsInput.split("\n\n");

    const typedPassports = [];

    for (const passport of passports) {
        const typedPassport = parsePassport(passport, strictValidation);
        if (typedPassport !== undefined) {
            typedPassports.push(typedPassport);
        }
    }

    return typedPassports;
}

function parsePassport(passportInput: string, strictValidation: boolean): Passport | undefined
{
    passportInput = passportInput.replace(/\n/g, " ");
    const passport: Partial<Passport> = {};
    const keyValuePairs = passportInput.split(" ");

    for (const kv of keyValuePairs) {
        const [key, value] = kv.split(":");

        if (isValidPassportProperty(key)) {
            passport[key] = value;
        }
    }

    if (!isValidPassport(passport, strictValidation)) {
        return undefined;
    }

    return passport;
}

// typescript doesnt resolve key in validKeys natively :-/
function isValidPassportProperty(key: string): key is keyof Passport
{
    return validKeys.indexOf(key) > -1;
}

function isValidPassport(passport: Partial<Passport>, strict: boolean): passport is Passport
{
    if (passport.byr === undefined) {
        console.log(passport, `undefined byr`);
        return false;
    } else if (strict && (Number(passport.byr) < 1920 || Number(passport.byr) > 2002)) {
        console.log(passport, `invalid byr ${passport.byr}`);
        return false;
    }

    if (passport.iyr === undefined) {
        console.log(passport, `undefined iyr`);
        return false;
    } else if (strict && (Number(passport.iyr) < 2010 || Number(passport.iyr) > 2020)) {
        console.log(passport, `invalid iyr ${passport.iyr}`);
        return false;
    }

    if (passport.eyr === undefined) {
        console.log(passport, `undefined eyr`);
        return false;
    } else if (strict && (Number(passport.eyr) < 2020 || Number(passport.eyr) > 2030)) {
        console.log(passport, `invalid eyr ${passport.eyr}`);
        return false;
    }

    if (passport.hgt === undefined) {
        console.log(passport, `undefined hgt`);
        return false;
    } else if (strict) {
        if (passport.hgt.length < 4) {
            console.log(passport, "short hgt");
            return false;
        }

        const measure = passport.hgt.substr(-2);
        const h = Number(passport.hgt.substr(0, passport.hgt.length - 2));

        if (
            (measure === "cm" && (h < 150 || h > 193))
            ||
            (measure === "in" && (h < 59 || h > 79))
        ) {
            console.log(`invalid value hgt ${passport.hgt} (${h} ${measure})`);
            return false;
        }
    }

    if (passport.hcl === undefined) {
        console.log(passport, "undefined hcl");
        return false;
    } else if (strict && passport.hcl.match(/#([a-f0-9]{6})$/) === null) {
        console.log(passport, `invalid hcl ${passport.hcl}`);
        return false;
    }

    if (passport.ecl === undefined) {
        console.log(passport, "undefined ecl");
        return false;
    } else if (strict && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(passport.ecl) === -1) {
        console.log(passport, `invalid ecl ${passport.ecl}`);
        return false;
    }

    if (passport.pid === undefined) {
        console.log(passport, "undefined pid");
        return false;
    } else if(strict && passport.pid.match(/^\d{9}$/) === null) {
        console.log(passport, `invalid pid ${passport.pid}`);
        return false;
    }

    return true;
}
