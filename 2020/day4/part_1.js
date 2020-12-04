const readFile = require("../utils/readFile");

function format_input(line) {
  const passports = line
    .match(/(([a-z]+:[a-z0-9#]+[\n ]?)+)/gm)
    .map((passport) => passport.replace(/\n/g, " "))
    .map((passport) => passport.trim());
  return passports;
}

function isValidPassport(passport) {
  const requiredData = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  console.log(passport);
  const passportKeys = Object.keys(passport);
  const isValid = requiredData.every((key) => passportKeys.includes(key));
  console.log({ isValid });
  return isValid;
}

(async function run() {
  const input = await readFile("./input.txt");

  const passports = format_input(input);
  const passportObjects = passports
    .map((passport) => passport.split(" "))
    .map((passport) =>
      passport.reduce((obj, data) => {
        const [key, value] = data.split(":");
        return {
          ...obj,
          [key]: value,
        };
      }, {})
    );
  const passportCount = passportObjects.reduce((sum, passport) => {
    if (isValidPassport(passport)) return sum + 1;
    return sum;
  }, 0);
  console.log(passportObjects.length);
  console.log({ passportCount });
})();
