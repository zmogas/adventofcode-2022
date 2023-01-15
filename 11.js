const fs = require("fs");

const day = "11d";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const monkeyText = input.split("\n\n");

const monkeys = [];

monkeyText.map((monkey) => {
  const lines = monkey.split("\n");
  const items = lines[1].split(/Starting items: (.+)/)[1];
  const operation = lines[2].split(/Operation: new = old (.+)/)[1];
  const divisible = lines[3].split(/Test: divisible by (\d+)/)[1];
  const ifTrue = lines[4].split(/If true: throw to monkey (\d)/)[1];
  const ifFalse = lines[5].split(/If false: throw to monkey (\d)/)[1];

  monkeys.push({
    items: items.split(", ").map((a) => parseInt(a)),
    operation: operation.split(" "),
    divisible: parseInt(divisible),
    ifTrue: parseInt(ifTrue),
    ifFalse: parseInt(ifFalse),
    count: 0,
  });
});

console.log(monkeys);

function deepCopy(obj) {
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    var out = [],
      i = 0,
      len = obj.length;
    for (; i < len; i++) {
      out[i] = arguments.callee(obj[i]);
    }
    return out;
  }
  if (typeof obj === "object") {
    var out = {},
      i;
    for (i in obj) {
      out[i] = arguments.callee(obj[i]);
    }
    return out;
  }
  return obj;
}

const monkeys2 = deepCopy(monkeys);

const inspect = (monkey) => {
  const { items, operation, divisible, ifTrue, ifFalse } = monkey;
  while (items.length > 0) {
    monkey.count++;
    let worry = parseInt(items.shift());

    const unit = operation[1] === "old" ? worry : parseInt(operation[1]);
    if (operation[0] === "+") {
      worry = worry + unit;
    } else {
      worry = worry * unit;
    }

    worry = parseInt(worry / 3);

    if (worry % divisible === 0) {
      monkeys[ifTrue].items.push(worry);
    } else {
      monkeys[ifFalse].items.push(worry);
    }
  }
};

// inspect(monkeys[0]);

const maxRound = 20;
for (round = 1; round <= maxRound; round++) {
  for (i = 0; i < monkeys.length; i++) {
    inspect(monkeys[i]);
  }
}

const counts = [];
monkeys.map(({ count }) => counts.push(count));
counts.sort((a, b) => b - a);

const answer1 = counts[0] * counts[1];
console.log({ counts });

console.log("Answer1:", answer1);
// 112815
console.log();
console.log();

const inspect2 = (monkey) => {
  const { items, operation, divisible, ifTrue, ifFalse } = monkey;
  while (items.length > 0) {
    monkey.count++;
    let worry = BigInt(items.shift());

    const unit = BigInt(
      operation[1] === "old" ? worry : parseInt(operation[1])
    );
    if (operation[0] === "+") {
      worry = BigInt(worry + unit);
    } else {
      worry = BigInt(worry * unit);
    }

    // worry = parseInt(worry / 3);

    const multiplier = worry / BigInt(divisible);

    // if (worry % BigInt(divisible) === 0) {
    if (multiplier * BigInt(divisible) === worry) {
      monkeys2[ifTrue].items.push(worry);
    } else {
      monkeys2[ifFalse].items.push(worry);
    }
  }
};

const maxRound2 = 1000; //10000;
for (round = 1; round <= maxRound2; round++) {
  for (i = 0; i < monkeys2.length; i++) {
    inspect2(monkeys2[i]);
  }
}

console.log(monkeys2);

const counts2 = [];
monkeys2.map(({ count }) => counts2.push(count));
counts2.sort((a, b) => b - a);

const answer2 = counts2[0] * counts2[1];

console.log("Answer2:", answer2);
// 17287536232 is too low
