import {assertStrictEquals} from "../../deps.ts";
import {countCombineTreeObstacles, countTreeObstacles} from "../src/tree_finder.ts";
import {Map} from "../src/map.ts";

Deno.test("TreeFinder: Example test from introduction (Part one)", () => {
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

  const inputTubeSize = {width: 3, height: 1};
  const expectedOutput = 7;

  assertStrictEquals(countTreeObstacles(inputTubeSize, new Map(input)), expectedOutput);
});

Deno.test("TreeFinder: Example test from introduction (Part two)", () => {
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
  const inputTubeSizes = [
    {width: 1, height: 1},
    {width: 3, height: 1},
    {width: 5, height: 1},
    {width: 7, height: 1},
    {width: 1, height: 2},
  ];

  const expectedOutput = 336;

  assertStrictEquals(countCombineTreeObstacles(inputTubeSizes, new Map(input)), expectedOutput);
});

Deno.test("TreeFinder: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("03/final_input.txt")
  ).split('\n').map((n: string): string[] => n.split(""));
  const inputTubeSize = {width: 3, height: 1};

  const expectedOutput = 247;

  assertStrictEquals(countTreeObstacles(inputTubeSize, new Map(input)), expectedOutput);
});

Deno.test("TreeFinder: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("03/final_input.txt")
  ).split('\n').map((n: string): string[] => n.split(""));
  const inputTubeSizes = [
    {width: 1, height: 1},
    {width: 3, height: 1},
    {width: 5, height: 1},
    {width: 7, height: 1},
    {width: 1, height: 2},
  ];

  const expectedOutput = 2983070376;

  assertStrictEquals(countCombineTreeObstacles(inputTubeSizes, new Map(input)), expectedOutput);
});
