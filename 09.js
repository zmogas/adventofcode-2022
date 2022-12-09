const fs = require("fs");

const day = "09e";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

let grid = [];
grid["t0"] = [];
grid["t0"]["t0"] = 1;

let [minX, minY, maxX, maxY] = [0, 0, 0, 0];
// Head position
let [hx, hy] = [0, 0];
// Tail position
let [tx, ty] = [0, 0];

const move = (deltax, deltay, diff) => {
  hx += deltax;
  hy += deltay;
  const adjust = 0;

  // Diagonal move
  if (hx - tx > diff) {
    tx += 1;
    if (hy - ty > adjust) {
      ty += 1;
    } else if (hy - ty < adjust) {
      ty -= 1;
    }
  } else if (hx - tx < -1 * diff) {
    tx -= 1;
    if (hy - ty > adjust) {
      ty += 1;
    } else if (hy - ty < adjust) {
      ty -= 1;
    }
  } else if (hy - ty > diff) {
    ty += 1;
    if (hx - tx > adjust) {
      tx += 1;
    } else if (hx - tx < adjust) {
      tx -= 1;
    }
  } else if (hy - ty < -1 * diff) {
    ty -= 1;
    if (hx - tx > adjust) {
      tx += 1;
    } else if (hx - tx < adjust) {
      tx -= 1;
    }
  }

  // Mark grid as visited
  if (grid["t" + tx] === undefined) {
    grid["t" + tx] = [];
  }
  grid["t" + tx]["t" + ty] = 1;
};

lines.map((line) => {
  const [boo, direction, stepStr] = line.split(/(.) (\d+)/);
  const step = parseInt(stepStr);
  switch (direction) {
    case "R":
      for (i = 0; i < step; i++) {
        move(1, 0, 1);
      }
      break;
    case "L":
      for (i = 0; i < step; i++) {
        move(-1, 0, 1);
      }
      break;
    case "D":
      for (i = 0; i < step; i++) {
        move(0, 1, 1);
      }
      break;
    case "U":
      for (i = 0; i < step; i++) {
        move(0, -1, 1);
      }
      break;
  }
  minX = Math.min(minX, hx);
  maxX = Math.max(maxX, hx);
  minY = Math.min(minY, hy);
  maxY = Math.max(maxY, hy);
});

console.log({ x: hx, y: hy, minX, maxX, minY, maxY });

// console.log({ grid });
let count = 0;
Object.values(grid).map((gridX) => {
  count += Object.values(gridX).length;
});

console.log("Answer1:", count);
// Answer1: 5683

// Reset grid
grid = [];
grid["t0"] = [];
grid["t0"]["t0"] = 1;
// Head position
[hx, hy] = [0, 0];
// Tail position
[tx, ty] = [0, 0];
[minX, minY, maxX, maxY] = [0, 0, 0, 0];

lines.map((line) => {
  const [boo, direction, stepStr] = line.split(/(.) (\d+)/);
  const step = parseInt(stepStr);
  switch (direction) {
    case "R":
      for (i = 0; i < step; i++) {
        move(1, 0, 9);
      }
      break;
    case "L":
      for (i = 0; i < step; i++) {
        move(-1, 0, 9);
      }
      break;
    case "D":
      for (i = 0; i < step; i++) {
        move(0, 1, 9);
      }
      break;
    case "U":
      for (i = 0; i < step; i++) {
        move(0, -1, 9);
      }
      break;
  }
  minX = Math.min(minX, hx);
  maxX = Math.max(maxX, hx);
  minY = Math.min(minY, hy);
  maxY = Math.max(maxY, hy);
});

for (y = minY; y <= maxY; y++) {
  line = "";
  for (x = minX; x <= maxX; x++) {
    line += !!grid["t" + x] && !!grid["t" + x]["t" + y] ? "#" : ".";
  }
  console.log(line);
}

// console.log(grid);
count = 0;
Object.values(grid).map((gridX) => {
  count += Object.values(gridX).length;
});

// 2130 is too low
console.log("Answer2:", count);
// Answer2:
