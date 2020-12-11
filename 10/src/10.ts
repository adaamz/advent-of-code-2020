export function countPart1(input: number[]): number
{
    input = input.sort((a, b) => b - a); // sorted descending
    const usedDifferences = {
        "1": 1,
        "3": 1,
    };
    for (let i = 0; i < input.length - 1; i++) {
        const diff = input[i] - input[i + 1];
        usedDifferences["1"] += diff % 3;
        usedDifferences["3"] += Math.floor(diff / 3);
    }

    return usedDifferences["1"] * usedDifferences["3"];
}

// part 2 not implemented
