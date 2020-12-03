import {Map} from "./map.ts";

export type TubeSize = {
    width: number;
    height: number;
};

export class TobogganPlanner implements Iterable<string>
{
    private position = 0;

    public constructor(
        private readonly tubeSize: TubeSize,
        private readonly map: Map,
    ) {
    }

    [Symbol.iterator]() {
        return this;
    }

    public next(): IteratorResult<string>
    {
        if (this.map.height <= this.position * this.tubeSize.height) {
            return {
                done: true,
                value: '',
            };
        }

        const result = {
            done: false,
            value: this.map.getValue(this.position * this.tubeSize.width, this.position * this.tubeSize.height),
        }

        this.position++;

        return result;
    }
}
