export function countUniqueAnswers(groups: string[]): number
{
    let sum = 0;

    for (const group of groups) {
        const letters = group.replace(/\s+/g, "").split("");
        sum += new Set(letters).size;
    }

    return sum;
}

export function countUnitedAnswers(groups: string[]): number
{
    let sum = 0;

    for (const group of groups) {
        const peopleAnswers = group.split("\n").map(g => g.split(""));
        const sameAnswers = peopleAnswers.reduce(intersect, peopleAnswers[0]);

        sum += sameAnswers.length;
    }

    return sum;
}

function intersect<T>(list1: T[], list2: T[]): T[]
{
    return list1.filter(v => list2.indexOf(v) !== -1);
}
