const fs = require("fs");

const day = "10";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

let x = 1;
let cycle = 0;

const strengths = [];

const checkValues = () => {
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    console.log({ cycle, x });
    strengths.push(cycle * x);
  }
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
