const fs = require("fs");

const day = "05";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const [stack, instructions] = input.split("\n\n");

const lines = stack.split("\n");

const stackCount = (lines[0].length + 1) / 4;

const crates = [];
for (i = 0; i < stackCount; i++) {
  crates[i] = [];
}

// Reading from bottom and stacking crates
for (i = lines.length - 2; i >= 0; i--) {
  for (j = 0; j < stackCount; j++) {
    const crate = lines[i].substring(j * 4, j * 4 + 3);
    if (crate[1] !== " ") {
      crates[j].push(crate[1]);
    }
  }
}

// console.log(crates);
instructions.split("\n").map((line) => {
  const [boo, count, from, to] = line.split(/move (\d+) from (\d) to (\d)/);
  // console.log({ count, from, to });
  for (i = 0; i < count; i++) {
    const crate = crates[from - 1].pop();
    crates[to - 1].push(crate);
  }
  // console.log(crates);
});
// console.log(crates);

let answer = "";
for (j = 0; j < stackCount; j++) {
  answer += crates[j].pop();
}

console.log("Answer 1: ", answer);

const crates2 = [];
for (i = 0; i < stackCount; i++) {
  crates2[i] = [];
}

// Reading from bottom and stacking crates
for (i = lines.length - 2; i >= 0; i--) {
  for (j = 0; j < stackCount; j++) {
    const crate = lines[i].substring(j * 4, j * 4 + 3);
    if (crate[1] !== " ") {
      crates2[j].push(crate[1]);
    }
  }
}

let answer2 = "";
// console.log(crates2);

instructions.split("\n").map((line) => {
  const [boo, count, from, to] = line.split(/move (\d+) from (\d) to (\d)/);
  // console.log({ count, from, to });
  const arr = [];
  for (i = 0; i < count; i++) {
    const crate = crates2[from - 1].pop();
    arr.push(crate);
  }
  // console.log({ arr });
  for (i = 0; i < count; i++) {
    const crate = arr.pop();
    // console.log({ crate });
    crates2[to - 1].push(crate);
  }
  // console.log(crates2);
});

for (j = 0; j < stackCount; j++) {
  answer2 += crates2[j].pop();
}

console.log("Answer 2: ", answer2);
