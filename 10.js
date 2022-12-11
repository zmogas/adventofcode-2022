const fs = require("fs");

const day = "10";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

let x = 1;
let cycle = 0;

const strengths = [];
const display = [];
const rows = 6;
for (i = 0; i < rows; i++) {
  display[i] = [];
}

const checkValues = () => {
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    console.log({ cycle, x });
    strengths.push(cycle * x);
  }
  const row = parseInt((cycle - 1) / 40);
  const pos = (cycle - 1) % 40;
  // console.log(cycle, row, pos);
  display[row][pos] = [x - 1, x, x + 1].includes(pos) ? "#" : " ";
};

lines.map((line) => {
  const str = line.split(" ");
  if (str[0] === "noop") {
    cycle++;
    checkValues();
  } else {
    const val = parseInt(str[1]);
    cycle++;
    checkValues();
    cycle++;
    checkValues();
    x += val;
  }
});

// console.log(strengths);
let answer1 = 0;
strengths.map((val) => (answer1 += val));

console.log("Answer1:", answer1);
// Answer1: 14920

console.log("Answer 2 is below:");
for (y = 0; y < rows; y++) {
  let line = "";
  for (x = 0; x < 40; x++) {
    line += display[y][x];
  }
  console.log(line);
}
// ###..#..#..##...##...##..###..#..#.####.
// #..#.#..#.#..#.#..#.#..#.#..#.#..#....#.
// ###..#..#.#....#..#.#....###..#..#...#..
// #..#.#..#.#....####.#....#..#.#..#..#...
// #..#.#..#.#..#.#..#.#..#.#..#.#..#.#....
// ###...##...##..#..#..##..###...##..####.
