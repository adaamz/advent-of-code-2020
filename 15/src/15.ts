export function countPart1(input: number[]): number
{
    return calculateNth(input, 2020);
}

export function countPart2(input: number[]): number
{
    // Object
    // 6 minutes in Node (using Object) :O
    // 144s in Deno (using Object) :O

    // Map
    // 6 seconds in Node (using Map)
    // 5 seconds in Deno (using Map)
    return calculateNth(input, 30000000);
}

function calculateNth(input: number[], nth: number) {
    const start = new Date();
    let previousNumber = input[input.length - 1];
    const indexes = new Map<number, number>();

    for (let i = 0; i < input.length - 1; i++) {
        indexes.set(input[i], i + 1);
    }

    for (let i = input.length; i < nth; i++) {
        const previousPosition = indexes.get(previousNumber);
        indexes.set(previousNumber, i);

        if (previousPosition === undefined) {
            previousNumber = 0;
        } else {
            previousNumber = i - previousPosition;
        }
    }

    const end = new Date();

    console.log(start, end);

    return previousNumber;
}
