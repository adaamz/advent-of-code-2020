const NO_BAGS = 'no other bags';
const RULE_REGEX = new RegExp(`^([a-z ]+) bags contain (.+|${NO_BAGS})\.$`);
const BAG_REGEX = /(\d+) ([a-z ]+) bags?/g;
const MY_BAG = 'shiny gold';

type BagTypesNode = {count: number; bag: string }[];
type Variants = {[parent: string]: BagTypesNode};

export function countBaggageVariants(input: string[]): number
{
    const variants = extractVariants(input);

    return (new Set(findPossibilities(variants))).size;
}

export function countIndividualBagsRequired(input: string[]): number
{
    const variants = extractVariants(input);

    return countContained(variants, variants[MY_BAG]) - 1;
}

function extractVariants(input: string[]) {
    const variants: Variants = {};

    for (const line of input) {
        const match = line.match(RULE_REGEX);
        if (match === null) {
            throw `Invalid line ${line}`;
        }
        const [, parentBagType, containedBagTypesStr] = match;
        if (containedBagTypesStr === NO_BAGS) {
            continue;
        }

        const matchBags = containedBagTypesStr.matchAll(BAG_REGEX);
        variants[parentBagType] = [...matchBags].map(m => {
            return {
                count: Number(m[1]),
                bag: m[2],
            };
        });
    }

    return variants;
}

function findPossibilities(variants: Variants): string[] {
    const possibilities = [];

    for (const parent in variants) {
        const contained = isContained(variants, variants[parent]);
        if (contained) {
            possibilities.push(parent);
        }
    }

    return possibilities;
}

function isContained(variants: Variants, bagTypes: BagTypesNode): boolean
{
    for (const bagType of bagTypes) {
        if (Object.prototype.hasOwnProperty.call(variants, bagType.bag)) {
            if (isContained(variants, variants[bagType.bag])) {
                return true;
            }
        }

        if (bagType.bag === MY_BAG) {
            return true;
        }
    }

    return false;
}

function countContained(variants: Variants, bagTypes: BagTypesNode): number
{
    let sum = 1;

    for (const bagType of bagTypes) {
        if (Object.prototype.hasOwnProperty.call(variants, bagType.bag)) {
            const contained = countContained(variants, variants[bagType.bag]);
            sum += bagType.count * contained;
        } else {
            sum += bagType.count;
        }
    }

    return sum;
}
