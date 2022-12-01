const fs = require("fs");

const day = "01";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

// console.log({ input });
const lines = input.split("\n");
// console.log(lines.length, { lines });

let maxCalories = 0;
let currentSum = 0;

lines.map((line) => {
  if (line !== "") {
    currentSum += parseInt(line);
  } else {
    if (currentSum > maxCalories) {
      maxCalories = currentSum;
    }
    currentSum = 0;
  }
});
// Check last elf!
if (currentSum > maxCalories) {
  maxCalories = currentSum;
}

console.log("Answer 1: ", maxCalories);

const caloriesArray = [];

currentSum = 0;

lines.map((line) => {
  if (line !== "") {
    currentSum += parseInt(line);
  } else {
    caloriesArray.push(currentSum);
    currentSum = 0;
  }
});
// Check last elf!!!
caloriesArray.push(currentSum);

// console.log(caloriesArray);
const sortedCalories = caloriesArray.sort((a, b) => b - a);
// console.log(sortedCalories);

let sum = 0;
for (let i = 0; i < 3; i++) {
  sum += sortedCalories[i];
}

console.log("Answer 2: ", sum);
