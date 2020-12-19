const operations = {
    "+": (left: number, right: number) => left + right,
    "*": (left: number, right: number) => left * right,
};

export function countPart1(input: string[]): number
{
    let sum = 0;

    for (const line of input) {
        const parsedLine = line.replace(/\(/g, "( ").replace(/\)/g, " )").split(/\s+/);

        const [_, newResult] = calculate(0, parsedLine);
        sum += newResult;
    }

    return sum;
}

function calculate(index: number, input: string[]): [number, number]
{
    let left: number|undefined;
    let op: "+"|"*"|undefined;
    let right: number;

    let i = index;
    for (i; i < input.length; i++) {
        const n = input[i];

        if (n === "(") {
            [i, right] = calculate(i+1, input);
            if (left === undefined) {
                left = right;
            } else {
                left = operations[op!](left!, right);
            }
        } else if (n === ')') {
            return [i, left!];
        } else if (n === '+' || n === '*') {
            op = n;
        } else if (!isNaN(Number(n))) {
            if  (left === undefined) {
                left = Number(n);
                continue;
            }
            right = Number(n);
            left = operations[op!](left!, right);
        }
    }

    return [i, left!];
}
