const readLines = require("../utils/readLines");

function isValidNumber(input, sum) {
  for (let i = 0; i < input.length; i++) {
    const currentNumber = input[i];
    const matchingNumber = sum - currentNumber;
    if (currentNumber !== matchingNumber && input.includes(matchingNumber)) {
      return true;
    }
  }
  return false;
}

(async function run() {
  let preamble_length = 25;
  const input = await readLines("./input.txt", undefined, parseInt);
  let data = [];
  for (let index = preamble_length; index < input.length; index++) {
    data = input.slice(index - preamble_length, index);
    if (!isValidNumber(data, input[index])) {
      console.log("Invalid number : ", input[index]);
      break;
    }
  }
})();
