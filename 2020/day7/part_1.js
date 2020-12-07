const readLines = require("../utils/readLines");

function format_line(value) {
  const [colorContainer, content] = value.split(" bags contain ");
  const parsedContent = content.split(",").map((colorAndNumber) => {
    try {
      const [_, number, color] = colorAndNumber.match(
        /([0-9]+) ([a-z]+ [a-z]+) bag/
      );
      //  number is ignored (for now) ?
      return color;
    } catch (e) {
      return null;
    }
  });
  return { color: colorContainer, content: parsedContent };
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

  const containers = findAvailableContainers("shiny gold", input);

  const dedupedContainers = new Set(containers);

  console.log({ dedupedContainers, total: dedupedContainers.size });
})();
