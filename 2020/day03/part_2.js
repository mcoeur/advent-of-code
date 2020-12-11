const readLines = require("../utils/readLines");

function getTreeSum(input, slope) {
  const lineLength = input[0].length;
  const [right, down] = slope;
  const treeSum = input.reduce((sum, currentLine, index) => {
    if (index % down !== 0) return sum;
    const charPos = ((right / down) * index) % lineLength;
    if (currentLine.charAt(charPos) === "#") return sum + 1;
    return sum;
  }, 0);
  console.log({ slope, treeSum });
  return treeSum;
}

(async function run() {
  const input = await readLines("./input.txt");
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const treeSum = slopes.reduce((sum, slope) => {
    return sum * getTreeSum(input, slope);
  }, 1);
  console.log({ treeSum });
})();
