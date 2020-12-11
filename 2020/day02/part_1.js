const readLines = require("../utils/readLines");

function format_input(line) {
  // Line format :
  // (min)-(max) (letter): (password)
  const [_, min, max, letter, password] = line.match(
    /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/
  );
  return {
    min,
    max,
    letter,
    password,
  };
}

(async function run() {
  const input = await readLines("./input.txt", undefined, format_input);
  const validPasswordCount = input.reduce((sum, currentPassword) => {
    const letterCount =
      currentPassword.password.split(currentPassword.letter).length - 1;
    if (
      letterCount >= currentPassword.min &&
      letterCount <= currentPassword.max
    )
      return sum + 1;
    return sum;
  }, 0);
  console.log({ validPasswordCount });
})();
