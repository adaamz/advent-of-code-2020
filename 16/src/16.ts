type Range = {
    min: number;
    max: number;
}
type Ranges = [Range, Range];

export function countPart1(input: string): number
{
    const parsed = parse(input);
    const invalidTickets = parsed.nearbyTicketsIDsChunked.map(tickets =>
        tickets.filter((ticket: number) => !isValid(parsed.rangesGroups, ticket))
    );

    return invalidTickets.reduce((prev: number, val: number[]) => prev + val.reduce((prev, number) => prev+number, 0), 0);
}

export function countPart2(input: string, onlyPrefix: string): number
{
    const parsed = parse(input);
    const validTickets = parsed.nearbyTicketsIDsChunked.filter(tickets =>
        tickets.every((ticket: number) => isValid(parsed.rangesGroups, ticket))
    );

    const realGroups = guessGroupNames(validTickets, parsed.rangesGroups, parsed.groups);

    return [...parsed.groups.values()].filter(k => k.indexOf(onlyPrefix) === 0).reduce((prev: number, val) => {
        return prev * parsed.yourTicketIDs[realGroups[val]];
    }, 1);
}

function guessGroupNames(validTickets: number[][], rangesGroups: Ranges[], groups: Map<number, string>): {[key: string]: number}
{
    const variants = generateVariants(validTickets, rangesGroups, groups);
    treeShakeVariants(groups, variants);

    const realGroups: {[groupName: string]: number} = {};

    for (const groupName of variants.keys()) {
        const index = variants.get(groupName);
        if (index === undefined) {throw `group name ${groupName} not in variants 3`;}
        if (index.size !== 1) {
            throw `Bug: ${groupName} has ${index.size} elements`;
        }
        realGroups[groupName] = [...index][0];
    }

    return realGroups;
}

/**
 * Generate all possible variants, which met condition that all column is somehow valid for the group
 * eg. column 3 is valid for group 0 if all values from column 3 for all records are valid values for group 0, but this validation can met multiple columns...
 */
function generateVariants(validTickets: number[][], rangesGroups: Ranges[], groups: Map<number, string>): Map<string, Set<number>>
{
    const variants = new Map<string, Set<number>>();

    for (let g = 0; g < groups.size; g++) {
        const groupName = groups.get(g);
        if (groupName === undefined) {throw `Undefined group ID for ${g}`;}

        if (!variants.has(groupName)) {
            variants.set(groupName, new Set<number>());
        }
        const ranges = rangesGroups[g];

        for (let c = 0; c < groups.size; c++) {
            let valid = true;
            for (let t = 0; t < validTickets.length; t++) {
                if (!isValidRanges(ranges, validTickets[t][c])) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                const s = variants.get(groupName);
                if (s === undefined) {throw groupName;}
                variants.set(groupName, s.add(c));
            }
        }
    }

    return variants;
}

/**
 * Try to exclude IDs which are the only possibility to be ID for some group
 * eg. group "departure" has only 1 variant eg. 9 => remove 9 from OTHER groups, and then repeat it again (some other groups can contain only 1 variant)
 */
function treeShakeVariants(groups: Map<number, string>, variants: Map<string, Set<number>>): void
{
    const removedNumbers = [];
    let removedSomething = false;
    do {
        removedSomething = false;
        let id;
        for (const groupName of groups.values()) {
            const ids = variants.get(groupName);
            if (ids === undefined) {throw `${groupName} not in variants`;}
            id = [...ids][0];
            // if group variant contains only 1 variant, then remove it from other group variants
            if (ids.size === 1 && removedNumbers.indexOf(id) === -1) {
                removedNumbers.push(id);
                break;
            } else {
                id = undefined;
            }
        }

        // if there is something to remove
        if (id !== undefined) {
            for (const groupName of groups.values()) {
                const idsRemoving = variants.get(groupName);
                if (idsRemoving === undefined) {throw `${groupName} not in variants 2`;}
                // if it is not the group variant which was found in previous step => remove the ID
                if (idsRemoving.size !== 1) {
                    idsRemoving.delete(id);
                    variants.set(groupName, idsRemoving);
                    removedSomething = true;
                }
            }
        } else {
            break;
        }
    } while(removedSomething);
}

function parse(input: string)
{
    const groupsObj = input.match(/([a-z ]+):/g)?.map(g => g.slice(0, -1))?.slice(0, -2);
    if (!groupsObj) {
        throw 'Invalid input (groups)';
    }
    const groups = new Map<number, string>();
    let i = 0;
    for (const g of groupsObj) {
        groups.set(i++, g);
    }
    const rangesGroups = [...input.matchAll(/(\d+-\d+) or (\d+-\d+)/g)].map(m => {
        return m.slice(1);
    }).map(ranges => ranges.map((range: string): Range => {
        const splited = range.split("-");
        return {min: Number(splited[0]), max: Number(splited[1])};
    })) as Ranges[];
    const nearbyTicketsText = input.match(/nearby tickets:\n([\s\S]+)/m);
    if (!nearbyTicketsText) {
        throw 'Invalid input (no nearby tickets)';
    }
    const nearbyTicketIDs = nearbyTicketsText[1].match(/(\d+)/g)?.map(Number);
    if (!nearbyTicketIDs) {
        throw 'Invalid input (nerby tickets)';
    }
    const nearbyTicketsIDsChunked = chunkList(nearbyTicketIDs, groups.size);

    const yourTicketsText = input.match(/your ticket:\n(.+)\n/);
    if (!yourTicketsText) {
        throw 'Invalid input (no your tickets)';
    }
    const yourTicketIDs = yourTicketsText[1].match(/(\d+)/g)?.map(Number);
    if (!yourTicketIDs) {
        throw 'Invalid input (your tickets)';
    }

    return {nearbyTicketsIDsChunked, rangesGroups, groups, yourTicketIDs};
}

function isValid(groups: Ranges[], number: number): boolean
{
    for (const ranges of groups) {
        if (isValidRanges(ranges, number)) {
            return true;
        }
    }

    return false;
}

function isValidRanges(ranges: Ranges, number: number): boolean
{
    return isValidRange(ranges[0], number) || isValidRange(ranges[1], number);
}

function isValidRange(range: Range, number: number): boolean
{
    return range.min <= number && range.max >= number;
}

function chunkList(array: number[], chunkSize: number): number[][]
{
    const chunkedList = [];

    for (let i = 0, j = array.length; i < j; i += chunkSize) {
        chunkedList.push(array.slice(i, i + chunkSize));
    }

    return chunkedList;
}

function mapFlip<K, V>(map: Map<K, V>): Map<V, K>
{
    return [...map.keys()].reduce((ret, key) => {
        ret.set(map.get(key), key);
        return ret;
    }, new Map());
}
