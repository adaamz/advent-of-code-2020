const EMPTY = 'L';
const FLOOR = '.';
const OCCUPIED = '#';

type Settings = {
    shouldBeReleased: (matrix: string[][], row: number, column: number) => boolean;
    shouldBeOccupied: (matrix: string[][], row: number, column: number) => boolean;
};

export function countPart1(input: string[][]): number
{
    const settings = {shouldBeReleased: makeShouldBeReleased(4, 1), shouldBeOccupied: makeShouldBeOccupied(1)};
    let previousRound = input;
    let numberOfChanges;
    let occupiedPlaces;

    do {
        [previousRound, numberOfChanges, occupiedPlaces] = makeRound(previousRound, settings);
    } while(numberOfChanges > 0);

    return occupiedPlaces;
}

export function countPart2(input: string[][]): number
{
    const settings = {shouldBeReleased: makeShouldBeReleased(5, Infinity), shouldBeOccupied: makeShouldBeOccupied(Infinity)};
    let previousRound = input;
    let numberOfChanges;
    let occupiedPlaces;

    do {
        [previousRound, numberOfChanges, occupiedPlaces] = makeRound(previousRound, settings);
    } while(numberOfChanges > 0);

    return occupiedPlaces;
}

function makeRound(places: string[][], settings: Settings): [string[][], number, number]
{
    const newPlaces: string[][] = [];
    let numberOfChanges = 0;
    let occupiedPlaces = 0;

    for (let row = 0; row < places.length; row++) {
        newPlaces.push([...places[row]]);

        for (let column = 0; column < places[row].length; column++) {
            if (settings.shouldBeOccupied(places, row, column)) {
                newPlaces[row][column] = OCCUPIED;
                occupiedPlaces++;
                numberOfChanges++;
            } else if (settings.shouldBeReleased(places, row, column)) {
                newPlaces[row][column] = EMPTY;
                numberOfChanges++;
            } else if (places[row][column] === OCCUPIED) {
                occupiedPlaces++;
            }
        }
    }

    return [newPlaces, numberOfChanges, occupiedPlaces];
}

function makeShouldBeOccupied(lineSight: number): Settings["shouldBeOccupied"]
{
    return function(places: string[][], row: number, column: number): boolean {
        return places[row][column] === EMPTY
            && totalAdjacentPlacesOfType(places, row, column, OCCUPIED, lineSight) === 0;
    };
}

function makeShouldBeReleased(minimum: number, lineSight: number): Settings["shouldBeReleased"]
{
    return function(places: string[][], row: number, column: number): boolean {
        return places[row][column] === OCCUPIED
            && totalAdjacentPlacesOfType(places, row, column, OCCUPIED, lineSight) >= minimum;
    };
}

function totalAdjacentPlacesOfType(places: string[][], row: number, column: number, type: typeof EMPTY | typeof OCCUPIED, lineSight: number): number
{
    let total = 0;

    for (const yOffset of [-1, 0, 1]) {
        for (const xOffset of [-1, 0, 1]) {
            let saw = 0;

            while (
                (saw++ < lineSight) &&
                (yOffset !== 0 || xOffset !== 0) && // self
                (row + yOffset * saw >= 0 && row + yOffset * saw < places.length) &&
                (column + xOffset * saw >= 0 && column + xOffset * saw < places[row].length)
            ) {
                if (places[row + yOffset * saw][column + xOffset * saw] === type) {
                    total++;
                    break;
                }

                if (places[row + yOffset * saw][column + xOffset * saw] !== FLOOR) {
                    break;
                }
            }
        }
    }

    return total;
}
