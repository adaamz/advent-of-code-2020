type CommandType = "nop" | "acc" | "jmp";

export function countPart1(input: string[]): number
{
    return runProgram(input).acc;
}

export function countPart2(input: string[]): number
{
    for (let i = 0; i < input.length; i++) {
        let instruction = input[i].substring(0, 3);

        if (instruction === 'acc') {
            continue;
        }
        instruction = swapJmpNop(instruction, input, i);
        const output = runProgram(input);

        if (output.infinite === false) {
            return output.acc;
        }
        instruction = swapJmpNop(instruction, input, i);
    }

    throw 'Bug';
}

function runProgram(input: string[]) {
    const instructions = {
        nop: (arg: number) => {i++},
        acc: (arg: number) => {acc += arg;i++},
        jmp: (arg: number) => {i += arg},
    };
    let acc = 0;
    let i = 0;
    const alreadyRan = [];

    while (i < input.length) {
        if (alreadyRan.indexOf(i) !== -1) {
            return {infinite: true, acc};
        }
        alreadyRan.push(i);

        const [command, arg] = input[i].split(' ');
        instructions[command as CommandType](Number(arg));
    }

    return {infinite: false, acc};
}

function swapJmpNop(instruction: string, input: string[], i: number): string {
    if (instruction === 'jmp') {
        instruction = 'nop';
        input[i] = input[i].replace('jmp', 'nop');
        return instruction;
    }

    instruction = 'jmp';
    input[i] = input[i].replace('nop', 'jmp');
    return instruction;
}
