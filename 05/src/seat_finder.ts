import {findMissingNumberInList} from "./math.ts";

type DivideIntervalConfig = {
    low: string;
    high: string;
};
export const FRONT_BACK: DivideIntervalConfig = {low: 'F', high: 'B'};
export const LEFT_RIGHT: DivideIntervalConfig = {low: 'L', high: 'R'};

export function getMissingSeatID(sequences: string[]): number
{
    const allSeatIDs = getAllSeatIDs(sequences).sort((a, b) => a - b);

    return findMissingNumberInList(allSeatIDs);
}

export function getHighestSeatID(sequences: string[]): number
{
    return Math.max.apply(undefined, getAllSeatIDs(sequences));
}

function getAllSeatIDs(sequences: string[]): number[]
{
    return sequences.map(getSeatID);
}

export function getSeatID(sequence: string): number
{
    const rowSequence = sequence.substring(0, 7);
    const row = binarySeatSearch(FRONT_BACK, rowSequence);

    const columnSequence = sequence.substring(7);
    const column = binarySeatSearch(LEFT_RIGHT, columnSequence);

    return calculateSeatID(column, row);
}

function calculateSeatID(column: number, row: number): number
{
    return row * 8 + column;
}

export function binarySeatSearch(config: DivideIntervalConfig, sequence: string): number
{
    let i = 2**sequence.length;
    let currentLow = 0;
    let currentHigh = i - 1;
    let letter;

    for (letter of sequence) {
        i /= 2;

        if (letter === config.low) {
            currentHigh -= i;
        } else if (letter === config.high) {
            currentLow += i;
        } else {
            throw `Letter is ${letter} of "${sequence}" but is not config.low (${config.low}) neither config.high (${config.high})! Wrong config?`;
        }
    }

    return letter === config.low ? currentLow : currentHigh;
}
