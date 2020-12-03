import {assertStrictEquals} from "../../deps.ts";
import {Map} from "../src/map.ts";
import {TobogganPlanner} from "../src/toboggan_planner.ts";

Deno.test("TobogganPlanner: Iterate", () => {
    const inputMap = new Map([
        '..##.......'.split(""),
        '#...#...#..'.split(""),
        '.#....#..#.'.split(""),
        '..#.#...#.#'.split(""),
        '.#...##..#.'.split(""),
        '..#.##.....'.split(""),
        '.#.#.#....#'.split(""),
        '.#........#'.split(""),
        '#.##...#...'.split(""),
        '#...##....#'.split(""),
        '.#..#...#.#'.split(""),
    ]);
    const inputTubeSize = {width: 3, height: 1};

    const planner = new TobogganPlanner(inputTubeSize, inputMap);

    assertStrictEquals(planner.next().value, ".");
    assertStrictEquals(planner.next().value, ".");
    assertStrictEquals(planner.next().value, "#");
    assertStrictEquals(planner.next().value, ".");
    assertStrictEquals(planner.next().value, "#");
    assertStrictEquals(planner.next().value, "#");
    assertStrictEquals(planner.next().value, ".");
    assertStrictEquals(planner.next().value, "#");
    assertStrictEquals(planner.next().value, "#");
    assertStrictEquals(planner.next().value, "#");
    assertStrictEquals(planner.next().value, "#");
});
