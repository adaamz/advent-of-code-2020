type Mem = {[index: string]: number};
type FloatingMem = {[index: string]: number};

export function countPart1(input: string[]): number
{
    let mask: string;
    const mem: Mem = {};

    for (const line of input) {
        const parsedMask = line.match(/^mask = (?<mask>[01X]+)$/);
        if (parsedMask && parsedMask.groups) {
            mask = parsedMask.groups["mask"].split("").reverse().join("");
            continue;
        }

        const parsedAssignment = line.match(/^mem\[(?<index>\d+)\] = (?<value>\d+)$/);
        if (!parsedAssignment || !parsedAssignment.groups) {
            throw `Invalid line "${line}"`;
        }

        const index = parsedAssignment.groups["index"];
        mem[index] = calculateValue(mask!, Number(parsedAssignment.groups["value"]).toString(2).split("").reverse());
    }

    const mapped = Object.keys(mem).map(key => mem[key]);
    const sum = mapped.reduce((n, prev) => n + prev, 0);

    return sum;
}

export function countPart2(input: string[]): number
{
    let mask: string;
    const mem: FloatingMem = {};

    for (const line of input) {
        const parsedMask = line.match(/^mask = (?<mask>[01X]+)$/);
        if (parsedMask && parsedMask.groups) {
            mask = parsedMask.groups["mask"].split("").reverse().join("");
            continue;
        }

        const parsedAssignment = line.match(/^mem\[(?<index>\d+)\] = (?<value>\d+)$/);
        if (!parsedAssignment || !parsedAssignment.groups) {
            throw `Invalid line "${line}"`;
        }

        const indexes = calculateIndexes(mask!, mem, Number(parsedAssignment.groups["index"]).toString(2).split("").reverse());
        const value = Number(parsedAssignment.groups["value"]);
        for (const index of indexes) {
            mem[index] = value;
        }
    }

    const mapped = Object.keys(mem).map(key => mem[key]);
    const sum = mapped.reduce((n, prev) => n + prev, 0);

    return sum;
}

function calculateValue(mask: string, binValue: string[]): number
{
    const newValue = "000000000000000000000000000000000000".split(""); // 36 chars

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 'X') {
            newValue[i] = binValue[i] || "0";
        } else {
            newValue[i] = mask[i];
        }
    }

    return parseInt(newValue.reverse().join(""), 2);
}

function calculateIndexes(mask: string, mem: FloatingMem, binIndex: string[]): number[]
{
    const newIndexMasked = "000000000000000000000000000000000000".split(""); // 36 chars
    const newIndexes: string[][] = [];
    const floatingPositions = [];

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '0') {
            newIndexMasked[i] = binIndex[i] || "0";
        } else {
            newIndexMasked[i] = mask[i];
            if (mask[i] === 'X') {
                floatingPositions.push(i);
            }
        }
    }

    for (let i = 0; i < Math.pow(2, floatingPositions.length); i++) {
        const bin = i.toString(2).split("");
        const newIndex = [...newIndexMasked];

        for (let f = 0; f < floatingPositions.length; f++) {
            newIndex[floatingPositions[f]] = bin[bin.length - f - 1] || "0";
        }
        newIndexes.push(newIndex);
    }

    return newIndexes.map(index => {
        const dec = parseInt(index.reverse().join(""), 2);
        return dec;
    });
}
