const fs = require("fs");

const day = "13";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const packets = input.split("\n\n");

const correctOrders = [];
let sum = 0;

const comparePackets = (l, r) => {
  console.log("Compare", { l, r });
  let i = 0;
  if (
    Array.isArray(l) &&
    Array.isArray(r) &&
    l.length === 0 &&
    r.length === 0
  ) {
    return;
  }
  if (l.length === 0 && r.length > 0) {
    return true;
  }

  while (i < l.length) {
    if (i >= r.length) {
      return false;
    }

    if (typeof l[i] === "number" && typeof r[i] === "number") {
      if (l[i] < r[i]) {
        return true;
      }
      if (l[i] > r[i]) {
        return false;
      }
    } else if (Array.isArray(l[i]) && Array.isArray(r[i])) {
      console.log("Nuimam array");
      const res = comparePackets(l[i], r[i]);
      if (res === true || res === false) {
        return res;
      }
    } else if (
      (typeof l[i] === "number" ? 1 : 0) +
        (typeof r[i] === "number" ? 1 : 0) ===
      1
    ) {
      console.log("dedam array atgal", typeof l[i], typeof r[i]);
      const ll = typeof l[i] === "number" ? [l[i]] : l[i];
      const rr = typeof r[i] === "number" ? [r[i]] : r[i];
      const res = comparePackets(ll, rr);
      if (res === true || res === false) {
        return res;
      }
    }

    // return false;
    i++;
  }

  if (i >= l.length) {
    return true;
  }
};

// const lll =
//   "[[10,7,4,6,[]],[[10,[4,8,4,9]],[[2],[2],[1,8,4]]],[[8],7],[6,[[4,1,9,0,9],9,4,[3],3],0,[[1,3,7,9],10,[10,3,2,4,3]],4],[[2,[]]]]";
// const rrr = "[[[[10,4]],5,4,2],[5,2,5,2,[]],[4,3,[]],[[],[2],2,5,[4,[8]]],[6]]";

// const res = comparePackets(JSON.parse(lll), JSON.parse(rrr));
// console.log({ res });
// return;

let index = 0;
packets.map((packet) => {
  index++;
  const [left, right] = packet.split("\n");
  const leftJson = JSON.parse(left);
  const rightJson = JSON.parse(right);

  const res = comparePackets(leftJson, rightJson);

  if (res === true) {
    console.log(...leftJson);
    console.log(...rightJson);
    console.log("Correct", index);
    correctOrders.push(index);
    sum += index;
    return true;
  }
  // console.log("NOT", index);
  console.log();
});

console.log({ correctOrders });
console.log(correctOrders.reduce((c, d) => c + d, 0));
console.log("Answer1:", sum);

// 5904 - too high
// 5710 - too high
