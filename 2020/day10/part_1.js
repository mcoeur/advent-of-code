const readLines = require("../utils/readLines");

(async function run() {
  const input = await readLines("./input.txt", undefined, parseInt);

  input.sort((a, b) => a - b);

  const diffs = input.reduce(
    (acc, curr, index, array) => {
      const previousStep = array[index - 1] || 0;
      const diff = curr - previousStep;
      return {
        ...acc,
        [diff]: (acc[diff] || 0) + 1,
      };
    },
    { 3: 1 }
  );
  console.log({ input, diffs, product: diffs["1"] * diffs["3"] });
})();
