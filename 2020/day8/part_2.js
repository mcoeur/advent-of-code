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

function exec(input) {
  let index = 0;
  let acc = 0;
  let history = [];

  while (1) {
    if (history.includes(index)) {
      console.log("Inifite loop detected", acc);
      return null;
    }
    if (index >= input.length) {
      console.log("Program terminated", acc);
      return acc;
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
}

function deepCopy(input) {
  const output = input.map((obj) => ({ ...obj }));
  return output;
}

function alter_input(input, index) {
  const newInput = deepCopy(input);
  if (input[index].operation === "jmp") {
    newInput[index].operation = "nop";
  } else newInput[index].operation = "jmp";
  return newInput;
}

(async function run() {
  const input = await readLines("./input.txt", undefined, format_line);
  let acc = null;
  for (let i = 0; i < input.length; i++) {
    if (input[i].operation !== "acc") {
      acc = exec(alter_input(input, i));
    }
    if (acc !== null) {
      break;
    }
  }
  console.log({ acc });
})();
