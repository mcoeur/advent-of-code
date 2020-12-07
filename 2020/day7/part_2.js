const readLines = require("../utils/readLines");

function format_line(value) {
  const [colorContainer, content] = value.split(" bags contain ");
  const parsedContent = content
    .split(",")
    .map((colorAndNumber) => {
      try {
        const [_, number, color] = colorAndNumber.match(
          /([0-9]+) ([a-z]+ [a-z]+) bag/
        );
        return { number: parseInt(number), color };
      } catch (e) {
        return null;
      }
    })
    .filter((elem) => !!elem); // remove null elements
  return { color: colorContainer, content: parsedContent };
}

function countBagsIn(color, rules) {
  const bag = rules.find((rule) => rule.color === color);
  const total = bag.content.reduce((sum, innerBag) => {
    const innerBagSum =
      innerBag.number + innerBag.number * countBagsIn(innerBag.color, rules);
    return sum + innerBagSum;
  }, 0);
  return total;
}

(async function run() {
  const input = await readLines("./input.txt", undefined, format_line);

  const bagCounts = countBagsIn("shiny gold", input);

  console.log({ bagCounts });
})();
