const readFile = require("../utils/readFile");

function format_input(line) {
  const groups = line
    .match(/([a-z]+\n?)+/gm)
    .map((group) => group.trim().split("\n"));
  return groups;
}

(async function run() {
  const input = await readFile("./input.txt");
  const groups = format_input(input);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const filteredGroups = groups.map((group) =>
    alphabet
      .split("")
      .filter((letter) => group.every((answer) => answer.includes(letter)))
  );

  const sum = filteredGroups.reduce((sum, group) => sum + group.length, 0);

  console.log({ sum });
})();
