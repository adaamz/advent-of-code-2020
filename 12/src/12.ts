const directionsMatrix = [
    [1, 0], // east
    [0, -1], // south
    [-1, 0], // west
    [0, 1], // north
];
type Coordinates = [number, number];
const directionsMatrixRotation: Record<Angles, (waypointPosition: Coordinates) => Coordinates> = {
    "90": (waypointPosition: Coordinates): Coordinates => [-waypointPosition[1], waypointPosition[0]],
    "180": (waypointPosition: Coordinates): Coordinates => [-waypointPosition[0], -waypointPosition[1]],
    "270": (waypointPosition: Coordinates): Coordinates => [waypointPosition[1], -waypointPosition[0]],
};
type Angles = '90'|'180'|'270';
type InstructionType = ('N'|'S'|'E'|'W')|('L'|'R')|'F';

function countDistance(instructionsCallbacks: Record<InstructionType, (arg: number) => void>, instructions: string[], position: Coordinates) {
    const instructionRegex = new RegExp(`^(${Object.keys(instructionsCallbacks).join('|')})(\\d+)$`);

    for (const instruction of instructions) {
        const parsed = instruction.match(instructionRegex);
        if (!parsed) {
            throw `Invalid line "${instruction}"`;
        }
        instructionsCallbacks[parsed[1] as InstructionType](Number(parsed[2]));
    }

    return Math.abs(position[0]) + Math.abs(position[1]);
}

export function countPart1(instructions: string[]): number
{
    let direction = directionsMatrix[0]; // default is east
    const position: Coordinates = [0, 0]; // east:0, north:0

    const instructionsCallbacks: Record<InstructionType, (arg: number) => void> = {
        'N': (arg: number) => {position[1] += arg;},
        'S': (arg: number) => {position[1] -= arg;},
        'E': (arg: number) => {position[0] += arg;},
        'W': (arg: number) => {position[0] -= arg;},
        'L': (arg: number) => {direction = directionsMatrix[(directionsMatrix.length + (directionsMatrix.indexOf(direction) - arg/90)) % directionsMatrix.length];},
        'R': (arg: number) => {direction = directionsMatrix[(directionsMatrix.indexOf(direction) + arg/90) % directionsMatrix.length];},
        'F': (arg: number) => {position[0] += direction[0] * arg; position[1] += direction[1] * arg;},
    };

    return countDistance(instructionsCallbacks, instructions, position);
}

export function countPart2(instructions: string[]): number
{
    const shipPosition: Coordinates = [0, 0]; // east:0, north:0
    let waypointPosition: Coordinates = [10, 1]; // east:10, north:1

    const instructionsCallbacks: Record<InstructionType, (arg: number) => void> = {
        'N': (arg: number) => {waypointPosition[1] += arg;},
        'S': (arg: number) => {waypointPosition[1] -= arg;},
        'E': (arg: number) => {waypointPosition[0] += arg;},
        'W': (arg: number) => {waypointPosition[0] -= arg;},
        'L': (arg: number) => {waypointPosition = directionsMatrixRotation[arg.toString() as Angles](waypointPosition);},
        'R': (arg: number) => {waypointPosition = directionsMatrixRotation[(360 - arg).toString() as Angles](waypointPosition);},
        'F': (arg: number) => {shipPosition[0] += waypointPosition[0] * arg; shipPosition[1] += waypointPosition[1] * arg;},
    };

    return countDistance(instructionsCallbacks, instructions, shipPosition);
}
