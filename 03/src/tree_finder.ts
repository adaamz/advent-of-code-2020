import {Map} from "./map.ts";
import {TobogganPlanner, TubeSize} from "./toboggan_planner.ts";

const TREE = '#';

export function countTreeObstacles(tubeSize: TubeSize, map: Map): number
{
    let trees = 0;
    const planner = new TobogganPlanner(tubeSize, map);

    for (const field of planner) {
        if (field === TREE) {
            trees++;
        }
    }

    return trees;
}

export function countCombineTreeObstacles(tubeSizes: TubeSize[], map: Map): number
{
    let multipliedObstaclesCount = 1;

    for (const tubeSize of tubeSizes) {
        const obstaclesCount = countTreeObstacles(tubeSize, map);

        if (obstaclesCount > 0) {
            multipliedObstaclesCount *= obstaclesCount;
        }
    }

    return multipliedObstaclesCount;
}
