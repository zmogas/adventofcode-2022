const fs = require("fs");
const R = require("ramda");

const day = "06";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const demo1 = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
const demo2 = "bvwbjplbgvbhsrlpgdmjqwftvncz";
const demo3 = "nppdvjthqldpwncqszvftbrmjlhg";
const demo4 = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";
const demo5 = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

const data = input;

const isDifferent = (data, len) => {
  const arr = [...data];
  //   console.log(arr, R.uniq(arr));
  return R.uniq(arr).length === len;
};

const getMarkerPos = (data) => {
  let pos = 0;
  for (i = 3; i < data.length; i++) {
    if (isDifferent(data.substring(i - 3, i + 1), 4)) {
      pos = i + 1;
      break;
    }
  }
  return pos;
};

console.log("Demo1 answer:", getMarkerPos(demo1));
console.log("Demo2 answer:", getMarkerPos(demo2));
console.log("Demo3 answer:", getMarkerPos(demo3));
console.log("Demo4 answer:", getMarkerPos(demo4));
console.log("Demo5 answer:", getMarkerPos(demo5));

console.log("DATA answer:", getMarkerPos(data));

console.log();

const getMessagePos = (data) => {
  let pos = 0;
  for (i = 13; i < data.length; i++) {
    if (isDifferent(data.substring(i - 13, i + 1), 14)) {
      pos = i + 1;
      break;
    }
  }
  return pos;
};

console.log("Message start:");
console.log("Demo1 answer:", getMessagePos(demo1));
console.log("Demo2 answer:", getMessagePos(demo2));
console.log("Demo3 answer:", getMessagePos(demo3));
console.log("Demo4 answer:", getMessagePos(demo4));
console.log("Demo5 answer:", getMessagePos(demo5));

console.log("DATA answer:", getMessagePos(data));
