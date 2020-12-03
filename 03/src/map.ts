export class Map
{
    private readonly rowLength: number;
    public readonly height: number;

    public constructor(
        private readonly map: string[][]
    ) {
        this.height = map.length;
        this.rowLength = map[0].length;
    }

    public getValue(x: number, y: number): string
    {
        return this.map[y][x % this.rowLength];
    }
}
