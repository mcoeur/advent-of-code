const readLines = require("../utils/readLines");

(async function run() {
  const input = await readLines("./input.txt");
  const lineLength = input[0].length;
  const treeSum = input.reduce((sum, currentLine, index) => {
    const charPos = (3 * index) % lineLength;
    if (currentLine.charAt(charPos) === "#") return sum + 1;
    return sum;
  }, 0);
  console.log({ treeSum });
})();
