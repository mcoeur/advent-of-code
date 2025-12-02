const fs = require("node:fs");

const raw_input = fs.readFileSync("./input_part1.txt", "utf8");
const parsed_input = raw_input.split("\n").map((movement) => {
  const direction = movement.substring(0, 1);
  const value = parseInt(movement.substring(1));
  return direction === "R" ? value : -value;
});

let currentValue = 50;
let landAtZeroCount = 0;
parsed_input.forEach((movement) => {
  currentValue = (currentValue + 100 + movement) % 100;
  if (currentValue === 0) landAtZeroCount += 1;
});
console.log({ currentValue, landAtZeroCount });
