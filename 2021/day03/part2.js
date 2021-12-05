const fs = require("fs");

function getBitCounts(input, index) {
  const bitCounts = [0, 0];

  input.map((line) => {
    const bit = line[index];
    bitCounts[bit]++;
  });
  return bitCounts;
}

function getMostCommonBit(input, index) {
  const bitCounts = getBitCounts(input, index);
  return bitCounts[0] > bitCounts[1] ? "0" : "1";
}

function getLeastCommonBit(input, index) {
  const bitCounts = getBitCounts(input, index);
  return bitCounts[0] <= bitCounts[1] ? "0" : "1";
}

function filterValues(input, bit, index) {
  return input.filter((value) => value[index] === bit);
}

(async () => {
  const input = fs.readFileSync("./input_1.txt", "utf8").split("\n");
  const binaryLength = input[0].length;

  let oxygenRatingList = [...input];
  for (let i = 0; i < binaryLength; i++) {
    const mostCommonBit = getMostCommonBit(oxygenRatingList, i);
    console.log(`most common bit at index ${i} is ${mostCommonBit}`);
    oxygenRatingList = filterValues(oxygenRatingList, mostCommonBit, i);
    console.log(`oxygenRatingList length : ${oxygenRatingList.length}`);
    if (oxygenRatingList.length == 1) break;
  }
  const oxygenRating = parseInt(oxygenRatingList[0], 2);

  let co2RatingList = [...input];
  for (let i = 0; i < binaryLength; i++) {
    const leastCommonBit = getLeastCommonBit(co2RatingList, i);
    console.log(`least common bit at index ${i} is ${leastCommonBit}`);
    co2RatingList = filterValues(co2RatingList, leastCommonBit, i);
    console.log(`co2RatingList length : ${co2RatingList.length}`);
    if (co2RatingList.length == 1) break;
  }
  const co2Rating = parseInt(co2RatingList[0], 2);

  const sum = oxygenRating * co2Rating;

  console.log({
    oxygenRating,
    co2Rating,
    sum,
  });
})();
