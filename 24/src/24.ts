const directions = {
    e: {y: 0, x: 1},
    se: {y: 1, x: 0.5},
    sw: {y: 1, x: -0.5},
    w: {y: 0, x: -1},
    nw: {y: -1, x: -0.5},
    ne: {y: -1, x: 0.5},
};
const WHITE = false; // is default, !undefined => true
const BLACK = true;

export function countPart1(input: string[]): number
{
    return fillFloor(input)[0];
}

type Floor = Map<number, Map<number, typeof WHITE | typeof BLACK>>;

export function countPart2(input: string[]): number
{
    let ref = {blackTiles: 0};
    let floor: Floor;
    [ref.blackTiles, floor] = fillFloor(input);

    for (let day = 0; day < 1; day++) {
        console.log(`\n=== day ${day + 1} ===`);

        console.log("before");
        prettyPrint(floor);

        floor = makeTransition(floor, ref);

        console.log("after");
        prettyPrint(floor);
    }

    return ref.blackTiles;
}

function trySwapTile(x: number, y: number, floor: Floor, newFloor: Floor, ref: {blackTiles: number}, isNew=false): void
{
    //console.log({y, x, isNew});

    const row = floor.get(y);
    const column = row?.get(x);

    const neighbours = new Map();
    neighbours.set(WHITE, 0);
    neighbours.set(BLACK, 0);

    for (const direction of Object.values(directions)) {
        const neighbourX = x + direction.x;
        const neighbourY = y + direction.y;

        const neighbourRow = floor.get(neighbourY) || new Map();
        const neighbourExists = neighbourRow.has(neighbourX);
        const neighbourColumn = neighbourRow.get(neighbourX) || WHITE;
        const newNeighbourRow = newFloor.get(neighbourY) || new Map();
        newNeighbourRow.set(neighbourX, neighbourColumn);
        newFloor.set(neighbourY, newNeighbourRow);

        if (!neighbourExists && !isNew) {
            //console.log(`from `, {y, x}, " to ", {neighbourY, neighbourX});
            trySwapTile(neighbourX, neighbourY, floor, newFloor, ref, true);
        }

        neighbours.set(neighbourColumn, neighbours.get(neighbourColumn)! + 1);
    }

    if (column === BLACK) {
        if (neighbours.get(BLACK)! !== 1) {
            //console.log("Changing black ", {y, x}, " to white");
            newFloor.get(y)!.set(x, WHITE);
            ref.blackTiles--;
        }
    } else {
        if (neighbours.get(BLACK)! === 2) {
            //console.log("Changing white ", {y, x}, " to black");
            newFloor.get(y)!.set(x, BLACK);
            ref.blackTiles++;
        }
    }
}

function makeTransition(floor: Floor, ref: {blackTiles: number}): Floor
{
    const newFloor: Floor = new Map();

    for (const y of floor.keys()) {
        const row = floor.get(y)!;

        for (const x of row.keys()) {
            trySwapTile(x, y, floor, newFloor, ref);
        }
    }

    return newFloor;
}

function fillFloor(input: string[]): [number, Floor]
{
    const floor: Floor = new Map();
    let blackTiles = 0;

    for (const line of input) {
        const parsedDirections = parseDirections(line);
        let x = 0;
        let y = 0;

        for (const direction of parsedDirections) {
            const newX = x + directions[direction as keyof typeof directions].x;
            const newY = y + directions[direction as keyof typeof directions].y;
            //console.log(`going ${direction} from`, {x, y}, "to", {newX, newY});
            x = newX;
            y = newY;
        }

        const yMap = floor.get(y) || new Map();
        const tile = yMap.get(x);
        if (tile === true) {
            blackTiles--;
        } else {
            blackTiles++;
        }
        yMap.set(x, !tile!);
        floor.set(y, yMap);
    }
    /*
        [...floor.keys()].map(y => {
            console.log(y, floor.get(y)!);
        });
    */

    return [blackTiles, floor];
}

function parseDirections(line: string): string[]
{
    const match = line.match(new RegExp(`${Object.keys(directions).join('|')}`, 'g'));
    if (match === null) {
        throw `Invalid line ${line}`;
    }

    return match;
}

function prettyPrint(floor: Floor): void
{
    const sortedYKeys = range(-3, 3, 1); //ascSort([...floor.keys()]);
    const xRange = range(-3, 2.5, 0.5);
    sortedYKeys.forEach(y => {
        const row = floor.get(y)!;
        console.log(y < 0 ? ''+y : '+'+y, /*(y % 2 ? ' ' : '') +*/ xRange.map(x => !!row.get(x)! === WHITE ? '.' : 'B').join(" "));
    });
}

function ascSort(list: number[]): number[]
{
    return list.sort((a, b) => a-b);
}

function range(min: number, max: number, step: number): number[]
{
    return Array.from({length: (max-min)/step}, (_, i) => min + ((i + 1) * step)) as number[];
}
