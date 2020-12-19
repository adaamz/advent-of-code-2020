type MappedRules = Map<number, string>;

export function countPart1(input: string): number
{
    const [groupRules, groupData] = input.split("\n\n").map(g => g.split("\n"));
    const rules = mapRules(groupRules);

    const regexPattern = ruleToRegex(rules.get(0)!, rules);
    const regex = new RegExp(`^${regexPattern}$`);
    const matches = groupData.filter(data => data.match(regex));
    return matches.length;
}

export function countPart2(input: string): number
{
    input = input.replace(/^8: .*/m, '8: 42 | 42 8').replace(/^11: .*/m, '11: 42 31 | 42 11 31');

    const [groupRules, groupData] = input.split("\n\n").map(g => g.split("\n"));
    const rules = mapRules(groupRules);

    const regexPattern = ruleToRegex(rules.get(0)!, rules);
    const regex = new RegExp(`^${regexPattern}$`);
    //console.log(regexPattern);
    //const sortedRules = new Map([...rules.entries()].sort((a, b) => a[0] - b[0]));
    //sortedRules.forEach((val, key) => console.log(key, ruleToRegex(val, rules)));
    //throw 'XXX';

    const matches = groupData.filter(data => data.match(regex));
    return matches.length;
}

function ruleToRegex(rule: string, rules: MappedRules, wildcardIfMatches: number[]=[]): string
{
    const match = rule.match(/^"(.+)"$/);
    if (match !== null) {
        return match[1];
    }

    rule = rule.replace(/(\d+)/g, (substring) => {
        const n = Number(substring);
        const indexOf = wildcardIfMatches.indexOf(n);

        if ((wildcardIfMatches.filter(id => id === n).length > 2)) {
            wildcardIfMatches.splice(indexOf);
            return '(?:' + ruleToRegex(rule.substr(0, rule.indexOf('|') - 1), rules, wildcardIfMatches) + ')*';
        }

        wildcardIfMatches.push(n);
        const result = ruleToRegex(rules.get(n)!, rules, wildcardIfMatches);
        wildcardIfMatches.splice(indexOf);
        return result;
    }).replace(/ /g, '');

    return `(?:${rule})`;
}

function mapRules(rules: string[]): MappedRules
{
    const mapped: MappedRules = new Map();
    for (const line of rules) {
        const [_, id, rule] = line.match(/^(\d+): (.+)$/)!;
        mapped.set(Number(id), rule);
    }
    return mapped;
}
