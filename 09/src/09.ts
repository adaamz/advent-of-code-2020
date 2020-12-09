export function countPart1(input: number[], preambleSize: number): number
{
    // skip first $preambleSize
    for (let i = preambleSize; i < input.length; i++) {
        if (!isValid(input, i - preambleSize, i)) {
            return input[i];
        }
    }

    throw 'Bug';
}

export function countPart2(input: number[], preambleSize: number): number
{
    const lookForSum = countPart1(input, preambleSize);

    let minIndex = 0;
    let maxIndex = 0;
    let currentSum = input[0];

    for (let i = 1; i < input.length; i++) {
        maxIndex = i;
        currentSum += input[i];

        while (currentSum > lookForSum) {
            currentSum -= input[minIndex];
            minIndex++;
        }

        if (currentSum === lookForSum) {
            const min = Math.min.apply(undefined, input.slice(minIndex, maxIndex));
            const max = Math.max.apply(undefined, input.slice(minIndex, maxIndex));
            return min + max;
        }
    }

    throw 'Bug';
}

function isValid(numbers: number[], start: number, stop: number): boolean
{
    const actual = numbers[stop];

    for (let i = start; i <= stop; i++) {
        for (let j = i + 1; j < stop; j++) {
            if (numbers[i] + numbers[j] === actual) {
                return true;
            }
        }
    }

    return false;
}
