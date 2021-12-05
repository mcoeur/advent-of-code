const fs = require("fs");

function getMostCommonBit(input, index) {
  const bitCounts = [0, 0];

  input.map((line) => {
    const bit = line[index];
    bitCounts[bit]++;
    //console.log({ bit, bitCounts });
  });

  return bitCounts[0] > bitCounts[1] ? "0" : "1";
}

(async () => {
  const input = fs.readFileSync("./input_1.txt", "utf8").split("\n");
  const binaryLength = input[0].length;

  let binaryGamma = "";
  let binaryEpsilon = "";

  for (let i = 0; i < binaryLength; i++) {
    const mostCommonBit = getMostCommonBit(input, i);
    console.log(`most common bit at index ${i} is ${mostCommonBit}`);
    binaryGamma += mostCommonBit;
    binaryEpsilon += mostCommonBit === "0" ? "1" : "0";
  }

  const decimalGamma = parseInt(binaryGamma, 2);
  const decimalEpsilon = parseInt(binaryEpsilon, 2);
  const sum = decimalGamma * decimalEpsilon;
  console.log({
    binaryGamma,
    binaryEpsilon,
    decimalGamma,
    decimalEpsilon,
    sum,
  });
})();
