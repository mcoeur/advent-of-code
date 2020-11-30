const { load_file_content } = require("../utils/file");

const input = load_file_content("./input.txt", "\n");
const map = [];

load_paths(input);

// const intersections = draw_map(); // super slow, ideal for debugging
const intersections = get_intersections(); // faster, but no display
const distances = intersections.map(({ x, y }) => {
  return Math.abs(x) + Math.abs(y);
});
console.log("intersections : ", intersections);
console.log("distances : ", distances);

const shortest = distances.sort((a, b) => a - b).shift();
console.log("shortest distance : ", shortest);

/*
 ** FUNCTIONS
 */

function draw_path(lineIndex, x, y) {
  const key = `${x}#${y}`;
  const currentMap = map[lineIndex];
  currentMap[key] = lineIndex;
}

function load_paths(input) {
  input.forEach((line, lineIndex) => {
    const dots = line
      .split(",")
      .map(dot => [dot[0], parseInt(dot.substring(1))]);
    let x = 0;
    let y = 0;
    map[lineIndex] = {};
    dots.forEach(([direction, length]) => {
      let i = 0;
      switch (direction) {
        case "R":
          while (i++ < length) draw_path(lineIndex, ++x, y);
          break;
        case "L":
          while (i++ < length) draw_path(lineIndex, --x, y);
          break;
        case "U":
          while (i++ < length) draw_path(lineIndex, x, ++y);
          break;
        case "D":
          while (i++ < length) draw_path(lineIndex, x, --y);
          break;
      }
    });
  });
}

function get_min_x(lineIndex) {
  const min_x = Object.keys(map[lineIndex])
    .map(key => parseInt(key.split("#")[0]))
    .sort((a, b) => a - b)
    .shift();
  return min_x;
}

function get_max_x(lineIndex) {
  const max_x = Object.keys(map[lineIndex])
    .map(key => parseInt(key.split("#")[0]))
    .sort((a, b) => a - b)
    .pop();
  return max_x;
}

function get_min_y(lineIndex) {
  const min_y = Object.keys(map[lineIndex])
    .map(key => parseInt(key.split("#")[1]))
    .sort((a, b) => a - b)
    .shift();
  return min_y;
}

function get_max_y(lineIndex) {
  const max_y = Object.keys(map[lineIndex])
    .map(key => parseInt(key.split("#")[1]))
    .sort((a, b) => a - b)
    .pop();
  return max_y;
}

function get_boundaries() {
  const boundaries = {
    min_x: Infinity,
    max_x: -Infinity,
    min_y: Infinity,
    max_y: -Infinity
  };
  for (let index = 0; index < map.length; index++) {
    const min_x = get_min_x(index);
    if (min_x < boundaries.min_x) boundaries.min_x = min_x - 1;
    const max_x = get_max_x(index);
    if (max_x > boundaries.max_x) boundaries.max_x = max_x + 1;
    const min_y = get_min_y(index);
    if (min_y < boundaries.min_y) boundaries.min_y = min_y - 1;
    const max_y = get_max_y(index);
    if (max_y > boundaries.max_y) boundaries.max_y = max_y + 1;
  }
  return boundaries;
}

function get_dot(x, y) {
  const key = `${x}#${y}`;
  let dot = ".";
  for (let lineIndex = 0; lineIndex < map.length; lineIndex++) {
    if (map[lineIndex][key] !== undefined) {
      if (dot !== ".") dot = "x";
      else dot = lineIndex;
    }
  }
  return dot;
}

function draw_map() {
  const boundaries = get_boundaries();
  let intersections = [];
  console.log(boundaries);
  for (let y = boundaries.max_y; y >= boundaries.min_y; y--) {
    let buffer = "";
    for (let x = boundaries.min_x; x <= boundaries.max_x; x++) {
      const dot = get_dot(x, y);
      buffer += dot;
      if (dot === "x") {
        intersections.push({ x, y });
      }
    }
    console.log(buffer);
  }
  return intersections;
}

function get_intersections() {
  let all_dots = {};
  map.forEach(line => {
    Object.keys(line).forEach(dot => {
      if (all_dots[dot] === undefined) all_dots[dot] = 1;
      else all_dots[dot]++;
    });
  });
  const intersections = Object.entries(all_dots)
    .filter(([key, value]) => value > 1)
    .map(([key]) => key.split("#"))
    .map(([x, y]) => ({ x, y }));

  return intersections;
}
