type Tile = {
    id: number;
    unique_id: typeof tileAutoincrement;
    edges: {
        up: string;
        down: string;
        left: string;
        right: string;
    };
};
type TilesCombinations = Map<keyof Tile["edges"], Map<string, Set<Tile["unique_id"]>>>;
type TilesDB = Map<Tile["unique_id"], Tile>;
type GridCoord = {x: number, y: number};
type TilesGrid = Map<GridCoord["y"], Map<GridCoord["x"], Tile["unique_id"]>>

let tileAutoincrement = 0;

declare global
{
    interface String
    {
        reverse(): string;
    }
}
String.prototype.reverse = function(this: string): string {
    return this.split("").reverse().join("");
};

export function countPart1(input: string[]): number
{
    const [tilesCombinations, tilesDB, edgeLength] = parseInput(input);
/*
    [...tilesCombinations.keys()].reduce((p, d) => {
        console.log(d, tilesCombinations.get(d));
        return d;
    });
    console.log(tilesDB);
*/
    const joined = tryJoinTiles(tilesDB, tilesCombinations, edgeLength, new Map(), {x:0, y:0});
    console.log(joined);

    throw 'not implemented';
}

export function countPart2(input: string[]): number
{
    throw 'not implemented';
}

function tryJoinTiles(
    tilesDB: TilesDB,
    tilesCombinations: TilesCombinations,
    edgeLength: number,
    currentGrid: TilesGrid,
    currentCoord: GridCoord,
): TilesGrid | undefined
{
    const grid: TilesGrid = new Map();

    for (let y = currentCoord.y; y < edgeLength; y++) {
        if (!grid.has(y)) {
            grid.set(y, new Map());
        }

        for (let x = currentCoord.x; x < edgeLength; x++) {
            const possibilities = getPossibilities(currentCoord, grid, tilesCombinations, tilesDB);
            if (!possibilities) {
                return undefined;
            }

            for (const possibility of possibilities) {
                grid.get(y)!.set(x, possibility);
            }
        }
    }

    return grid;
}

function cloneGrid(grid: TilesGrid): TilesGrid
{
    const newGrid = new Map();

    for (const key of grid.keys()) {
        const val = grid.get(key)!;
        if (val instanceof Map) {
            newGrid.set(key, cloneGrid(val));
        } else {
            newGrid.set(key, val);
        }
    }

    return newGrid;
}

function getPossibilities(forCoord: GridCoord, currentGrid: TilesGrid, tilesCombinations: TilesCombinations, tilesDB: TilesDB): Tile[]
{
    let byY: Tile["unique_id"][] = [];
    if (forCoord.y > 0) {
        byY = [...tilesCombinations.get("up")!.get(tilesDB.get(currentGrid.get(forCoord.y - 1)!.get(forCoord.x)!)!.edges.down)];
        if (!byY) {
            return [];
        }
        if (forCoord.x === 0) {
            return getTilesByIDs(byY, tilesDB);
        }
    }

    let byX: Tile["unique_id"][] = [];
    if (forCoord.x > 0) {
        byX = [...tilesCombinations.get("left")!.get(tilesDB.get(currentGrid.get(forCoord.y - 1)!.get(forCoord.x)!)!.edges.right)];
        if (!byX) {
            return [];
        }
        if (forCoord.y === 0) {
            return getTilesByIDs(byX, tilesDB);
        }
    }

    const possibleIDs = byY.filter(id => byX.indexOf(id) > -1);
    return getTilesByIDs(possibleIDs, tilesDB);
}

function getTilesByIDs(ids: number[], tilesDB: TilesDB): Tile[]
{
    return ids.map(id => tilesDB.get(tilesDB)!);
}

function parseInput(tiles: string[]): [TilesCombinations, TilesDB, number]
{
    const tilesCombinations: TilesCombinations = new Map();
    const tilesDB: TilesDB = new Map();
    let edgeLength = 0;

    for (const tile of tiles) {
        const tileLines = tile.split("\n");
        const parsedTiles = parseTile(tileLines);
        edgeLength = tileLines.length;
        console.log(edgeLength);

        for (const parsedTile of parsedTiles) {
            for (const et in parsedTile.edges) {
                const edgeType: keyof typeof parsedTile.edges = et as any; // stupid ts
                const edge = parsedTile.edges[edgeType];

                const edges = tilesCombinations.get(edgeType) || (new Map());
                const ids = edges.get(edge) || new Set();
                ids.add(parsedTile.unique_id);
                edges.set(edge, ids);
                tilesCombinations.set(edgeType, edges);

                tilesDB.set(parsedTile.unique_id, parsedTile);
            }
        }
    }

    return [tilesCombinations, tilesDB, edgeLength];
}

const transform = [
    (s: string, edge: string) => s, // no transform
    (s: string, edge: string) => ["up", "down"].indexOf(edge) > -1 ? s.reverse() : s, // flip horizontally
    (s: string, edge: string) => ["left", "right"].indexOf(edge) > -1 ? s.reverse() : s, // flip vertically
];

function parseTile(lines: string[]): Tile[]
{
    const tile = lines.slice(1);

    const up = tile[0];
    const down = tile[tile.length - 1];
    const left = columnToString(0, tile);
    const right = columnToString(tile[0].length - 1, tile);
    const edges = [up, right, down, left];

    const tiles: Tile[] = [];

    for (let i = 0; i < edges.length; i++) {
        for (let f = 0; f < (i%2 === 0 ? 3 : 1); f++) {
            tiles.push({
                id: Number(lines[0].slice("Tile ".length, -1)),
                unique_id: tileAutoincrement++,
                edges: {
                    up: transform[f](edges[i % edges.length], "up"),
                    right: transform[f](edges[(i + 1) % edges.length], "right"),
                    down: transform[f](edges[(i + 2) % edges.length], "down"),
                    left: transform[f](edges[(i + 3) % edges.length], "left"),
                }
            });
        }
    }

    return tiles;
}

function columnToString(columnIndex: number, lines: string[]): string
{
    return lines.reduce((prev, val) => prev + val[columnIndex], "");
}
