const fs = require("fs");

(async () => {
  const input = fs.readFileSync("./input_1.txt", "utf8").split("\n");

  let counter = 0;
  for (let i = 1; i < input.length; i++) {
    const current = parseInt(input[i]);
    const previous = parseInt(input[i - 1]);
    const increased = current > previous;
    console.log(current, increased ? "(increased)" : "");
    if (increased) counter++;
  }
  console.log(`Depth increased ${counter} times`);
})();
