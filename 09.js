const fs = require("fs");

const day = "09";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

let grid = [];
grid["t0"] = [];
grid["t0"]["t0"] = 1;

let [minX, minY, maxX, maxY] = [0, 0, 0, 0];

const posX = [];
const posY = [];

let length = 2;
for (i = 0; i < length; i++) {
  posX[i] = 0;
  posY[i] = 0;
}

const move = (deltax, deltay, position) => {
  if (position === 0) {
    posX[position] += deltax;
    posY[position] += deltay;
  }

  // Diagonal move
  if (posX[position] - posX[position + 1] > 1) {
    posX[position + 1] += 1;
    if (posY[position] - posY[position + 1] > 0) {
      posY[position + 1] += 1;
    } else if (posY[position] - posY[position + 1] < 0) {
      posY[position + 1] -= 1;
    }
  } else if (posX[position] - posX[position + 1] < -1) {
    posX[position + 1] -= 1;
    if (posY[position] - posY[position + 1] > 0) {
      posY[position + 1] += 1;
    } else if (posY[position] - posY[position + 1] < 0) {
      posY[position + 1] -= 1;
    }
  } else if (posY[position] - posY[position + 1] > 1) {
    posY[position + 1] += 1;
    if (posX[position] - posX[position + 1] > 0) {
      posX[position + 1] += 1;
    } else if (posX[position] - posX[position + 1] < 0) {
      posX[position + 1] -= 1;
    }
  } else if (posY[position] - posY[position + 1] < -1) {
    posY[position + 1] -= 1;
    if (posX[position] - posX[position + 1] > 0) {
      posX[position + 1] += 1;
    } else if (posX[position] - posX[position + 1] < 0) {
      posX[position + 1] -= 1;
    }
  }

  // console.log(
  //   position,
  //   posX[position],
  //   posY[position],
  //   posX[position + 1],
  //   posY[position + 1]
  // );
  if (position === length - 2) {
    // Mark grid as visited
    if (grid["t" + posX[position + 1]] === undefined) {
      grid["t" + posX[position + 1]] = [];
    }
    grid["t" + posX[position + 1]]["t" + posY[position + 1]] = 1;
  }
};

lines.map((line) => {
  const [boo, direction, stepStr] = line.split(/(.) (\d+)/);
  const step = parseInt(stepStr);
  switch (direction) {
    case "R":
      for (i = 0; i < step; i++) {
        move(1, 0, 0);
      }
      break;
    case "L":
      for (i = 0; i < step; i++) {
        move(-1, 0, 0);
      }
      break;
    case "D":
      for (i = 0; i < step; i++) {
        move(0, 1, 0);
      }
      break;
    case "U":
      for (i = 0; i < step; i++) {
        move(0, -1, 0);
      }
      break;
  }
  // minX = Math.min(minX, hx);
  // maxX = Math.max(maxX, hx);
  // minY = Math.min(minY, hy);
  // maxY = Math.max(maxY, hy);
});

// console.log({ x: hx, y: hy, minX, maxX, minY, maxY });

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

length = 10;
for (i = 0; i < length; i++) {
  posX[i] = 0;
  posY[i] = 0;
}

[minX, minY, maxX, maxY] = [0, 0, 0, 0];

lines.map((line) => {
  const [boo, direction, stepStr] = line.split(/(.) (\d+)/);
  const step = parseInt(stepStr);
  switch (direction) {
    case "R":
      for (i = 0; i < step; i++) {
        for (j = 0; j < length; j++) {
          move(1, 0, j);
        }
      }
      break;
    case "L":
      for (i = 0; i < step; i++) {
        for (j = 0; j < length; j++) {
          move(-1, 0, j);
        }
      }
      break;
    case "D":
      for (i = 0; i < step; i++) {
        for (j = 0; j < length; j++) {
          move(0, 1, j);
        }
      }
      break;
    case "U":
      for (i = 0; i < step; i++) {
        for (j = 0; j < length; j++) {
          move(0, -1, j);
        }
      }
      break;
  }

  minX = Math.min(minX, posX[length - 1]);
  maxX = Math.max(maxX, posX[length - 1]);
  minY = Math.min(minY, posY[length - 1]);
  maxY = Math.max(maxY, posY[length - 1]);
});

// for (y = minY; y <= maxY; y++) {
//   line = "";
//   for (x = minX; x <= maxX; x++) {
//     line += !!grid["t" + x] && !!grid["t" + x]["t" + y] ? "#" : ".";
//   }
//   console.log(line);
// }

// console.log(grid);
count = 0;
Object.values(grid).map((gridX) => {
  count += Object.values(gridX).length;
});

// 2130 is too low
console.log("Answer2:", count);
// Answer2:
