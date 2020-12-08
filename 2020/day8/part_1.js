const readLines = require("../utils/readLines");

function format_line(line) {
  const [operation, argument] = line.split(" ");
  return {
    operation,
    argument: parseInt(argument),
  };
}

function findAvailableContainers(color, rules) {
  const containers = rules
    .filter((rule) => rule.content.includes(color))
    .map((rule) => rule.color);
  const subContainers = containers.flatMap((color) =>
    findAvailableContainers(color, rules)
  );
  return [...containers, ...subContainers];
}

(async function run() {
  const input = await readLines("./input.txt", undefined, format_line);

  let index = 0;
  let acc = 0;
  let history = [];

  while (1) {
    if (history.includes(index)) {
      console.log("Infinite loop detected");
      break;
    }
    history.push(index);
    switch (input[index].operation) {
      case "nop":
        index++;
        break;
      case "jmp":
        index += input[index].argument;
        break;
      case "acc":
        acc += input[index].argument;
        index++;
    }
  }

  console.log({ acc });
})();
