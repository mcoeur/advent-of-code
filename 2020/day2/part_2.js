const readLines = require("../utils/readLines");

function format_input(line) {
  // Line format :
  // (min)-(max) (letter): (password)
  const [_, posA, posB, letter, password] = line.match(
    /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/
  );
  return {
    posA,
    posB,
    letter,
    password,
  };
}

(async function run() {
  const input = await readLines("./input.txt", undefined, format_input);
  const validPasswordCount = input.reduce((sum, currentPassword) => {
    const { letter, posA, posB, password } = currentPassword;
    const letterA = password.charAt(posA - 1);
    const letterB = password.charAt(posB - 1);

    if ((letterA === letter || letterB === letter) && letterA !== letterB)
      return sum + 1;
    return sum;
  }, 0);
  console.log({ validPasswordCount });
})();
