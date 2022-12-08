const fs = require("fs");

const day = "08";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

let trees = [];

let y = 0;
lines.map((line) => {
  trees[y] = [...line];
  y++;
});

const maxY = trees.length;
const maxX = trees[0].length;

for (y = 0; y < maxY; y++) {
  for (x = 0; x < maxX; x++) {
    trees[y][x] = parseInt(trees[y][x]);
  }
}

let visible = 0;

const isVisible = (x, y) => {
  const height = trees[y][x];

  // Edge
  if (x === 0 || x === maxX - 1 || y === 0 || y === maxY - 1) {
    return true;
  }

  let notVisibleFromEdge = 0;
  for (i = 0; i < x; i++) {
    if (trees[y][i] >= height) {
      notVisibleFromEdge++;
      break;
    }
  }
  for (i = x + 1; i < maxX; i++) {
    if (trees[y][i] >= height) {
      notVisibleFromEdge++;
      break;
    }
  }

  for (i = 0; i < y; i++) {
    if (trees[i][x] >= height) {
      notVisibleFromEdge++;
      break;
    }
  }
  for (i = y + 1; i < maxY; i++) {
    if (trees[i][x] >= height) {
      notVisibleFromEdge++;
      break;
    }
  }

  return notVisibleFromEdge !== 4;
};

for (y = 0; y < maxY; y++) {
  for (x = 0; x < maxX; x++) {
    visible += isVisible(x, y) ? 1 : 0;
  }
}

// 8388 is too high
console.log("Answer1:", visible);

const scenicScore = (x, y) => {
  const height = trees[y][x];

  // Edge
  if (x === 0 || x === maxX - 1 || y === 0 || y === maxY - 1) {
    return 0;
  }

  let score = 1;
  let count = 0;
  for (i = x - 1; i >= 0; i--) {
    count++;
    if (trees[y][i] >= height) {
      break;
    }
  }
  score = score * count;

  count = 0;
  for (i = x + 1; i < maxX; i++) {
    count++;
    if (trees[y][i] >= height) {
      break;
    }
  }
  score = score * count;

  count = 0;
  for (i = y - 1; i >= 0; i--) {
    count++;
    if (trees[i][x] >= height) {
      break;
    }
  }
  score = score * count;

  count = 0;
  for (i = y + 1; i < maxY; i++) {
    count++;
    if (trees[i][x] >= height) {
      break;
    }
  }
  score = score * count;

  return score;
};

let maxScore = 0;
for (y = 1; y < maxY - 1; y++) {
  for (x = 1; x < maxX - 1; x++) {
    const score = scenicScore(x, y);
    // console.log({ x, y, score });
    maxScore = Math.max(maxScore, score);
  }
}

console.log("Answer2:", maxScore);
