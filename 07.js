const fs = require("fs");

const day = "07";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

let path = "/";

// Let assume, each directory record will hold following structure:
//
// interface directory {
//   path: string;
//   subdirs: [string];
//   files: [string];
//   size: int;
// }

const dirs = [];

const findUpDir = (current) => {
  let path = current.substring(0, current.lastIndexOf("/"));
  path = path === "" ? "/" : path;
  return path;
};

lines.map((line) => {
  switch (line) {
    case "$ cd /":
      path = "/";
      dirs[path] = {
        path: path,
        subdirs: [],
        files: [],
        size: 0,
      };
      break;
    case "$ ls":
      // reading dir contents - simply ignore
      break;
    case "$ cd ..":
      // Go up one level
      path = findUpDir(path);
      break;
    default:
      if (line.startsWith("$ cd")) {
        const subdir = line.split(/\$ cd (.+)/);
        path += (path.length > 1 ? "/" : "") + subdir[1];
        dirs[path] = {
          path: path,
          subdirs: [],
          files: [],
          size: 0,
        };
      } else if (line.startsWith("dir")) {
        // Dir data
        const data = line.split(/dir (.+)/);
        dirs[path].subdirs.push(data[1]);
      } else {
        // File data
        const data = line.split(/(\d+) (.+)/);
        dirs[path].size += parseInt(data[1]);
        dirs[path].files.push(data[2]);
        // Sum sizes to up dirs
        let upDir = findUpDir(path);
        while (upDir !== path) {
          dirs[upDir].size += parseInt(data[1]);
          if (upDir === "/") {
            break;
          }
          upDir = findUpDir(upDir);
        }
      }
  }
});

// console.log(dirs);
let answer1 = 0;

Object.values(dirs).map((dir) => {
  // console.log({ dir });
  if (dir.size <= 100000) {
    answer1 += dir.size;
  }
});

console.log("Answer 1: ", answer1);

const total = 70000000;
const needed = 30000000;
const currentUnused = total - dirs["/"].size;
const toFree = needed - currentUnused;

// console.log({ currentUnused, toFree });

const sizes = [];
Object.values(dirs).map((dir) => {
  sizes.push(dir.size);
});

const sorted = sizes.sort((a, b) => a - b);
// console.log(sorted);

let answer2 = 0;

for (i = 0; i < sizes.length; i++) {
  if (sizes[i] >= toFree) {
    answer2 = sizes[i];
    break;
  }
}

console.log("Answer 2: ", answer2);
