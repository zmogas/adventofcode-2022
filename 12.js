const fs = require("fs");

const day = "12";

const input = fs.readFileSync(`${day}.txt`, "utf-8");

const lines = input.split("\n");

const grid = [];

let [startX, startY, endX, endY] = [0, 0, 0, 0];

for (i = 0; i < lines.length; i++) {
  grid[i] = [];
  for (j = 0; j < lines[i].length; j++) {
    switch (lines[i][j]) {
      case "S":
        startX = j;
        startY = i;
        grid[i].push("a");
        break;
      case "E":
        endX = j;
        endY = i;
        grid[i].push("z");
        break;
      default:
        grid[i].push(lines[i][j]);
    }
  }
}

// Use Dijkstra algorithm from https://algodaily.com/lessons/an-illustrated-guide-to-dijkstras-algorithm/javascript

// const graph = {
//   a: { b: 5, c: 2 },
//   b: { a: 5, c: 7, d: 8 },
//   c: { a: 2, b: 7, d: 4, e: 8 },
//   d: { b: 8, c: 4, e: 6, f: 4 },
//   e: { c: 8, d: 6, f: 3 },
//   f: { e: 3, d: 4 },
// };

// Compose graph from our data
let graph = {};
// Object.assign(graph, { a: { ...graph["a"], b: 5 } });
// console.log("a:", graph["a"]);
// Object.assign(graph, { a: { ...graph["a"], c: 2 } });

for (y = 0; y < grid.length; y++) {
  for (x = 0; x < grid[y].length; x++) {
    const current = grid[y][x].charCodeAt(0) + 1;
    const pos = `${x}-${y}`;
    // Left
    if (x > 0 && current >= grid[y][x - 1].charCodeAt(0)) {
      const next = `${x - 1}-${y}`;
      Object.assign(graph, {
        [pos]: {
          ...graph[pos],
          [next]: 1,
        },
      });
    }
    // Right
    if (x < grid[y].length - 1 && current >= grid[y][x + 1].charCodeAt(0)) {
      const next = `${x + 1}-${y}`;
      Object.assign(graph, {
        [pos]: {
          ...graph[pos],
          [next]: 1,
        },
      });
    }
    // Up
    if (y > 0 && current >= grid[y - 1][x].charCodeAt(0)) {
      const next = `${x}-${y - 1}`;
      Object.assign(graph, {
        [pos]: {
          ...graph[pos],
          [next]: 1,
        },
      });
    }
    // Down
    if (y < grid.length - 1 && current >= grid[y + 1][x].charCodeAt(0)) {
      const next = `${x}-${y + 1}`;
      Object.assign(graph, {
        [pos]: {
          ...graph[pos],
          [next]: 1,
        },
      });
    }
  }
}

console.log(graph);

const printTable = (table) => {
  return Object.keys(table)
    .map((vertex) => {
      var { vertex: from, cost } = table[vertex];
      return `${vertex}: ${cost} via ${from}`;
    })
    .join("\n");
};

const tracePath = (table, start, end) => {
  var path = [];
  var next = end;
  while (true) {
    path.unshift(next);
    if (next === start) {
      break;
    }
    next = table[next].vertex;
  }

  return path;
};

const formatGraph = (g) => {
  const tmp = {};
  Object.keys(g).forEach((k) => {
    const obj = g[k];
    const arr = [];
    Object.keys(obj).forEach((v) => arr.push({ vertex: v, cost: obj[v] }));
    tmp[k] = arr;
  });
  return tmp;
};

const dijkstra = (graph, start, end) => {
  var map = formatGraph(graph);

  var visited = [];
  var unvisited = [start];
  var shortestDistances = { [start]: { vertex: start, cost: 0 } };
  var maxDistLen = 0;

  var vertex;
  while ((vertex = unvisited.shift())) {
    // Explore unvisited neighbors
    var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));

    // Add neighbors to the unvisited list
    unvisited.push(...neighbors.map((n) => n.vertex));

    var costToVertex = shortestDistances[vertex].cost;

    for (let { vertex: to, cost } of neighbors) {
      var currCostToNeighbor =
        shortestDistances[to] && shortestDistances[to].cost;
      var newCostToNeighbor = costToVertex + cost;
      if (
        currCostToNeighbor == undefined ||
        newCostToNeighbor < currCostToNeighbor
      ) {
        // Update the table
        shortestDistances[to] = { vertex, cost: newCostToNeighbor };
      }
    }

    visited.push(vertex);
    if (Object.keys(shortestDistances).length > maxDistLen) {
      maxDistLen = Object.keys(shortestDistances).length;
      console.log(new Date(), "shortest dist:", maxDistLen);
    }
  }

  console.log("Table of costs:");
  console.log(printTable(shortestDistances));

  const path = tracePath(shortestDistances, start, end);

  console.log(
    "Shortest path is: ",
    path.join(" -> "),
    " with weight ",
    shortestDistances[end].cost
  );
};

// https://levelup.gitconnected.com/finding-the-shortest-path-in-javascript-dijkstras-algorithm-8d16451eea34

let shortestDistanceNode = (distances, visited) => {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];

    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }
  return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
  var maxDistLen = 0;
  // track distances from the start node using a hash object
  let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, graph[startNode]);
  // track paths using a hash object
  let parents = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  // collect visited nodes
  let visited = [];
  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  // for that node:
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];

    // for each of those child nodes:
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child];
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance;
          // record the path
          parents[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);

    if (Object.keys(distances).length > maxDistLen) {
      maxDistLen = Object.keys(distances).length;
      console.log(new Date(), "shortest dist:", maxDistLen);
    }
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
  return results;
};

// dijkstra(graph, `${startX}-${startY}`, `${endX}-${endY}`);
const shortest = findShortestPath(
  graph,
  `${startX}-${startY}`,
  `${endX}-${endY}`
);

console.log({ shortest });
