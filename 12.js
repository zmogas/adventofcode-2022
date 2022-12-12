const fs = require("fs");

const day = "12d";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

const grid = [];

let [startX, startY, endX, endY] = [0, 0, 0, 0];

for (i = 0; i < lines.length; i++) {
  grid[i] = [];
  for (j = 0; j < lines[i].length; j++) {
    switch (lines[i][j]) {
      case "S":
        startX = j;
        startY = i;
        grid[i].push("a");
        break;
      case "E":
        endX = j;
        endY = i;
        grid[i].push("z");
        break;
      default:
        grid[i].push(lines[i][j]);
    }
  }
}

const steps = [];

const go = (currentHeight, newX, newY, step) => {
  if (
    newX < 0 ||
    newY < 0 ||
    newY >= grid.length ||
    newX >= grid[newY].length
  ) {
    return false;
  }
  if (String.fromCharCode(grid[newY][newX].charCodeAt(0) + 1) > currentHeight) {
    return false;
  }
  if (newX === endX && newY === endY) {
    return step;
  }

  let result = false;

  result = go();
  if (result === false) {
    return false;
  }
};
