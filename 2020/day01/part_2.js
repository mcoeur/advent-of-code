const readLines = require("../utils/readLines");

(async function run() {
  const input = await readLines("./input.txt", undefined, parseInt);
  const [a, b, c] = findSum(input, 2020);
  console.log(a, b, c, a * b * c);
})();

function findSum(input, sum) {
  for (let i = 0; i < input.length; i++) {
    const delta = input[i];
    const group = findSumGroup(input, sum, delta);
    if (group) return [delta, ...group];
  }
  return null;
}

function findSumGroup(input, sum, delta = 0) {
  for (let i = 0; i < input.length; i++) {
    const currentNumber = input[i];
    const matchingNumber = sum - currentNumber - delta;
    if (input.includes(matchingNumber)) {
      return [currentNumber, matchingNumber];
    }
  }

  return null;
}
