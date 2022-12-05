const fs = require("fs");

const day = "04";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

let count = 0;

lines.map((line) => {
  let [boo, a1, a2, b1, b2] = line.split(/(\d+)\-(\d+),(\d+)\-(\d+)/);

  // console.log({ a1, a2, b1, b2 });
  a1 = parseInt(a1);
  a2 = parseInt(a2);
  b1 = parseInt(b1);
  b2 = parseInt(b2);
  // console.log({ a1, a2, b1, b2 });
  if (
    (a1 >= b1 && a1 <= b2 && a2 >= b1 && a2 <= b2) ||
    (b1 >= a1 && b1 <= a2 && b2 >= a1 && b2 <= a2)
  ) {
    count++;
  }
});

// 487 too low
console.log("Answer 1: ", count);

count = 0;

lines.map((line) => {
  let [boo, a1, a2, b1, b2] = line.split(/(\d+)\-(\d+),(\d+)\-(\d+)/);

  a1 = parseInt(a1);
  a2 = parseInt(a2);
  b1 = parseInt(b1);
  b2 = parseInt(b2);
  if (
    (a1 >= b1 && a1 <= b2) ||
    (a2 >= b1 && a2 <= b2) ||
    (b1 >= a1 && b1 <= a2) ||
    (b2 >= a1 && b2 <= a2)
  ) {
    count++;
  }
});

console.log("Answer 2: ", count);
