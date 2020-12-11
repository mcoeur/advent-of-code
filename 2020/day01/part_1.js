const readLines = require("../utils/readLines");

(async function run() {
  const input = await readLines("./input.txt", undefined, parseInt);
  const [a, b] = findSumGroup(input, 2020);
  console.log(a, b, a * b);
})();

function findSumGroup(input, sum) {
  for (let i = 0; i < input.length; i++) {
    const currentNumber = input[i];
    const matchingNumber = sum - currentNumber;
    if (input.includes(matchingNumber)) {
      return [currentNumber, matchingNumber];
    }
  }

  return null;
}
