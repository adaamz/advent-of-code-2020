type XYZ = "z" | "y" | "x";
type XYWZ = "w" | XYZ

type PocketX = Map<number, string>;
type PocketY = Map<number, PocketX>;
type PocketZ = Map<number, PocketY>;
type PocketW = Map<number, PocketZ>;
type Pockets<D> = D extends PositionW ? PocketW : PocketZ;

type PositionW = Record<XYWZ, number>;
type PositionZ = Record<XYZ, number>;

const ACTIVE = '#';
const INACTIVE = '.';

export function countPart1(input: string[][], rounds: number): number
{
    const neighboursFunction = howManyActiveNeighboursZ;

    let prevRound: PocketZ = new Map().set(0, input.reduce((prevY: PocketY, valY, y) => {
        prevY.set(y, valY.reduce((prevX: PocketX, valX, x) => {
            prevX.set(x, valX);
            return prevX;
        }, new Map()));
        return prevY;
    }, new Map()));

    let nextRound: PocketZ = new Map();
    let active = 0;
    let minZ = Math.min(...prevRound.keys()), maxZ = Math.max(...prevRound.keys());
    let minY = Math.min(...prevRound.get(0)!.keys()), maxY = Math.max(...prevRound.get(0)!.keys());
    let minX = minY, maxX = maxY;

    for (let i = 0; i < rounds; i++) {
        nextRound = new Map();
        active = 0;

        for (let z = minZ - 1; z <= maxZ + 1; z++) {
            nextRound.set(z, new Map());
            const nextZ = nextRound.get(z)!;
            const valZ = prevRound.get(z) || new Map();

            for (let y = minY - 1; y <= maxY + 1; y++) {
                nextZ.set(y, new Map());
                const nextY = nextZ.get(y)!;
                const valY = valZ.get(y) || new Map();

                for (let x = minX - 1; x <= maxX + 1; x++) {
                    const valX = valY.get(x) || INACTIVE;
                    let isActive = false;

                    if (valX === ACTIVE) {
                        isActive = shouldActiveStayActivated(neighboursFunction, prevRound, {z, y, x});
                        nextY.set(x, isActive ? ACTIVE : INACTIVE);
                    } else if (valX === INACTIVE) {
                        isActive = shouldInactiveBecomeActivated(neighboursFunction, prevRound, {z, y, x});
                        nextY.set(x, isActive ? ACTIVE : INACTIVE);
                    }

                    if (isActive) {
                        active++;
                    }
                }
            }
        }
        minZ--;
        maxZ++;
        minY--;
        maxY++;
        minX--;
        maxX++;

        prevRound = nextRound;
    }

    return active;
}

// almost zero reuse :-X
export function countPart2(input: string[][], rounds: number): number
{
    const neighboursFunction = howManyActiveNeighboursW;
    let prevRound: PocketW = new Map().set(0, new Map().set(0, input.reduce((prevY: PocketY, valY, y) => {
        prevY.set(y, valY.reduce((prevX: PocketX, valX, x) => {
            prevX.set(x, valX);
            return prevX;
        }, new Map()));
        return prevY;
    }, new Map())));

    let nextRound: PocketW = new Map();
    let active = 0;
    let minW = 0, maxW = 0;
    let minZ = 0, maxZ = 0;
    let minY = Math.min(...prevRound.get(0)!.get(0)!.keys()), maxY = Math.max(...prevRound.get(0)!.get(0)!.keys());
    let minX = minY, maxX = maxY;

    for (let i = 0; i < rounds; i++) {
        nextRound = new Map();
        active = 0;

        for (let w = minW - 1; w <= maxW + 1; w++) {
            nextRound.set(w, new Map());
            const nextW = nextRound.get(w)!;
            const valW = prevRound.get(w) || new Map();

            for (let z = minZ - 1; z <= maxZ + 1; z++) {
                nextW.set(z, new Map());
                const nextZ = nextW.get(z)!;
                const valZ = valW.get(z) || new Map();

                for (let y = minY - 1; y <= maxY + 1; y++) {
                    nextZ.set(y, new Map());
                    const nextY = nextZ.get(y)!;
                    const valY = valZ.get(y) || new Map();

                    for (let x = minX - 1; x <= maxX + 1; x++) {
                        const valX = valY.get(x) || INACTIVE;
                        let isActive = false;

                        if (valX === ACTIVE) {
                            isActive = shouldActiveStayActivated(neighboursFunction, prevRound, {w, z, y, x});
                            nextY.set(x, isActive ? ACTIVE : INACTIVE);
                        } else if (valX === INACTIVE) {
                            isActive = shouldInactiveBecomeActivated(neighboursFunction, prevRound, {w, z, y, x});
                            nextY.set(x, isActive ? ACTIVE : INACTIVE);
                        }

                        if (isActive) {
                            active++;
                        }
                    }
                }
            }
        }
        minW--;
        maxW++;
        minZ--;
        maxZ++;
        minY--;
        maxY++;
        minX--;
        maxX++;

        prevRound = nextRound;
    }

    return active;
}

function shouldActiveStayActivated<P>(howManyActiveNeighbours: (prevRound: Pockets<P>, pos: P) => number, prevRound: Pockets<P>, pos: P): boolean
{
    const active = howManyActiveNeighbours(prevRound, pos);

    return active >= 2 && active <= 3;
}

function shouldInactiveBecomeActivated<P>(howManyActiveNeighbours: (prevRound: Pockets<P>, pos: P) => number, prevRound: Pockets<P>, pos: P): boolean
{
    const active = howManyActiveNeighbours(prevRound, pos);

    return active === 3;
}

function howManyActiveNeighboursZ(prevRound: PocketZ, pos: PositionZ): number
{
    let active = 0;

    for (let x = -1; x <= +1; x++) {
        for (let y = -1; y <= +1; y++) {
            for (let z = -1; z <= +1; z++) {
                if (x === 0 && y === 0 && z === 0) {
                    continue;
                }

                if (prevRound?.get(pos.z + z)?.get(pos.y + y)?.get(pos.x + x) === ACTIVE) {
                    active++;
                }
            }
        }
    }

    return active;
}

function howManyActiveNeighboursW(prevRound: PocketW, pos: PositionW): number
{
    let active = 0;

    for (let x = -1; x <= +1; x++) {
        for (let y = -1; y <= +1; y++) {
            for (let z = -1; z <= +1; z++) {
                for (let w = -1; w <= +1; w++) {
                    if (x === 0 && y === 0 && w === 0 && z === 0) {
                        continue;
                    }

                    if (prevRound?.get(pos.w + w)?.get(pos.z + z)?.get(pos.y + y)?.get(pos.x + x) === ACTIVE) {
                        active++;
                    }
                }
            }
        }
    }

    return active;
}
