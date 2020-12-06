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

  const deduped_groups = groups.map(
    (group) => new Set(group.flatMap((answer) => answer.split("")))
  );

  const sum = deduped_groups.reduce((sum, group) => sum + group.size, 0);
  console.log({ sum });
})();
