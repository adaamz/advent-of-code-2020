import {assertStrictEquals} from "../../deps.ts";
import {countPart1, countPart2} from "../src/24.ts";
/*
Deno.test("Lobby Layout: Simple #1 test from introduction (Part one)", () => {
  const input = [
      "esenee",
  ];
  const expectedOutput = 0;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("Lobby Layout: Simple #2 test from introduction (Part one)", () => {
  const input = [
      "esew",
  ];
  const expectedOutput = 0;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("Lobby Layout: Simple #3 test from introduction (Part one)", () => {
  const input = [
      "nwwswee",
  ];
  const expectedOutput = 0;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("Lobby Layout: Example test from introduction (Part one)", () => {
  const input = [
      "sesenwnenenewseeswwswswwnenewsewsw",
      "neeenesenwnwwswnenewnwwsewnenwseswesw",
      "seswneswswsenwwnwse",
      "nwnwneseeswswnenewneswwnewseswneseene",
      "swweswneswnenwsewnwneneseenw",
      "eesenwseswswnenwswnwnwsewwnwsene",
      "sewnenenenesenwsewnenwwwse",
      "wenwwweseeeweswwwnwwe",
      "wsweesenenewnwwnwsenewsenwwsesesenwne",
      "neeswseenwwswnwswswnw",
      "nenwswwsewswnenenewsenwsenwnesesenew",
      "enewnwewneswsewnwswenweswnenwsenwsw",
      "sweneswneswneneenwnewenewwneswswnese",
      "swwesenesewenwneswnwwneseswwne",
      "enesenwswwswneneswsenwnewswseenwsese",
      "wnwnesenesenenwwnenwsewesewsesesew",
      "nenewswnwewswnenesenwnesewesw",
      "eneswnwswnwsenenwnwnwwseeswneewsenese",
      "neswnwewnwnwseenwseesewsenwsweewe",
      "wseweeenwnesenwwwswnew",
  ];
  const expectedOutput = 10;

  assertStrictEquals(countPart1(input), expectedOutput);
});

Deno.test("Lobby Layout: Final test (Part one)", () => {
  const input = (
      Deno.readTextFileSync("24/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 488;

  assertStrictEquals(countPart1(input), expectedOutput);
});
*/
Deno.test("Lobby Layout: Example test from introduction (Part two)", () => {
    const input = [
        "sesenwnenenewseeswwswswwnenewsewsw",
        "neeenesenwnwwswnenewnwwsewnenwseswesw",
        "seswneswswsenwwnwse",
        "nwnwneseeswswnenewneswwnewseswneseene",
        "swweswneswnenwsewnwneneseenw",
        "eesenwseswswnenwswnwnwsewwnwsene",
        "sewnenenenesenwsewnenwwwse",
        "wenwwweseeeweswwwnwwe",
        "wsweesenenewnwwnwsenewsenwwsesesenwne",
        "neeswseenwwswnwswswnw",
        "nenwswwsewswnenenewsenwsenwnesesenew",
        "enewnwewneswsewnwswenweswnenwsenwsw",
        "sweneswneswneneenwnewenewwneswswnese",
        "swwesenesewenwneswnwwneseswwne",
        "enesenwswwswneneswsenwnewswseenwsese",
        "wnwnesenesenenwwnenwsewesewsesesew",
        "nenewswnwewswnenesenwnesewesw",
        "eneswnwswnwsenenwnwnwwseeswneewsenese",
        "neswnwewnwnwseenwseesewsenwsweewe",
        "wseweeenwnesenwwwswnew",
    ];

  const expectedOutput = 2208;

  assertStrictEquals(countPart2(input), expectedOutput);
});
/*
Deno.test("Lobby Layout: Final test (Part two)", () => {
  const input = (
      Deno.readTextFileSync("24/final_input.txt").trimEnd()
  ).split("\n");

  const expectedOutput = 0;

  assertStrictEquals(countPart2(input), expectedOutput);
});
*/
