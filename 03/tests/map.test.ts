import {assertStrictEquals} from "../../deps.ts";
import {Map} from "../src/map.ts";

Deno.test("Map: Try get value", () => {
    const input = [
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
    ];
    const map = new Map(input);

    assertStrictEquals(map.getValue(0, 0), '.');
    assertStrictEquals(map.getValue(5, 1), '.');
    assertStrictEquals(map.getValue(6, 2), '#');
});

Deno.test("Map: Try get overflowed value", () => {
    const input = [
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
    ];
    const map = new Map(input);

    assertStrictEquals(map.getValue(11, 0), '.');
    assertStrictEquals(map.getValue(11 + 5, 1), '.');
    assertStrictEquals(map.getValue(22 + 6, 2), '#');
});
