const fs = require("fs");

function sumOfPreviousLines(lines, currentIndex, lineCount) {
  let sum = 0;
  for (let i = 0; i < lineCount; i++) {
    sum += parseInt(lines[currentIndex - i]);
  }
  return sum;
}

(async () => {
  const input = fs.readFileSync("./input_1.txt", "utf8").split("\n");

  let counter = 0;
  for (let i = 2; i < input.length; i++) {
    const currentSum = sumOfPreviousLines(input, i, 3);
    const previousSum = sumOfPreviousLines(input, [i - 1], 3);
    const increased = currentSum > previousSum;
    console.log(currentSum, increased ? "(increased)" : "");
    if (increased) counter++;
  }
  console.log(`Depth increased ${counter} times`);
})();
