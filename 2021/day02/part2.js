const fs = require("fs");

(async () => {
  const input = fs.readFileSync("./input_1.txt", "utf8").split("\n");

  let depth = 0;
  let position = 0;
  let aim = 0;

  input
    .map((line) => {
      const [direction, value] = line.split(" ");
      return { direction, value: parseInt(value) };
    })
    .map(({ direction, value }) => {
      if (direction === "forward") {
        position += value;
        depth += value * aim;
      } else if (direction === "up") aim -= value;
      else if (direction === "down") aim += value;
      console.log({ direction, value, aim, position, depth });
    });
  console.log(
    `final position : ${position}, final depth : ${depth}, total : ${
      position * depth
    }`
  );
})();
