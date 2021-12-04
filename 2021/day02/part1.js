const fs = require("fs");

(async () => {
  const input = fs.readFileSync("./input_1.txt", "utf8").split("\n");

  let depth = 0;
  let position = 0;

  input
    .map((line) => {
      const [direction, value] = line.split(" ");
      return { direction, value: parseInt(value) };
    })
    .map(({ direction, value }) => {
      console.log({ direction, value });
      if (direction === "forward") position += value;
      else if (direction === "up") depth -= value;
      else if (direction === "down") depth += value;
    });
  console.log(
    `final position : ${position}, final depth : ${depth}, total : ${
      position * depth
    }`
  );
})();
