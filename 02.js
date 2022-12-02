const fs = require("fs");

const day = "02";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

let total = 0;

lines.map((line) => {
  const [he, me] = line.split(" ");
  let score = me === "X" ? 1 : me === "Y" ? 2 : 3;
  if (
    (he === "A" && me === "X") ||
    (he === "B" && me === "Y") ||
    (he === "C" && me === "Z")
  ) {
    score += 3;
  } else if (
    (he === "A" && me === "Y") ||
    (he === "B" && me === "Z") ||
    (he === "C" && me === "X")
  ) {
    score += 6;
  }

  // console.log({ he, me, score });
  total += score;
});

console.log("Answer 1: ", total);

total = 0;

lines.map((line) => {
  const [he, me] = line.split(" ");
  let score = me === "X" ? 0 : me === "Y" ? 3 : 6;

  if (
    (he === "A" && me === "Y") ||
    (he === "B" && me === "X") ||
    (he === "C" && me === "Z")
  ) {
    // Rock
    score += 1;
  } else if (
    (he === "A" && me === "Z") ||
    (he === "B" && me === "Y") ||
    (he === "C" && me === "X")
  ) {
    // Paper
    score += 2;
  } else {
    // Scissors
    score += 3;
  }

  // console.log({ he, me, score });
  total += score;
});

console.log("Answer 2: ", total);
