const fs = require("fs");

const day = "11";

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
    items: items.split(", "),
    operation: operation.split(" "),
    divisible: parseInt(divisible),
    ifTrue: parseInt(ifTrue),
    ifFalse: parseInt(ifFalse),
    count: 0,
  });
});

console.log(monkeys);

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

const answer1 = counts[0] * counts[1];

console.log("Answer1:", answer1);
// 112815
