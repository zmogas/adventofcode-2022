const fs = require("fs");

const day = "03";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

const getPriority = (char) => {
  return char.charCodeAt(0) > 95
    ? char.charCodeAt(0) - 96
    : char.charCodeAt(0) - 64 + 26;
};

let sum = 0;

lines.map((line) => {
  const first = line.substring(0, line.length / 2);
  const second = line.substring(line.length / 2);
  let item = "";
  const boo = [...first].some((char) => {
    if (second.includes(char)) {
      item = char;
      return true;
    }
  });
  sum += getPriority(item);
  // console.log({ item, sum });
});

console.log("Answer 1: ", sum);

let sum2 = 0;

for (i = 0; i < lines.length; i = i + 3) {
  const one = [...lines[i]];
  const two = lines[i + 1];
  const three = lines[i + 2];

  let item = "";
  one.some((char) => {
    if (two.includes(char) && three.includes(char)) {
      item = char;
      return true;
    }
  });
  sum2 += getPriority(item);
  // console.log(i, item, sum2);
}

console.log("Answer 2: ", sum2);
