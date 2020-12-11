const readLines = require("../utils/readLines");

function findSum(input, sum, offset) {
  let acc = 0;
  let curr = 0;
  for (let i = offset; i < input.length; i++) {
    curr = parseInt(input[i]);
    acc += curr;

    if (acc === sum) return input.slice(offset, i);
    if (acc > sum) {
      return false;
    }
  }
  return false;
}

function smallest(range) {
  return range.reduce((acc, curr) => (curr < acc ? curr : acc), Infinity);
}

function largest(range) {
  return range.reduce((acc, curr) => (curr > acc ? curr : acc), -Infinity);
}

(async function run() {
  const input = await readLines("./input.txt", undefined, parseInt);
  let data = [];
  const sum = parseInt(507622668);
  for (let index = 0; index < input.length; index++) {
    data = findSum(input, sum, index);
    // console.log({ data });
    if (data) {
      const min = smallest(data);
      const max = largest(data);
      console.log({
        data,
        min,
        max,
        sum: min + max,
      });
      break;
    }
  }
})();
